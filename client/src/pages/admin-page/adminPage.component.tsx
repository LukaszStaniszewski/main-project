import {useEffect, useState,MouseEvent} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FormattedMessage } from "react-intl"

import CustomTable from "../../components/custom-table/customTable.component"
import { getUsersStart, logOutStart } from "../../store/user/user.action"
import { selectUserReducer} from "../../store/user/user.selector"
import { ICurrentUser } from "../../store/user/user.types"
import useUpdateUsers from "../../hooks/user-session/updateUsers.hook"
import useDeleteUsers from "../../hooks/user-session/deleteUsers.hook"

const AdminPage = () => {
   const {isLoading, users, currentUser} = useSelector(selectUserReducer)
   const [usersToUpdate, setSelectedUsers] = useState<ICurrentUser[]>(users)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [updateUsers] = useUpdateUsers()
   const [deleteUsers] = useDeleteUsers()

   useEffect(() => {
      if((!isLoading) && (!currentUser || currentUser?.role !== "admin")) return navigate("/")
   }, [])

   useEffect(() => {
      dispatch(getUsersStart())
   }, [])

  const updateSelectedUsers = (event : MouseEvent<HTMLButtonElement>) => {
     const propertyToUpdate = event.currentTarget.value.split("_")
     const keyToUpdate = propertyToUpdate[0]
     const valueToUpdate = propertyToUpdate[1]
     updateUsers(users, usersToUpdate, {[keyToUpdate]: valueToUpdate})
     logoutIfSelected()
   }

   const deleteSelectedUsers = () => {
      deleteUsers(users, usersToUpdate)
      logoutIfSelected()
   }

   const logoutIfSelected = () => {
      const isExisting = usersToUpdate.find(userToUpdate => userToUpdate._id === currentUser?._id)
      if(isExisting) {
        dispatch(logOutStart())
        navigate("/")
      }
      return
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
            <button value="status_blocked" onClick={updateSelectedUsers}>block user</button>
            <button value="status_active" onClick={updateSelectedUsers}>unblock user</button>
            <button value="role_user" onClick={updateSelectedUsers}>set role to user</button>
            <button value="role_admin" onClick={updateSelectedUsers}>set role to admin</button>
            <button  onClick={deleteSelectedUsers}>delete user</button>
         </div>
         {isLoading
         ? <div>Loading....</div>
         :<CustomTable 
            rows={users} 
            checkboxesAvaible={true} 
            setSelectedItems={setSelectedUsers}
         />
         }
      </main>
   </section>
   )
}

export default AdminPage