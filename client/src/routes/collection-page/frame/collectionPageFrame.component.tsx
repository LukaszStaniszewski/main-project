import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"


import { getCollectionWithItemsStart } from "../../../store/collections/collection.actions"
import { selectCollection, selectCollectionErrorMessage, selectCollectionLoadingState,  } from "../../../store/collections/collection.selector"
import { IItem } from "../../../store/items/item.types"
import { ICollection, ICollectionWithoutItems } from "../../../store/collections/collection.types"
import HeaderExtension from "../../../components/headerExtension/headerExtension.component"
import Spinner from "../../../components/spinner/spinner.component"
import CustomTable from "../../../components/custom-table/customTable.component"
import { ItemKey, COLLECTIONS_MOCKUP } from "../../../components/create-item/item-types/itemTypes"
import { Topics } from "../../create-collection/MOCKUP_DATA"


const defaultCollectionValues:ICollection = {
   _id: "",
   name: '',
   topic: "books",
   image: undefined,
   createdAt: "",
   updatedAt: "",
   description: "",
   owner: {
      name: "",
      _id: "",
   },
}

const defaultItemValues = {
   collectionId: "",
   id: "",
   name: "",
   topic: "",
   tags: [],
   createdAt : "",
   updatedAt: "",
   optionalFields: undefined
}


const CollectionPageFrame = () => {
   const [items, setItems] = useState<IItem[]| undefined>([defaultItemValues]);
   const [collectionWihoutItems, setCollectionWithoutItems] = useState<ICollectionWithoutItems>(defaultCollectionValues)
   const {name, topic, image, createdAt, description, owner} = collectionWihoutItems
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
   console.log("items")
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
     
      <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded">
         {collection
              ? <div>
                  <div className="text-xl text-center">Collection: {name} made by <span>{owner.name}</span></div>
                  <div className="text-lg">{topic}</div>
                  <div>Created at: {createdAt}</div>
                  <ReactMarkdown children={description}/>
                  {image && <img className="w-1/4" src={image.url} alt="" />}
      
                     {items && 
                        items.map(item => 
                           <div>
                              <div>{item.name}</div>
                              <div>
                                 {item.optionalFields
                                    ? <div>
                                       {Object.keys(item.optionalFields).map(field =>
                                       //@ts-ignore
                                             <div>{item[field]}</div>
                                          )}
                                    </div>
                                       
                                    
                                    : "Get started by creating new items"
                                 }
                              </div>

                           </div>
                        ) 
                     }
            </div>
            : <Spinner/>
         }
      </main>
  
   </section>
  )
}

export default CollectionPageFrame