import {useEffect, useState,MouseEvent} from 'react'
import { useSelector, useDispatch } from "react-redux"

import CustomTable from "../../components/custom-table/customTable.component"
import { getUsersStart } from "../../store/user/user.action"
import { selectUserReducer} from "../../store/user/user.selector"
import { ICurrentUser } from "../../store/user/user.types"
import useUpdateUsers from "../../hooks/client-server/updateUsers.hook"
import useDeleteUsers from "../../hooks/client-server/deleteUsers.hook"

const AdminPage = () => {
   const {isLoading, users} = useSelector(selectUserReducer)
   const [usersToUpdate, setSelectedUsers] = useState<ICurrentUser[]>(users)
   const dispatch = useDispatch()
   const [updateUsers] = useUpdateUsers()
   const [deleteUsers] = useDeleteUsers()

   useEffect(() => {
      dispatch(getUsersStart())
   }, [])


  const updateSelectedUsers = (event : MouseEvent<HTMLButtonElement>) => {
     const value = event.currentTarget.name
     updateUsers(users, usersToUpdate, {status: value})
   }

   const deleteSelectedUsers = () => {
      deleteUsers(users, usersToUpdate)
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
         <button name="blocked" onClick={updateSelectedUsers}>block user</button>
         <button name="active" onClick={updateSelectedUsers}>unblock user</button>
         <button  onClick={deleteSelectedUsers}>delete user</button>
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