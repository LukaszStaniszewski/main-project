import {useEffect, useState, ChangeEvent} from 'react'
import { useSelector, useDispatch } from "react-redux"

import CustomTable from "../../components/custom-table/customTable.component"
import { getUsersStart } from "../../store/user/user.action"
import { selectUserReducer, selectUsers } from "../../store/user/user.selector"
import { ICurrentUser } from "../../store/user/user.types"

const AdminPage = () => {
   const [checkbox, setCheckbox] = useState(false)
   const dispatch = useDispatch()
   const {isLoading, users} = useSelector(selectUserReducer)
   // const [usersToUpdate, setSelectedUsers] = useState()
   const [usersToUpdate, setSelectedUsers] = useState<ICurrentUser[]>(users)

   console.log("usersToUpdate", usersToUpdate)
   const checkRowsHandler = (event: ChangeEvent<HTMLInputElement>) => setCheckbox(event.target.checked)

   useEffect(() => {
      dispatch(getUsersStart())
   }, [])

   return (
      <section className="relative z-0">
      <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
      <main className="w-80vw m-auto h-60vh bg-secondary pt-6 pb-4 px-4 overflow-auto ">
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
         :<CustomTable rows={users} checkboxesOpen={true} setSelectedItems={setSelectedUsers}/>
         }
      </main>
   </section>
   )
}

export default AdminPage