import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../spinner/spinner.component";
import { selectLargestCollections } from "../../store/collections/collection.selector";
import { getLargestCollectionsStart } from "../../store/collections/collection.actions";
import LargestCollection from "./largest-collection.component";

const LargestCollectionsOverview = () => {
   const dispatch = useDispatch();
   const largestCollections = useSelector(selectLargestCollections);

   useEffect(() => {
      dispatch(getLargestCollectionsStart());
   }, []);

   if (!largestCollections) {
      return (
         <div className="flex justify-center items-center h-full">
            <Spinner />
         </div>
      );
   }

   return (
      <Fragment>
         {largestCollections.map((collection) => (
            <LargestCollection key={collection._id} collection={collection} />
         ))}
      </Fragment>
   );
};

export default LargestCollectionsOverview;
