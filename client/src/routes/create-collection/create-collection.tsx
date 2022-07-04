import {Fragment, useState, ChangeEvent} from 'react'
import { CloudUploadIcon } from "@heroicons/react/outline"
import { Dialog, Transition } from "@headlessui/react"
import { PencilIcon } from "@heroicons/react/outline"

import { Topics, ICollectionTopics } from "./MOCKUP_DATA"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import FormInput from "../../components/form-input/form-input.componentx"
import SelectElement from "../../components/select-dropdown/selectDropdown.component"
import CreateItem from "../../components/create-item/createItem.component"
import TextArea from "../../components/text-area/textArea.component"
import { IItemData } from "../../components/create-item/item-types/itemTypes"

const defaultFormFields = {
   name: ""
}
const defaultItemData = {
   id: "",
   name: "",
   tags: [""],
}

export type CollectionTopic = keyof ICollectionTopics

const CreateCollection = () => {
   const [collectionTopic, setCollectionTopic] = useState<CollectionTopic>()
   const [collectionFields, setCollectionFields] = useState(defaultFormFields)
   const [itemData, setItemData] = useState<IItemData>(defaultItemData)
   const {name} = collectionFields
   let [isOpen, setIsOpen] = useState(false)
   console.log(itemData)
   
   const handleSubmit = () => {
      
   }

   const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setCollectionFields(prevState => ({...prevState, [name]: value}))
   }
   function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  
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
            <button className="btn btn-sm" type="submit">DONE!</button>
         </div>
       
         <div className="col-start-1 col-end-2  ">
            <div className="w-full">
               <FormInput
                  label="collection name"
                  componentName="createCollection"
                  value={name}
                  onChange={handleChange}
                  name="name"
                  required
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
                  <input type="file" name="file_upload" className="hidden"/>
               </label>
            </div>
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
                  <div className="fixed inset-0 flex items-center justify-center p-4">
                     <Dialog.Panel className="w-full max-w-max rounded bg-gradient-to-r from-sky-500 to-cyan-500 p-4">
                     <TextArea
                        buttonText="add description"
                        textAreaText="Write a description..."
                     />
                     </Dialog.Panel>
                  </div>
               </Dialog>
            </Transition>


           {!collectionFields && <button className="btn btn-sm bg-green-600">Save item</button>}
         </div>
   

        
            {/* <TextArea/> */}
   
   
   
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