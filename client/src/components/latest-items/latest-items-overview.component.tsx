import { useRef, Fragment } from "react";

import {
   selectItemLoading,
   selectLatestItems,
   getLatestItemsStart,
} from "../../store/items";
import LatestItem from "./latest-item.component";
import useLazyLoad from "../../hooks/useLazyLoad";
import { SpinningDots } from "../spinner";

const initialAmount = window.screen.availWidth > 1500 ? 11 : 6;
const itemsOnScroll = window.screen.availWidth > 1500 ? 7 : 6;
console.log("initialAmount", window.screen.width);

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

   return (
      <Fragment>
         {items?.map((item) => (
            <LatestItem key={item._id} item={item} />
         ))}
         <div ref={triggerRef}></div>
         {loading && <SpinningDots />}
      </Fragment>
   );
};

export default LatestItemsOverview;
