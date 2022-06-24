import {useEffect, useState, ChangeEvent} from 'react'
import { useSelector, useDispatch } from "react-redux"

import CustomTable from "../../components/custom-table/customTable.component"
import { getUsersStart } from "../../store/user/user.action"
import { selectUserReducer, selectUsers } from "../../store/user/user.selector"
import { ICurrentUser } from "../../store/user/user.types"

const AdminPage = () => {
   const [valueToUpdate, setValueToUpdate] = useState({})
   const dispatch = useDispatch()
   const {isLoading, users} = useSelector(selectUserReducer)
   // const [usersToUpdate, setSelectedUsers] = useState()
   const [usersToUpdate, setSelectedUsers] = useState<ICurrentUser[]>(users)

   console.log("usersToUpdate", usersToUpdate)

   // interface IUpdateItems<T, D, C> {
   //    itemsToUpdate: [_id: string]
   //    items: T[],
   //    value: object
   // }
   interface IUpdateItems {
   _id: string 
   [key: string]: any
   }
   const updateUsers = () => {
      changeItemsValue(users, usersToUpdate, valueToUpdate)
   }

   function changeItemsValue(items: ICurrentUser[], itemsToUpdate: ICurrentUser[], value: object): ICurrentUser[];
   
   function changeItemsValue(items: IUpdateItems[], itemsToUpdate: IUpdateItems[], value: object){
      const keyToUpdate =  Object.keys(value).join("")
      if(!itemsToUpdate) return
      for(let i = 0; i < items.length; i++) {
        for(let j = 0; j< itemsToUpdate.length; j++) {
          if(items[i]._id === itemsToUpdate[j]._id) {
            items[i][keyToUpdate] = value
          }
        }
      }
      return [...items]
   }


   useEffect(() => {
      dispatch(getUsersStart())
   }, [])

   return (
      <section className="relative z-0">
      <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
      <main className="w-80vw m-auto h-60vh bg-secondary pt-6 pb-4 px-4">
         <div className="flex justify-around">
            <div>
               <p>Users</p>
               <p>12</p>
            </div>
            <div>
               <p>Categoies</p>
               <p>12</p>
            </div>
            <div>
               <p>Items</p>
               <p>12</p>
            </div>
            <div>
               <p>Posts</p>
               <p>12</p>
            </div>
         </div>
         {isLoading
         ? <div>Loading....</div>
         // change name checkboxesOpen to admin mode
         :<CustomTable 
            rows={users} 
            checkboxesOpen={true} 
            setSelectedItems={setSelectedUsers}
         />
         }
      </main>
   </section>
   )
}

export default AdminPage