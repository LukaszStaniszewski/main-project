import { Fragment} from 'react'
import { Routes, Route } from "react-router-dom"
import UserPageFrame from "./frame/userPageFrame.component"

const UserPage = () => {

 
  return (
   <Fragment>
      <Routes>
         <Route path=":name" element={<UserPageFrame/>}/>
      </Routes>
   </Fragment>
  )
}

export default UserPage