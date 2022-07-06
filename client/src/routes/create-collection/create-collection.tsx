import {Fragment, useState, ChangeEvent, FormEvent, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CloudUploadIcon } from "@heroicons/react/outline"
import { Dialog, Transition } from "@headlessui/react"
import { PencilIcon } from "@heroicons/react/outline"
import ReactMarkdown from "react-markdown"

import { Topics} from "./MOCKUP_DATA"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import FormInput from "../../components/form-input/form-input.componentx"
import SelectElement from "../../components/select-dropdown/selectDropdown.component"
import CreateItem from "../../components/create-item/createItem.component"

import { ICreateItem,CollectionTopic } from "../../components/create-item/item-types/itemTypes"
import { API_URL, postRequest } from "../../api/axios-instance.api"
import { selectCurrentUser } from "../../store/user/user.selector"
import { createCollectionWithItemsStart } from "../../store/collections/collection.actions"
import MarkdownTextArea from "../../components/markdown-text/markdownTextArea.component"

const defaultFormFields = {
   name: "",
   description: "",

}

const defaultItemData = {
   id: "",
   name: "",
   tags: [""],
   topic: ""
}

interface ICollectionFields {
   name: string,
   description?: string,
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
   const [collectionFields, setCollectionFields] = useState<ICollectionFields>(defaultFormFields)
   const [itemData, setItemData] = useState<ICreateItem>(defaultItemData)
   const [fileDataURL, setFileDataURL] = useState(null);
   const [image, setImage] = useState<File>()
   let [isOpen, setIsOpen] = useState(false)
   const dispatch = useDispatch()
   const currentUser = useSelector(selectCurrentUser)


   const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
      console.log(image)
      event.preventDefault()
      const collectionWithItems = appendItemsToCollection()
      // @ts-ignore
      dispatch(createCollectionWithItemsStart({collectionWithItems: collectionWithItems, image: image}))

      // const response = await postRequest(API_URL.UPLOAD_IMAGE,  {image: image})

   }
   const appendItemsToCollection = () => {
      return {...collectionFields, topic: collectionTopic, owner:{_id: currentUser?._id, name: currentUser?.name} ,items: new Array(itemData)}
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

   function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  console.log("collectionFields", collectionFields)
  return (
   <section className=" relative z-0 overflow-auto" >
      <HeaderExtension/>

      <main className="w-90vw m-auto bg-secondary grid grid-cols-2 gap-x-10 p-3 min-h-max relative content-start"  >
         <div className="flex justify-between col-start-1 col-end-3 pb-3 border-b-2">
          
            <div></div>
            {/* <button className="btn btn-sm">ADD IMAGE</button> */}
            
            {/* <ul className="steps text-sm w-2/3">
               <li className="step step-info ">Choose Topic</li>
               <li className="step step-info">Add Item</li>
            </ul> */}
            <h1 className="text-2xl pb-1">Create Collection</h1>
            <button className="btn btn-sm" form="create-collection" type="submit">DONE!</button>
         </div>
       
         <div className="col-start-1 col-end-2  ">
            <form  onSubmit={handleSubmit} id="create-collection">
            <div className="w-full">
               <FormInput
                  label="collection name"
                  componentName="createCollection"
                  //@ts-ignore
                  value={collectionFields.name}
                  onChange={handleChange}
                  name="name"
                  // required
               />
            </div>
            <div className="max-w-xl">
               <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                        <CloudUploadIcon className="w-1/12"/>
                        <span className="font-medium text-gray-600">
                           Drop files to Attach, or
                           <span className="text-blue-600 underline"> browse</span>
                        </span>
                  </span>
                  <input type="file" name="image" className="hidden" accept="image/*" onChange={selectFileHandler}/>
               </label>
            </div>
            </form>
            {fileDataURL ?
        <p className="img-preview-wrapper">
          {
            <img src={fileDataURL} alt="preview" />
          }
        </p> : null}
         </div>

         <div className="col-start-2 col-end-3">
            <div className="w-full">
               <SelectElement setTopic={setCollectionTopic} data={Topics}/>
            </div>
            <button className="flex gap-3 border w-full my-5 p-4 cursor-pointer" onClick={openModal}>
               <span className="whitespace-nowrap">
                  Write a description 
               </span> 
               <PencilIcon className="w-6"/>
            </button>
            <Transition appear show={isOpen} as={Fragment}>
               <Dialog onClose={closeModal} className="relative z-50 ">
                  <div className="fixed inset-0 flex items-center justify-center">
                     <Dialog.Panel className="w-full max-w-max rounded bg-gradient-to-r from-sky-500 to-cyan-500 pb-4 pl-4 pr-4">
                        <MarkdownTextArea/>
                        <button>Save</button>
                     </Dialog.Panel>
                  </div>
               </Dialog>
            </Transition>

          
           {!collectionFields && <button className="btn btn-sm bg-green-600">Save item</button>}
         </div>
         {collectionTopic
            ?  <div className="col-start-1 col-end-3 h-70vh">
                  <CreateItem 
                     collectionTopic={collectionTopic}
                     setItemData = {setItemData}
                  />
               </div> 
            : <div className="h-30vh text-center col-start-1 col-end-3 text-xl mt-20">Choose a topic to see possible item fields</div>
         }
      
      </main>

   </section>
  )
}

export default CreateCollection