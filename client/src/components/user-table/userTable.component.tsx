import React, { useEffect } from 'react'
import { useSelector } from "react-redux"

import { selectUserReducer, selectUsers } from "../../store/user/user.selector"
import TableRow from "./table-row/tableRow.component"


const UserTable = () => {
   const users = useSelector(selectUsers)
   console.log("users", users)

   return (
   <div className="overlow-x-auto">
      <table className="table w-full bg-secondary table-normal">
         <thead>
            <tr className="text-center">
               <th></th>
               <th>Name</th>
               <th>Email</th>
               <th> Status</th>
               <th>Admin</th>
               <th>Last login</th>
            </tr>
         </thead>
         <tbody>
            {  users.map(user => 
               <TableRow key={user._id} user={user}/>
            )
            }
         </tbody>
      </table>
   </div>
   )
}

export default UserTable