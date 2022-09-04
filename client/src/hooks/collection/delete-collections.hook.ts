import { useDispatch } from "react-redux";

import { setCollection, deleteCollectionStart, setCollectionsWihoutItems } from "../../store/collections";
import {
   ICollection,
   ICollectionWithoutItems,
} from "../../store/collections/collection.types";
import { deleteItem } from "../../utils/hooks.utils";

export interface AdjustedCollection
   extends Omit<ICollectionWithoutItems, "image" | "owner"> {
   image: string | undefined;
   owner: string;
}

const useDeleteCollection = () => {
   const dispatch = useDispatch();

   const deleteCollection = (
      collections: AdjustedCollection[],
      collectionToDelete: ICollection
   ) => {
      const wihoutUnwontedCollections = deleteItem<AdjustedCollection, ICollection>(
         collections,
         collectionToDelete
      );
      //@ts-ignore
      dispatch(setCollectionsWihoutItems(wihoutUnwontedCollections));
      dispatch(deleteCollectionStart(collectionToDelete._id));
   };
   return [deleteCollection];
};

export default useDeleteCollection;
