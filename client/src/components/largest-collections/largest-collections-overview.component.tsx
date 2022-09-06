import { Fragment, useRef } from "react";

import { SpinningDots } from "../spinner";
import {
   selectLargestCollections,
   selectCollectionLoadingState,
} from "../../store/collections/collection.selector";
import { getLargestCollectionsStart } from "../../store/collections/collection.actions";
import LargestCollection from "./largest-collection.component";
import useLazyLoad from "../../hooks/useLazyLoad";

const options = {
   INITIAL_ITEMS_NUMBER: 3,
   ITEMS_ON_SCROLL: 2,
   SCROLL_LIMIT: 2,
};

type selectType = ReturnType<typeof selectLargestCollections>;
const LargestCollectionsOverview = () => {
   const triggerRef = useRef<HTMLHeadingElement>(null);

   const { items, loading } = useLazyLoad<selectType>(
      triggerRef,
      {
         action: getLargestCollectionsStart,
         loadingSelector: selectCollectionLoadingState,
         stateSelector: selectLargestCollections,
      },
      options
   );

   return (
      <Fragment>
         {items?.map((collection) => (
            <LargestCollection key={collection._id} collection={collection} />
         ))}
         <div ref={triggerRef}></div>
         {loading && <SpinningDots />}
      </Fragment>
   );
};

export default LargestCollectionsOverview;
