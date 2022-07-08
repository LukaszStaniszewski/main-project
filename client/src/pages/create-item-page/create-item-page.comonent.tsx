import { useEffect, useState,  } from "react"
import { useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

import CreateItem from "../../components/create-item/createItem.component"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import { selectCollection } from "../../store/collections/collection.selector"
import { ICreateItem, CollectionTopic } from "../../components/create-item/item-types/itemTypes"
import { ICollection } from "../../store/collections/collection.types"
import { selectCurrentUser } from "../../store/user/user.selector"
import { createItemsStart } from "../../store/items/item.actions"

const CreateItemPage = () => {
   const [topic, setTopic] = useState<CollectionTopic>(() => {
      const saved = sessionStorage.getItem("chosenCollection")
      if(!saved) return ""
      const collection = JSON.parse(saved)
      return collection.topic
   })
   const [chosenCollection, setChosenCollection] = useState<ICollection>(() => {
      const saved = sessionStorage.getItem("chosenCollection")
      if(!saved) return ""
      return JSON.parse(saved)
   })
   const [itemData, setItemData] = useState<ICreateItem>()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const collection = useSelector(selectCollection)
   const currentUser = useSelector(selectCurrentUser)
   
   useEffect(() => {
      if(!collection && !currentUser) {
         // sessionStorage.removeItem("chosenCollection")
         // return navigate("/")
      } 
      if(collection) {
         setChosenCollection(collection)
         setTopic(collection.topic)
      }
         
   },[collection])

   useEffect(() => {
      if(!collection ) return
      sessionStorage.setItem("chosenCollection", JSON.stringify(collection)) 
   },[collection])

   useEffect(() => {
      const item = adjustItem()
      if(!item) return
      dispatch(createItemsStart(item))
   },[itemData])

   const adjustItem = (): ICreateItem[] | null=> {
      if(!itemData || !chosenCollection._id) return null
      return [{...itemData, collectionId: chosenCollection._id}]
   }

   const toCollectionPageHandler = () => {
      navigate(-1)
   }
  return (
    <section className="relative z-0 pb-4">
      <HeaderExtension/>
      {topic && topic ? <div className="w-90vw m-auto bg-secondary p-3 screen-height">
                  <div className="flex justify-between">
                    <div>Add item to collection</div>
                     <div>Collection: {chosenCollection.name}</div>
                     <button className="btn btn-sm" onClick={toCollectionPageHandler}>To collection page</button>
                  </div>
                  <CreateItem
                     collectionTopic={topic}
                     //@ts-ignore
                     setItemData={setItemData}
                     buttonText="Create Item"
                  />
               </div>
               : <div></div>
      }
    </section>
  )
}

export default CreateItemPage