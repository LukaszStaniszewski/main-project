import { useDispatch } from "react-redux";

import { deleteUsersStart, setUsers } from "../../store/user/user.action";
import { deleteItems } from "../../utils/hooks.utils";
import { ICurrentUser } from "../../store/user/user.types";

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