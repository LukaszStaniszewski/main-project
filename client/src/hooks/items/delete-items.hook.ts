import { useDispatch } from "react-redux";

import { setItems, IItem, deleteItemsStart } from "../../store/items";
import { deleteItems } from "../../utils/hooks.utils";

const useDeleteItems = () => {
   const dispatch = useDispatch();

   const deleteCollectionItems = (items: IItem[], itemsToDelte: IItem[]) => {
      const wihoutUnwatedItems = deleteItems<IItem>(items, itemsToDelte);
      dispatch(setItems(wihoutUnwatedItems));
      const id = wihoutUnwatedItems.map((value) => ({ _id: value._id }));

      dispatch(deleteItemsStart(id));
   };
   return [deleteCollectionItems];
};

export default useDeleteItems;
