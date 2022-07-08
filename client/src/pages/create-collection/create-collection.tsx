import React, { useState, ChangeEvent, FormEvent, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { PhotographIcon} from "@heroicons/react/outline"
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react"

import { Topics} from "./MOCKUP_DATA"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import FormInput from "../../components/form-input/form-input.componentx"
import SelectElement from "../../components/select-dropdown/selectDropdown.component"
import CreateItem from "../../components/create-item/createItem.component"

import { ICreateItem,CollectionTopic } from "../../components/create-item/item-types/itemTypes"
import { selectCurrentUser } from "../../store/user/user.selector"
import { createCollectionWithItemsStart } from "../../store/collections/collection.actions"
import MarkdownTextArea from "../../components/markdown-text/markdownTextArea.component"
import { selectCollectionErrorMessage, selectCollectionLoadingState } from "../../store/collections/collection.selector"
import Alert, {IAlert} from "../../components/alert/alert.component"
import { disableTopicDropdown } from "../../store/local/local.action"

const requiredCollectionFields = {
   name: "",
   description: "",
   topic: undefined,
}

const alertSettings:IAlert  = {
   message: "",
   toggle: true,
   type: "info"
}

export const defaultItemData = {
   id: "",
   name: "",
   tags: [""],
   topic: "",
}

export interface ICollectionFields {
   name: string,
   description: string,
   topic?: CollectionTopic
}

export interface ICreateCollection extends Omit<ICollectionFields, "topic">{
   topic: CollectionTopic,
   owner: {
      _id: string,
      name: string
   }
   image?: {
      url: string,
      imageId: string,
   }
   items?: ICreateItem[]
}

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CreateCollection = () => {
   const [collectionTopic, setCollectionTopic] = useState<CollectionTopic>()
   const [collectionFields, setCollectionFields] = useState<ICollectionFields>(requiredCollectionFields)
   const [itemData, setItemData] = useState<ICreateItem>(defaultItemData)
   const [header, setHeader] = useState(false)
   const [fileDataURL, setFileDataURL] = useState(null);
   const [alert, setAlert] = useState(alertSettings)
   const [image, setImage] = useState<File>()
   const dispatch = useDispatch()
   const currentUser = useSelector(selectCurrentUser)
   const collectionFetch = useSelector(selectCollectionLoadingState)
   const error = useSelector(selectCollectionErrorMessage)
   
   
   const setCardHandler = () => setHeader(!header)

   const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const collectionWithItems = appendItemsToCollection()
      if(!collectionWithItems) return
      dispatch(createCollectionWithItemsStart({collectionWithItems: collectionWithItems, image: image}))
      if(!error) return setAlert(prevState => ({...prevState, message: "Collection has been saved!", toggle: true, type:"success"}))
      dispatch(disableTopicDropdown(false))
      clearSession()
   }

   const appendItemsToCollection = (): ICreateCollection | false => {
      if(!currentUser?.name|| !currentUser?._id || !collectionTopic){
         setAlert(prevState => ({...prevState, toggle: true, message: `You missed required fields!`, type:"error"}))
         return false
      }
      return {...collectionFields, topic: collectionTopic, owner:{_id: currentUser?._id, name: currentUser?.name} ,items: new Array(itemData)}
   }

   const clearSession = () => {
      sessionStorage.removeItem("topic")
      sessionStorage.removeItem("description")
   }

   const handleChange = async (event:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setCollectionFields(prevValue =>  ({...prevValue, [name]: value}))
   }

  const selectFileHandler = (event:ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files) return
      const file = event.target.files[0];
      if (!file.type.match(imageMimeType)) {
         setAlert(prevState => ({toggle: true, message: "Saving...", type: "error"}));
         return;
       }

      setImage(file)
  }

  useEffect(() => {
      // @ts-ignore
   let fileReader, isCancel = false;
   if (image) {
     fileReader = new FileReader();
     fileReader.onload = (e) => {
      // @ts-ignore
       const { result } = e.target;
       if (result && !isCancel) {
         setFileDataURL(result)
       }
     }
     fileReader.readAsDataURL(image);
   }
   return () => {
     isCancel = true;
      // @ts-ignore
     if (fileReader && fileReader.readyState === 1) {
      // @ts-ignore
       fileReader.abort();
     }
   }

 }, [image]);

 useEffect(() => {
   setAlert({message: "You won't be able to change a topic, after you add an item.", toggle: true, type: "info"})
 },[])

  console.log("collectionWithItems", collectionFields)
  return (
   <section className="relative z-0 pb-4" >
      <HeaderExtension/>
      <Tabs value="createCollection"  className="w-90vw m-auto bg-secondary p-3 screen-height " >
         <div className="flex justify-between items-center">
            
            <div/>
               <TabsHeader>
               <Tab value="createCollection" className="text-2xl w-50vw pb-1 cursor-pointer" onClick={setCardHandler}>Create Collection</Tab>
               <Tab value="addItems" className="text-2xl  pb-1 cursor-pointer" onClick={setCardHandler} >Add items</Tab>
               </TabsHeader>

               <button className={`btn ${collectionFetch && "loading"}`} form="create-collection"  type="submit">DONE!</button>
         </div>
          
         <TabsBody>
            <TabPanel value="createCollection"  className="grid grid-cols-2 content-start gap-x-10">
               <div className="col-start-1 col-end-2">
                  <form onSubmit={handleSubmit} id="create-collection">
                  <div className="w-full">
                     <FormInput
                        label="collection name"
                        componentName="createCollection"
                        value={collectionFields.name}
                        onChange={handleChange}
                        name="name"

                     />
                  </div>
                  <MarkdownTextArea
                     setText={setCollectionFields}
                  />
                  </form>

               </div>

               <div className="col-start-2 col-end-3">
                  <div className="w-full mb-5">
                     <SelectElement setTopic={setCollectionTopic} data={Topics}/>
                  </div>
                  <div className={`${!alert.toggle && "opacity-0"}`} onClick={()=> setAlert(prevState => ({...prevState, toggle: false}))}>
                     <Alert 
                        type={alert.type}
                        message={alert.message}
                        className="text-sm"       
                      />
                  </div>
                  <div>
                     {fileDataURL 
                        ? <img src={fileDataURL} alt="preview" />  
                        : null
                     }
                     <label className="flex justify-center w-full h-32 px-4 bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-tertiary focus:outline-none">
                        <span className="flex items-center space-x-2">
                              <PhotographIcon className="w-1/12"/>
                              <span className="font-medium text-gray-600">
                                 Drop files to Attach, or
                                 <span className="text-blue-600 underline"> browse</span>
                              </span>
                        <input type="file" name="image" className="hidden" accept="image/*" onChange={selectFileHandler}/>
                        </span>
                     </label>
                  </div>
               </div>

             
            </TabPanel>
            <TabPanel className="col-start-1 col-end-3 h-70vh" value="addItems">
             {collectionTopic
                  ?  <div className="col-start-1 col-end-3 h-70vh">
                        <CreateItem 
                           collectionTopic={collectionTopic}
                           setItemData = {setItemData}
                        />
                     </div> 
                  : <div className="h-30vh text-center col-start-1 col-end-3 text-xl mt-20">Choose collection topic to see possible item fields</div>
               }
              
            </TabPanel>
         </TabsBody>
      
     
      </Tabs>
   </section>
  )
}

export default React.memo(CreateCollection)



