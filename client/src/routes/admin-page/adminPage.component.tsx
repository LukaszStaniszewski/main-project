import {useEffect, useState,MouseEvent} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import CustomTable from "../../components/custom-table/customTable.component"
import { getUsersStart } from "../../store/user/user.action"
import { selectUserReducer} from "../../store/user/user.selector"
import { ICurrentUser } from "../../store/user/user.types"
import useUpdateUsers from "../../hooks/client-server/updateUsers.hook"
import useDeleteUsers from "../../hooks/client-server/deleteUsers.hook"

const AdminPage = () => {
   const {isLoading, users, currentUser} = useSelector(selectUserReducer)
   const [usersToUpdate, setSelectedUsers] = useState<ICurrentUser[]>(users)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [updateUsers] = useUpdateUsers()
   const [deleteUsers] = useDeleteUsers()

   useEffect(() => {
      if(currentUser && currentUser?.role !== "admin") return navigate("/")
   }, [currentUser])

   useEffect(() => {
      dispatch(getUsersStart())
   }, [])


  const updateSelectedUsers = (event : MouseEvent<HTMLButtonElement>) => {
     const value = event.currentTarget.name?.split("_")
   //   console.log( {[value[0]]: value[1]})
     updateUsers(users, usersToUpdate, {[value[0]]: value[1]})
   }
   // join = array to string, spl

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
         <div className="flex gap-10">
            <button name="status_blocked" onClick={updateSelectedUsers}>block user</button>
            <button name="status_active" onClick={updateSelectedUsers}>unblock user</button>
            <button name="role_user" onClick={updateSelectedUsers}>set role to user</button>
            <button name="role_admin" onClick={updateSelectedUsers}>set role to admin</button>
            <button  onClick={deleteSelectedUsers}>delete user</button>
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