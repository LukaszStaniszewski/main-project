import {useEffect, useState} from 'react'
import { useDispatch } from "react-redux"

import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserReducer, } from "../../../store/user/user.selector"
import { getUserByCredentialsStart } from "../../../store/user/user.action"
import {  getCollectionsWithoutItemsStart } from "../../../store/collections/collection.actions"
import { selectCollectionErrorMessage, selectCollectionsWithoutItems,} from "../../../store/collections/collection.selector"
import CustomTable from "../../../components/custom-table/customTable.component"
import HeaderExtension from "../../../components/headerExtension/headerExtension.component"
import { ICollectionWithoutItems } from "../../../store/collections/collection.types"

export interface ICustomizedCollections extends Omit<ICollectionWithoutItems, "image" | "owner"> {
   image: string | undefined,
   owner: string,
}

const UserPage = () => {
   const [columns, setColumns] = useState<string[]>([""])
   const [writeMode, setWriteMode] = useState(false)
   const {currentUser} = useSelector(selectUserReducer)
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

   const getCollections = async  () => {
      if(!name || collectionsWihoutItems.length) return
      dispatch(getCollectionsWithoutItemsStart(name))
   }

   useEffect(() => {
      if(!collectionsWihoutItems.length) return
      const columns = customizeColumns()
      setColumns(columns)
      authorization()
   }, [collectionsWihoutItems])
   
   
   const customizeColumns = () => {
      return  [...Object.keys(collectionsWihoutItems[0])
      .filter(value => 
         value !== "_id" && 
         value !== "description" && 
         value !== "createdAt"
         ), "createdAt"]
   }
   const authorization = () => {
      if (currentUser?.name === collectionsWihoutItems[0].owner || currentUser?.status === "admin") {
         setWriteMode(true)
      } else {
         setWriteMode(false)
      } 
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
            {columns.length > 1 && <CustomTable rows={collectionsWihoutItems} url="collection" customizedColumns={columns}/>}
         </div>
        {writeMode && <div className="col-start-7 col-end-9 p-5 border-l-2">
            <figure className="flex gap-2 pb-4">
               <img src="#" alt="#" />
               <span>{currentUser?.name}</span>
            </figure>
            <Link to="/new" className="btn btn-block bg-color-secondary hover:bg-color-primary outline-none">New Collection</Link>
            {collectionsWihoutItems.length > 0 && <div>{collectionsWihoutItems.length} Collections</div>}
         </div>}
      </main>

 </section>
  )
}

export default UserPage