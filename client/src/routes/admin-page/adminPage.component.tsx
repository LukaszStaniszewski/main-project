import {useEffect, useState,MouseEvent} from 'react'
import { useSelector, useDispatch } from "react-redux"

import CustomTable from "../../components/custom-table/customTable.component"
import { getUsersStart } from "../../store/user/user.action"
import { selectUserReducer} from "../../store/user/user.selector"
import { ICurrentUser } from "../../store/user/user.types"
import { useUpdateUsers } from "../../hooks/local-database/updateUsers.hook"


const AdminPage = () => {
   const {isLoading, users} = useSelector(selectUserReducer)
   const [usersToUpdate, setSelectedUsers] = useState<ICurrentUser[]>(users)
   const dispatch = useDispatch()
   const [setValuesToUpdate] = useUpdateUsers()

   
   useEffect(() => {
      dispatch(getUsersStart())
   }, [])

   useEffect(() => {
     
   },[usersToUpdate])


  const updateUsers = (event : MouseEvent<HTMLButtonElement>) => {
     //@ts-ignore
     const value = event.target.name
     //@ts-ignore
     setValuesToUpdate({users, usersToUpdate, value: {status: value}})
   }

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
         <button name="blocked" onClick={updateUsers}>block user</button>
         <button name="active" onClick={updateUsers}>unblock user</button>
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