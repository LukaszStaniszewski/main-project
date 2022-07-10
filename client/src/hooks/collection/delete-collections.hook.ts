import { useDispatch } from "react-redux";
import { setCollection, deleteCollectionStart } from "../../store/collections/collection.actions";
import { ICollection, ICollectionWithoutItems } from "../../store/collections/collection.types";
import { deleteItem } from "../../utils/hooks.utils";

export interface AdjustedCollection extends Omit<ICollectionWithoutItems, "image" | "owner"> {
   image: string | undefined,
   owner: string,
}

const useDeleteCollection = () => {
   const dispatch = useDispatch()

   const deleteCollection = (collections: AdjustedCollection[], collectionToDelete: ICollection) => {
      console.log("collections", collections)
      const wihoutUnwontedCollections = deleteItem<AdjustedCollection, ICollection>(collections, collectionToDelete)
      console.log("wihoutUnwontedCollections", wihoutUnwontedCollections)
      dispatch(setCollection(wihoutUnwontedCollections))
      dispatch(deleteCollectionStart(collectionToDelete._id))
   }
   return [deleteCollection]
}

export default useDeleteCollection