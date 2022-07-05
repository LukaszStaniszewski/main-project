import { Fragment} from 'react'
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { Routes, Route } from "react-router-dom"
import UserPageLayout from "../../components/user-page-layout/userPageLayout.component"

const UserPage = () => {
   const currentUser = useSelector(selectCurrentUser)
   console.log(currentUser)
 
  return (
   <Fragment>
      <Routes>
         <Route path=":name" element={<UserPageLayout/>}/>
      </Routes>
   </Fragment>
  )
}

export default UserPage