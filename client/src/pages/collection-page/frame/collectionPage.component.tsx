import { useEffect, useState } from 'react'
import { useParams, useNavigate,} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

import { getCollectionWithItemsStart } from "../../../store/collections/collection.actions"
import { selectCollection, selectCollectionErrorMessage, selectCollectionLoadingState,  } from "../../../store/collections/collection.selector"
import { ICollection, ICollectionWithoutItems } from "../../../store/collections/collection.types"
import HeaderExtension from "../../../components/headerExtension/headerExtension.component"
import Spinner from "../../../components/spinner/spinner.component"
import CustomTable from "../../../components/custom-table/customTable.component"
import { selectAdjustedItems } from "../../../store/items/item.selector"


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

const CollectionPage = () => {
   const [collectionWihoutItems, setCollectionWithoutItems] = useState<ICollectionWithoutItems>(defaultCollectionValues)
   const {name, topic, image, createdAt, description, owner} = collectionWihoutItems
   const [columns, setColumns] = useState([""])
   const params = useParams()
   const dispatch = useDispatch()
   const collection = useSelector(selectCollection)
  
   const error = useSelector(selectCollectionErrorMessage)
   const collectionFetch = useSelector(selectCollectionLoadingState)
   const items = useSelector(selectAdjustedItems)
   const navigate = useNavigate()
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
      setCollectionWithoutItems(collection)
      const columns = customizeColumns()
      setColumns(columns)
      console.log("columns", columns)
   }, [collection])
   
   const customizeColumns = () => {
      return  [...Object.keys(items[0])
      .filter(value => 
         value !== "_id" && 
         value !== "collectionId" && 
         value !== "optionalFields" && 
         value !== "createdAt" &&
         value !== "tags"
         ), "createdAt"]
   }

   const createItemHandler = () => {
      navigate("/new/item")
   }
  return (
    <section className=" relative z-0 pb-4">
      <HeaderExtension/>
      <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded">
         {collection
            ?  <div>
                  <div className="flex justify-between">
                     <div className="text-lg">{topic.charAt(0).toUpperCase() + topic.slice(1)}</div>
                     <div className="text-xl w-max">{name}</div>
                     <div className="w-max text-sm">{createdAt}</div>
                  </div>
                  <div className="flex justify-evenly my-5">
                     <span>{owner.name}</span>        
                  </div>
                  <div className="flex gap-20 "> 
                     {image && <img className="max-w-1/3 max-h-40vh bg-cover bg-no-repeat" src={image.url} alt="" />}
                     <ReactMarkdown className="w-1/2" children={description}/>
                  </div>
                  <button onClick={createItemHandler} className="btn my-5">new item</button>
                  <div>
                     {items && 
                        <CustomTable
                        //@ts-ignore
                           rows={items}
                           customizedColumns = {columns}
                        />
                     }
                  </div>
               </div>
            :  <Spinner/>
         }
      </main>
  
   </section>
  )
}

export default CollectionPage