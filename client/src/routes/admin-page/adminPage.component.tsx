import {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"

import UserTable from "../../components/user-table/userTable.component"
import { getUsersStart } from "../../store/user/user.action"

const AdminPage = () => {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getUsersStart())
   }, [])

   return (
      <section className="relative z-0">
      <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
      <main className="w-80vw m-auto h-60vh bg-secondary pt-6 pb-4 px-4 ">
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
         <UserTable/>
      </main>
   </section>
   )
}

export default AdminPage