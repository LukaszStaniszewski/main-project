import {FC} from 'react'
import { ICurrentUser } from "../../../store/user/user.types"

type TableRowProps = {
   user : ICurrentUser
}

const TableRow = ({user} : TableRowProps) => {
   const {name, email, status, lastLogin, isAdmin} = user

   return (
   <tr className="hover text-center">
      <td><input type="checkbox" className="checkbox" /></td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{status}</td>
      <td>{isAdmin}</td>
      <td>{lastLogin}</td>
   </tr>
   )
}

export default TableRow