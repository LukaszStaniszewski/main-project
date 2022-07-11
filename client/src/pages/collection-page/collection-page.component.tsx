import { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate,} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { CogIcon } from "@heroicons/react/outline"
import {Menu,MenuHandler,MenuList,MenuItem, Button} from "@material-tailwind/react"

import { getCollectionWithItemsStart } from "../../store/collections/collection.actions"
import { selectCollection, selectCollectionErrorMessage, selectCollectionsWithoutItems,  } from "../../store/collections/collection.selector"
import { ICollection, ICollectionWithoutItems } from "../../store/collections/collection.types"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import Spinner from "../../components/spinner/spinner.component"
import CustomTable from "../../components/custom-table/custom-table.component"
import { selectAdjustedItems } from "../../store/items/item.selector"
import useDeleteItems from "../../hooks/items/delete-items.hook"
import { IItem } from "../../store/items/item.types"
import useDeleteCollection from "../../hooks/collection/delete-collections.hook"
import { selectCurrentUser } from "../../store/user/user.selector"

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
   const {name, topic, image,  description, owner} = collectionWihoutItems
   const [columns, setColumns] = useState([""])
   const [writeMode, setWriteMode] = useState(false)

   const [selectedItems, setSelectedItems] = useState<IItem[] | [""]>([""])
   const [deleteItems] = useDeleteItems()
   const [deleteCollection] = useDeleteCollection()
   const params = useParams()
   const dispatch = useDispatch()
   const collection = useSelector(selectCollection)
   const currentUser = useSelector(selectCurrentUser)
   const collectionsWihoutItems = useSelector(selectCollectionsWithoutItems)
   const items = useSelector(selectAdjustedItems)
   const navigate = useNavigate()
   
   useEffect(() => {
      dispatch(getCollectionWithItemsStart(params.id as string))
   }, [])

   useEffect(() => {
      if(!collection) return
      authorization()
   }, [])

   const authorization = () => {
      if (currentUser?.name == collection.owner.name || currentUser?.status === "admin") {
         setWriteMode(true)
      } else {
         setWriteMode(false)
      } 
   }

   useEffect(() => {
      if(!collection) return
      setCollectionWithoutItems(collection)
      if(!items.length) return
      const columns = customizeColumns()
      setColumns(columns)
   }, [collection])
 
   const customizeColumns = () => {
     
      return  [...Object.keys(items[0])
      .filter(value => 
         value !== "_id" && 
         value !== "collectionId" && 
         value !== "optionalFields" && 
         value !== "createdAt" &&
         value !== "tags" &&
         value !== "description"
         ), "createdAt"]
   }
 
   const deleteSelectedItems = () => {
      //@ts-ignore
      deleteItems(items, selectedItems.filter(v => v !== ""))
   }

   const toCreateItemPage = () =>  navigate("/new/item");
   
   const deleteCurrentCollection = () => {
      deleteCollection(collectionsWihoutItems, collection)
      navigate(`/user/${collection.owner.name}`)
   }

  return (
    <section className=" relative z-0 pb-4">
      <HeaderExtension/>
      <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded">
         {collection
            ?  <div>
                  <div className="flex justify-between mb-10">
                     <div className="text-lg w-max font-semibold"><span>{owner.name}</span> / {topic}</div>
                     <div className="text-xl font-bold">{name.charAt(0).toUpperCase() + name.slice(1)}</div>                    
                     { writeMode &&
                     <Menu offset={{crossAxis: -30, mainAxis: 5}}>
                        <MenuHandler className="w-8 mr-10 ">
                           <CogIcon/>
                        </MenuHandler>
                        <MenuList >
                           <MenuItem className="text-black">Update Collection</MenuItem>
                           <MenuItem onClick={deleteCurrentCollection} className="text-black">Delete Collection</MenuItem>
                        </MenuList>
                     </Menu>
                     }
                  </div>
                  <div className="flex gap-20 "> 
                     {image && <img className="max-w-1/3 max-h-40vh bg-cover bg-no-repeat" src={image.url} alt="" />}
                     <ReactMarkdown className="w-1/2" children={description}/>
                  </div>
                  <div className="flex  my-5 gap-20">
                  {writeMode && 
                    <Fragment>
                        <Button 
                           onClick={toCreateItemPage} 
                           variant="outlined" 
                        >new item
                        </Button>
                        {items.length > 0 && 
                           <Button 
                           onClick={deleteSelectedItems}
                           variant="outlined" 
                           >delete item
                        </Button>}
                    </Fragment>
                  }  
                  </div>
                  <div>
                     {items && columns.length > 1 && 
                        <CustomTable
                        //@ts-ignore
                           rows={items}
                           customizedColumns = {columns}
                           checkboxesAvaible={true}
                        //@ts-ignore
                            setSelectedItems={setSelectedItems}
                            url="item"

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