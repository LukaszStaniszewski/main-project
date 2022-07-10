import { useDispatch } from "react-redux";

import {ICurrentUser} from "../../store/user/user.types"
import { updateUsersStart, setUsers} from "../../store/user/user.action";
import { changeItemsValue } from "../../utils/hooks.utils";

const useUpdateUsers = () => {
   const dispatch = useDispatch()
  
      const updateUsers = (users: ICurrentUser[], usersToUpdate: ICurrentUser[], value: object) => {
         if(!usersToUpdate.length) return
            const updatedUsers = changeItemsValue<ICurrentUser>(users,usersToUpdate, value)

            dispatch(setUsers(updatedUsers))
            dispatch(updateUsersStart(usersToUpdate))
      }
  
   return [updateUsers]
}
export default useUpdateUsers
 
