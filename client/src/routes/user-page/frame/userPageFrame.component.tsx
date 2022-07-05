import {useEffect, useState} from 'react'
import { useDispatch } from "react-redux"

import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser, selectUserReducer, } from "../../../store/user/user.selector"
import { getUserByCredentialsStart } from "../../../store/user/user.action"
import {  getCollectionsWithoutItemsStart } from "../../../store/collections/collection.actions"
import { selectCollectionErrorMessage, selectCollectionReducer, selectCollectionsWithoutItems,} from "../../../store/collections/collection.selector"
import CustomTable from "../../../components/custom-table/customTable.component"
import HeaderExtension from "../../../components/headerExtension/headerExtension.component"
import { ICollectionWithoutItems } from "../../../store/collections/collection.types"

export interface ICustomizedCollections extends Omit<ICollectionWithoutItems, "image" | "owner"> {
   image: string | undefined,
   owner: string,
}

const UserPageFrame = () => {
   const [collections, setCollections] = useState<ICustomizedCollections[]>([])
   const {currentUser, user, isLoading} = useSelector(selectUserReducer)
   const collectionsWihoutItems = useSelector(selectCollectionsWithoutItems)
   const error = useSelector(selectCollectionErrorMessage)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {name} = useParams()
   
   useEffect(() => {
      if(!name) return
      dispatch(getUserByCredentialsStart(name))
      getCollections()
   },[name])

   useEffect(() => {
      if(!error) return
     navigate("/")
   },[error])

   const getCollections =async  () => {
      if(!name) return
      dispatch(getCollectionsWithoutItemsStart(name))
   }

   useEffect(() => {
      setCollections(adjustCollections())
   }, [collectionsWihoutItems])

   const adjustCollections = (): ICustomizedCollections[] => {
      return collectionsWihoutItems.map(collection => {
          return {...collection, owner: collection.owner.name, image: collection.image?.url}
       })
    }
    

   const authorization = () => {
      // if (currentUser?._id === collections[0].owner._id || currentUser?.status === "admin")
      // then user has write access
      // otherwise only read access
   }
   
 
   const userNotFound = () => {
      return (
         <div>"userNotFound 404"</div>
      )
   }
  return (
   <section className=" relative z-0 pb-4">
      <HeaderExtension/>
      <main className="grid grid-cols-8 bg-secondary w-90vw m-auto max-w-90vw  screen-height p-4"  >
         <div className="col-start-1 col-end-7 overflow-x-auto">
            {collections.length && <CustomTable rows={collections}/>}
         </div>
         <div className="col-start-7 col-end-9 p-5 border-l-2">
            <figure className="flex gap-2 pb-4">
               <img src="#" alt="#" />
               <span>{currentUser?.name}</span>
            </figure>
            <Link to="/new" className="btn btn-block bg-color-secondary hover:bg-color-primary outline-none">New Collection</Link>
            {collectionsWihoutItems.length > 0 && <div>{collectionsWihoutItems.length} Collections</div>}
         </div>
      </main>

 </section>
  )
}

export default UserPageFrame