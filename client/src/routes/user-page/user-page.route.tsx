import React from 'react'
import { Routes, Route } from "react-router-dom"
import UserPage from "../../pages/user-page/frame/userPageFrame.component"

const UserPageRoute = () => {
  return (
   <Routes>
      <Route path=":name" element={<UserPage/>}/>
   </Routes>
  )
}

export default UserPageRoute