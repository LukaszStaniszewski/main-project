import {ICurrentUser} from "../../store/user/user.types"
import { useDispatch } from "react-redux";
import { updateUsersStart, setUsers} from "../../store/user/user.action";
import {useEffect, useState} from "react"

interface IUpdateItems {
   _id: string 
   [key: string]: any
}

type Items = ICurrentUser[]



export const changeItemsValue = (items: Items, itemsToUpdate: IUpdateItems[], value: IUpdateItems): Items =>{
   const keyToUpdate =  Object.keys(value).join("")
   const valueToUpdate =  Object.values(value).join("")

   for(let i = 0; i < items.length; i++) {
      for(let j = 0; j< itemsToUpdate.length; j++) {
         if(items[i]._id === itemsToUpdate[j]._id) {
            //@ts-ignore
            items[i][keyToUpdate] = valueToUpdate
         }
      }
   }
   return [...items]
}
const defaultValues = {
   users: [],
   usersToUpdate: [],
   value: {_id: ""}
}

export const useUpdateUsers = () => {
   const dispatch = useDispatch()
   const [valuesToUpdate, setValuesToUpdate] = useState<typeof defaultValues>(defaultValues)
   const {users, usersToUpdate, value} =  valuesToUpdate
   console.log("valuesToUpdate", value)
   useEffect(() => {
      const updateUsers = (users: ICurrentUser[], usersToUpdate: ICurrentUser[], value: IUpdateItems) => {
         if(!usersToUpdate.length) return
            const updatedUsers = changeItemsValue(users,usersToUpdate, value)
            console.log("IUpdatedItems", updatedUsers)
            
            dispatch(setUsers(updatedUsers))
            dispatch(updateUsersStart(usersToUpdate))
      }
      updateUsers(users, usersToUpdate, value)
   }, [valuesToUpdate])
  
   return [setValuesToUpdate]
}
 
