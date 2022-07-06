import {Fragment, useState, ChangeEvent, FormEvent, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CloudUploadIcon, PhotographIcon, InformationCircleIcon, XIcon } from "@heroicons/react/outline"
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel, Popover, PopoverHandler, PopoverContent} from "@material-tailwind/react"

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
import Spinner from "../../components/spinner/spinner.component"
import Alert from "../../components/alert/alert.component"

const requiredCollectionFields = {
   name: "",
   description: "",
   topic: undefined,
}

type Test = keyof typeof requiredCollectionFields

const defaultItemData = {
   id: "",
   name: "",
   tags: [""],
   topic: ""
}

export interface ICollectionFields {
   name: string,
   description: string,
   topic?: typeof Topics,
}

export interface ICreateCollection extends ICollectionFields{
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
   const [messageToUser, setMessageToUser] = useState("")
   const [image, setImage] = useState<File>()
   const dispatch = useDispatch()
   const currentUser = useSelector(selectCurrentUser)
   const collectionFetch = useSelector(selectCollectionLoadingState)
   const error = useSelector(selectCollectionErrorMessage)
   
   const setCardHandler = () => setHeader(!header)

   const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const collectionWithItems = appendItemsToCollection()
      const validated = validation(collectionWithItems)
      if(!validated) return
      // @ts-ignore
      dispatch(createCollectionWithItemsStart({collectionWithItems: collectionWithItems, image: image}))
      if(!error) return setMessageToUser("Collection has been saved!")
   }

   const appendItemsToCollection = () => {
      console.log(collectionTopic)
      return {...collectionFields, topic: collectionTopic, owner:{_id: currentUser?._id, name: currentUser?.name} ,items: new Array(itemData)}
   }
      // @ts-ignore
   const validation = (collectionWithItems) => {
      if(!collectionWithItems.name || !collectionWithItems.description || !collectionWithItems.topic){
         return setMessageToUser(`You missed required fields!`)
      }
      setMessageToUser("Saving...")
      return true
   }

   const handleChange = async (event:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setCollectionFields(prevValue =>  ({...prevValue, [name]: value}))
   }

  const selectFileHandler = (event:ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files) return
      const file = event.target.files[0];
      if (!file.type.match(imageMimeType)) {
         alert("Image mime type is not valid");
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

 

  console.log("collectionWithItems", collectionFields)
  return (
   <section className="relative z-0 pb-4" >
      <HeaderExtension/>
      {/* <div className="absolute z-50 w-full h-full">
         <div className=" flex justify-center items-center h-full">
               <Alert 
                  alertType="error" 
                  text="this is info alert"
                  className="text-md"
               />
         </div>
      </div> */}
      <Tabs value="createCollection"  className="w-90vw m-auto bg-secondary p-3 screen-height " >
         <div className="flex justify-between items-center">
            
            <div/>
               <TabsHeader>
               <Tab value="createCollection" className="text-2xl w-50vw pb-1 cursor-pointer" onClick={setCardHandler}>Create Collection</Tab>
               <Tab value="addItems" className="text-2xl  pb-1 cursor-pointer" onClick={setCardHandler} >Add items</Tab>
               </TabsHeader>
            
            <div>  
               <Popover>
                  <PopoverHandler>
                     <button className={`btn ${collectionFetch && "loading"}`} form="create-collection"  type="submit">DONE!</button>
                  </PopoverHandler>
                  <PopoverContent className="whitespace-nowrap">{messageToUser}</PopoverContent>   
               </Popover> 
         
            </div>
         </div>
          
         <TabsBody>
            <TabPanel value="createCollection"  className="grid grid-cols-2 content-start gap-x-10">
            <div className="col-start-1 col-end-2">
               <form noValidate onSubmit={handleSubmit} id="create-collection">
               <div className="w-full">
                  <FormInput
                     label="collection name"
                     componentName="createCollection"
                     value={collectionFields.name}
                     onChange={handleChange}
                     name="name"
                     required
                  />
               </div>
               <div>
                  {fileDataURL 
                     ? <img src={fileDataURL} alt="preview" />  
                     : null
                  }
                  <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-tertiary focus:outline-none">
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
               </form>

            </div>

            <div className="col-start-2 col-end-3">
               <div className="w-full mb-5">
                  <SelectElement setTopic={setCollectionTopic} data={Topics}/>
               </div>
                  <MarkdownTextArea
                     setText={setCollectionFields}
                  />
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

export default CreateCollection



