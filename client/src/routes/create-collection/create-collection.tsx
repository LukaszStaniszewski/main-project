import {useState, useEffect} from 'react'

import { Topics, COLLECTIONS_MOCKUP, ICollectionTopics } from "./MOCKUP_DATA"
import FormInput from "../../components/form-input/form-input.componentx"
import SelectElement from "../../components/select-dropdown/selectDropdown.component"
import ItemFields from "../../components/item-field/baseItemField.component"
import ChosenItemField from "../../components/item-field/chosenItemField.component"

export interface IBaseField {
   name: keyof ICollectionTopics[keyof ICollectionTopics],
   valueType: string | number | boolean | Date,
   isAdded?: boolean 
}

const CreateCollection = () => {
   const [topic, setTopic] = useState<keyof ICollectionTopics>()
   const [baseFields, setBaseFields] = useState<IBaseField[]>([])
   const [addedFields, setAddedFields] = useState<IBaseField[]>([])

   useEffect(() => {
      if(!topic) return

      const itemFields  = Object.keys(COLLECTIONS_MOCKUP[topic]) as Array<keyof ICollectionTopics[typeof topic]>
      
      const baseFields =  itemFields.map(name => {
            if(COLLECTIONS_MOCKUP[topic][name].hasOwnProperty("isAdded")){
               return {name, valueType: typeof COLLECTIONS_MOCKUP[topic][name]}
            } 
            else {
               return {name, isAdded: false, valueType: typeof COLLECTIONS_MOCKUP[topic][name]}
            }
         })
      setBaseFields(baseFields)

   }, [topic])

  return (
   <section className=" relative z-0 overflow-auto" >
      <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
      <main className="w-90vw m-auto bg-secondary grid grid-cols-2 gap-x-10 p-3 relative"  >
       
         <div className="col-start-1 col-end-2 flex items-center">
            <div className="w-full">
               <FormInput
                  label="collection name"
                  componentName="createCollection"
                  required
               />
           </div>
         </div>
         <div className="col-start-2 col-end-3 flex items-center">
            <div className="w-full">
               {/* @ts-ignore */}
               <SelectElement setTopic={setTopic} data={Topics}/>
            </div>
         </div>
   

         <div className="col-start-1 col-end-2" >
            {/* <TextArea/> */}
            <div className="max-w-xl">
               <label    className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="font-medium text-gray-600">
                           Drop files to Attach, or
                           <span className="text-blue-600 underline"> browse</span>
                        </span>
                  </span>
                  <input type="file" name="file_upload" className="hidden"/>
               </label>
            </div>
            {
               addedFields.map((baseField, i )=> 
               <ChosenItemField
                  key={i}
                  baseField={baseField}
                  setAddedFields = {setAddedFields}
                  setBaseFields = {setBaseFields}
               />
               
             
               )
            }
         </div>

         <div className="col-start-2 col-end-3">
            <FormInput
               label="id"
               componentName="createCollection"
               required
            />
            <FormInput
               label="item name"
               componentName="createCollection"
               required
            />
            {
               baseFields.map((baseField, i )=> 
               <ItemFields
                  key={i}
                  setBaseFields = {setBaseFields}
                  baseField={baseField}
                  setAddedFields = {setAddedFields}
               />
               )
            }
         </div>
      
      </main>
   </section>
  )
}

export default CreateCollection