import { useDispatch } from "react-redux";

import { deleteUsersStart, setUsers } from "../../store/user/user.action";
import { deleteItems } from "../../utils/hooks.utils";
import { ICurrentUser } from "../../store/user/user.types";

const useDeleteUsers = () => {
const dispatch = useDispatch()
 
   const deleteUsers = (items:ICurrentUser[], itemsToDelete:ICurrentUser[]) => {
      const wihoutUnwontedUsers = deleteItems(items, itemsToDelete)
      dispatch(setUsers(wihoutUnwontedUsers))
      dispatch(deleteUsersStart(itemsToDelete))
   }   
   return [deleteUsers]
}

export default useDeleteUsers