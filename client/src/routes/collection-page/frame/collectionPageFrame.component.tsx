import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCollectionWithItemsStart } from "../../../store/collections/collection.actions"
import { selectCollection, selectCollectionErrorMessage, selectCollectionLoadingState,  } from "../../../store/collections/collection.selector"
import { IItem } from "../../../store/items/item.types"
import { ICollectionWithoutItems } from "../../../store/collections/collection.types"
import HeaderExtension from "../../../components/headerExtension/headerExtension.component"
import Spinner from "../../../components/spinner/spinner.component"

const CollectionPageFrame = () => {
   const [items, setItems] = useState<IItem[]>();
   const [collectionWihoutItems, setCollectionWithoutItems] = useState<ICollectionWithoutItems>()
   const params = useParams()
   const dispatch = useDispatch()
   const collection = useSelector(selectCollection)
   const error = useSelector(selectCollectionErrorMessage)
   const collectionFetch = useSelector(selectCollectionLoadingState)
   const navigate = useNavigate()
   console.log("items", items,)
   console.log( "collectionWihoutItems", collectionWihoutItems)
   useEffect(() => {
      //@ts-ignore
      dispatch(getCollectionWithItemsStart(params.id))
   }, [])
   
   useEffect(() => {
      if(!error) return
     navigate("/")
   },[error])

   useEffect(() => {
      if(!collection) return
      const {items, ...collectionWihoutItems} = collection
      setItems(items); setCollectionWithoutItems(collectionWihoutItems)
   }, [collection])

  return (
    <section className=" relative z-0 pb-4">
      <HeaderExtension/>
     
      <main className="bg-secondary w-90vw m-auto max-w-90vw  screen-height p-4 rounded">
         {
            collection
            ? <Fragment>
               <div>{collection.name}</div>
               <div>{collection.topic}</div>
               <div>{collection.createdAt}</div>
               <div>{collection.description}</div>
            </Fragment>
            : <Spinner/>
         }
      </main>
  
   </section>
  )
}

export default CollectionPageFrame