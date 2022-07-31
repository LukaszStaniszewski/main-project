import {useEffect, useState,MouseEvent} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "@material-tailwind/react";

import CustomTable from "../../components/custom-table/custom-table.component"
import { getUsersStart, logOutStart } from "../../store/user/user.action"
import { selectUserReducer} from "../../store/user/user.selector"
import { ICurrentUser } from "../../store/user/user.types"
import useUpdateUsers from "../../hooks/user-session/update-users.hook"
import useDeleteUsers from "../../hooks/user-session/delete-users.hook"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"

const AdminPage = () => {
   const {isLoading, users, currentUser} = useSelector(selectUserReducer)
   const [usersToUpdate, setSelectedUsers] = useState<ICurrentUser[]>(users)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [updateUsers] = useUpdateUsers()
   const [deleteUsers] = useDeleteUsers()

   useEffect(() => {
      if( !currentUser || currentUser?.role !== "admin") return navigate("/")
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
         <HeaderExtension/>
         <main className="bg-secondary w-80vw m-auto screen-height p-4 rounded">
            <div className="flex p-5 justify-around">
               <Button size="sm" variant="outlined" value="status_blocked" onClick={updateSelectedUsers}>block user</Button>
               <Button size="sm" variant="outlined" value="status_active" onClick={updateSelectedUsers}>unblock user</Button>
               <Button size="sm" variant="outlined" value="role_user" onClick={updateSelectedUsers}>set role to user</Button>
               <Button size="sm" variant="outlined" value="role_admin" onClick={updateSelectedUsers}>set role to admin</Button>
               <Button size="sm" variant="outlined" color="red"  onClick={deleteSelectedUsers}>delete user</Button>
            </div>
            {isLoading
            ? <div>Loading....</div>
            :<div className="overflow-auto max-h-80vh">
            :   <CustomTable 
                  rows={users} 
                  checkboxesAvaible={true} 
                  setSelectedItems={setSelectedUsers}
               />
            :</div>
            }
         </main>
      </section>
   )
}

export default AdminPage