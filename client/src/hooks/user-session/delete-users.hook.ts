import { useDispatch } from "react-redux";

import { deleteItems } from "../../utils/hooks.utils";
import { ICurrentUser, setUsers, deleteUsersStart } from "../../store/user";

const useDeleteUsers = () => {
const dispatch = useDispatch()
 
   const deleteUsers = (users:ICurrentUser[], usersToDelete:ICurrentUser[]) => {
      const wihoutUnwontedUsers = deleteItems<ICurrentUser>(users, usersToDelete)
      dispatch(setUsers(wihoutUnwontedUsers))
      dispatch(deleteUsersStart(usersToDelete))
   }   
   return [deleteUsers]
}

export default useDeleteUsers