import {useEffect, useState} from 'react'
import { useDispatch } from "react-redux"

import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser, selectUserReducer, } from "../../store/user/user.selector"
import { getUserByCredentialsStart } from "../../store/user/user.action"
import { getCollectionsWithItemsByUserStart, getCollectionsWithoutItemsStart } from "../../store/collections/collection.actions"
import { selectCollectionReducer, selectCollections, selectCollectionsWithoutItems } from "../../store/collections/collection.selector"
import CustomTable from "../custom-table/customTable.component"

const UserPageLayout = () => {
   const [userr , setUser] = useState()
   const [collections, setCollections] = useState([])
   const {currentUser, user, isLoading} = useSelector(selectUserReducer)
   const {collectionFetch , collectionsWihoutItems} = useSelector(selectCollectionReducer)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {name} = useParams()
   useEffect(() => {
 
      if(!name) return
      dispatch(getUserByCredentialsStart(name))
      console.log(user)
      if(user && !isLoading) {
         // console.log("hit")
         // dispatch(getCollectionsWithItemsByUserStart(user.name))
      } else if(!user && !isLoading) {
         navigate("/")
      }
      // search db for user with useParams data
      // if exists give his collections
      // otherwise 404 error

   },[])

   const authorization = () => {
      // if (currentUser?._id === collections[0].owner._id || currentUser?.status === "admin")
      // then user has write access
      // otherwise only read access
   }
   const getUserHandler =async  () => {
      if(!name) return
      // dispatch(getUserByCredentialsStart(name))
      dispatch(getCollectionsWithoutItemsStart(name))

         const adjustedCollections = adjustCollections()
      console.log(adjustedCollections)

         //@ts-ignore
         setCollections(adjustedCollections)

      // const {items, ...excludeItems} = collections 

   }
   console.log("collections", collections)
   const adjustCollections = () => {
      console.log("collectionsWihoutItems", collectionsWihoutItems)
     return collectionsWihoutItems.map(collection => {
         return {...collection, owner: collection.owner.name, image: collection.image?.url}
      })
   }
   console.log("name", name)
   const userNotFound = () => {
      return (
         <div>"userNotFound 404"</div>
      )
   }
  return (
   <section className=" relative z-0 ">
      <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
      <main className="grid grid-cols-8 bg-secondary w-90vw m-auto" >
      <button className="bg-color-primary text-cyan-50 m-2" onClick={getUserHandler}>get user</button>
         <div className="col-start-1 col-end-7 ">
            Collections
            {collections.length && <CustomTable rows={collections}/>}
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