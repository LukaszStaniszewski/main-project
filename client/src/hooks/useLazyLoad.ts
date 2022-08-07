import { useEffect, useState, useCallback, RefObject } from "react";
import { Selector } from "reselect";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";

import { AppState } from "../store/root-reducer";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

interface IUseLazyLoad<T> {
   action: (arg: number) => AnyAction;
   loadingSelector: Selector<AppState, boolean>;
   stateSelector: Selector<AppState, T>;
}
const optionsDefault = {
   INITIAL_ITEMS_NUMBER: 1,
   ITEMS_ON_SCROLL: 2,
   SCROLL_LIMIT: 2,
};

const useLazyLoad = <T>(
   triggerRef: RefObject<HTMLHeadingElement>,
   redux: IUseLazyLoad<T>,
   options: typeof optionsDefault = optionsDefault
) => {
   const [state, setState] = useState({
      currentPage: 1,
   });

   const dispatch = useDispatch();
   const loading = useSelector(redux.loadingSelector);
   const items = useSelector(redux.stateSelector);

   const _handleEntry = (entry: IntersectionObserverEntry) => {
      const boundingRect = entry.boundingClientRect;
      const intersectionRect = entry.intersectionRect;

      if (
         !loading &&
         entry.isIntersecting &&
         intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD &&
         state.currentPage <= options.SCROLL_LIMIT
      ) {
         if (Array.isArray(items)) {
            if (!items.length) {
               dispatch(redux.action(options.INITIAL_ITEMS_NUMBER));
            } else {
               dispatch(
                  redux.action(
                     options.INITIAL_ITEMS_NUMBER + options.ITEMS_ON_SCROLL * state.currentPage
                  )
               );
               setState((prevState) => ({
                  ...prevState,
                  currentPage: prevState.currentPage + 1,
               }));
            }
         } else {
            throw new Error("state selector must return array");
         }
      }
   };
   const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

   const onIntersect = useCallback(
      (entries: IntersectionObserverEntry[]) => {
         handleEntry(entries[0]);
      },
      [handleEntry]
   );

   useEffect(() => {
      if (triggerRef.current) {
         const container = triggerRef.current;
         const observer = new IntersectionObserver(onIntersect);
         observer.observe(container);

         return () => {
            observer.disconnect();
         };
      }
   }, [triggerRef, onIntersect]);

   return { items, loading };
};

export default useLazyLoad;
