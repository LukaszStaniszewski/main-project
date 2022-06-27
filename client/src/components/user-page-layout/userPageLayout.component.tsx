import React from 'react'
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"

const UserPageLayout = () => {
   const currentUser = useSelector(selectCurrentUser)
   const {name} = useParams()
   console.log("name", name)
  return (
   <section className=" relative z-0 ">
      <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
      
      <main className="grid grid-cols-8 bg-secondary w-90vw m-auto" >
         <div className="col-start-1 col-end-7 ">
            Collections
         </div>
         <div className="col-start-7 col-end-9 p-5 border-l-2">
            <figure className="flex gap-2 pb-4">
               <img src="#" alt="#" />
               <span>{currentUser?.name}</span>
            </figure>
            <Link to="/new" className="btn btn-block bg-color-secondary hover:bg-color-primary outline-none">New Collection</Link>
            <div>4 Collections</div>
         </div>
      </main>

 </section>
  )
}

export default UserPageLayout