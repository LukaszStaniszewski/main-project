import { useRef, Fragment } from "react";

import {
   selectItemLoading,
   selectLatestItems,
   getLatestItemsStart,
} from "../../store/items";
import LatestItem from "./latest-item.component";
import useLazyLoad from "../../hooks/useLazyLoad";
import { Spinner, SpinningDots } from "../spinner";

const initialAmount = window.screen.height > 1000 ? 12 : 8;
const itemsOnScroll = window.screen.height > 1000 ? 6 : 4;

const options = {
   INITIAL_ITEMS_NUMBER: initialAmount,
   ITEMS_ON_SCROLL: itemsOnScroll,
   SCROLL_LIMIT: 3,
};
type selectType = ReturnType<typeof selectLatestItems>;

const LatestItemsOverview = () => {
   const triggerRef = useRef<HTMLHeadingElement>(null);
   const { items, loading } = useLazyLoad<selectType>(
      triggerRef,
      {
         action: getLatestItemsStart,
         loadingSelector: selectItemLoading,
         stateSelector: selectLatestItems,
      },
      options
   );

   if (!items) {
      return (
         <div className="flex justify-center">
            <Spinner />
         </div>
      );
   }

   return (
      <Fragment>
         {items.map((item) => (
            <LatestItem key={item._id} item={item} />
         ))}
         <div ref={triggerRef}></div>
         {loading && <SpinningDots />}
      </Fragment>
   );
};

export default LatestItemsOverview;
