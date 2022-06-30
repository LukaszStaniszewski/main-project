import { Fragment, useState, useEffect, Dispatch, SetStateAction} from 'react'
import { Reorder } from "framer-motion"

import { COLLECTIONS_MOCKUP, ICollectionTopics } from "../../routes/create-collection/MOCKUP_DATA"
import { Topic } from "../../routes/create-collection/create-collection"
import FormInput from "../form-input/form-input.componentx"
import ChosenItemField from "./item-field/chosenItemField.component"
import BaseItemField from "./item-field/baseItemField.component"

export interface IBaseField {
   name: ItemKey,
   valueType: string | number | boolean | Date,
   isAdded?: boolean 
}

interface ICreateItem {
   topic: Topic | undefined
   setItemFields: Dispatch<SetStateAction<IBaseField[] | undefined>>
}
type ItemKey = keyof ICollectionTopics[keyof ICollectionTopics]

const CreateItem = ({topic, setItemFields}: ICreateItem) => {
   const [baseFields, setBaseFields] = useState<IBaseField[]>([])
   const [addedFields, setAddedFields] = useState<IBaseField[]>([])

   const getCollectionKeyes = () => {
      if(!topic) return
       const collectionKeys  = Object.keys(COLLECTIONS_MOCKUP[topic]) as Array<ItemKey>
       return collectionKeys
   }

   const getBaseFields = () => {
      const collectionKeys = getCollectionKeyes()
      if(!collectionKeys || !topic) return []
      return collectionKeys.map(name => {
         if(COLLECTIONS_MOCKUP[topic][name].hasOwnProperty("isAdded")){
            return {name, valueType: typeof COLLECTIONS_MOCKUP[topic][name]}
         } 
         else {
            return {name, isAdded: false, valueType: typeof COLLECTIONS_MOCKUP[topic][name]}
         }
      })
   }

   useEffect(() => {
      const baseFields = getBaseFields()
      setBaseFields(baseFields)
      setAddedFields([])
   }, [topic])

   useEffect(() => {
      setItemFields(addedFields)
   }, [addedFields])

   // const addOrRemoveAllFields =() => {
   //    if(addedFields.length) return removeFields()
   //    addAllFields()
   // }

   const addAllFields = () => {
      setAddedFields(() => 
         baseFields.map(value => ({...value, isAdded: true}))
      )
      setBaseFields(() => 
         baseFields.filter(value => value === null)
      )
   }

   const removeFields =  () => {
      setBaseFields(() => getBaseFields())
      setAddedFields(() => 
         addedFields.filter(value => value === null)
      )
   }

   if(!topic) return <div className="h-30vh text-center col-start-1 col-end-3 text-xl mt-20">Choose a topic to see possible item fields</div>
  return (
   <Fragment>
      <div className=" border-b col-start-1 col-end-3 mt-4 grid grid-cols-2 gap-4 justify-items-center">
          <div className="col-start-1 col-end-2 flex items-center gap-10 with-33vw max-w-33vw">
                  <FormInput 
                     label="item name"
                     componentName="createCollection"
                     required
                  />
             
                  <FormInput
                     label="id"
                     componentName="createCollection"
                     required
                  />
          
             
         </div>
        <div className="col-start-2 col-end-3 w-33vw flex max-w-[80%] justify-center items-center ">
           
              
                   <button className="w-32 h-8 bg-red-300 text-2xl  rounded-l-full hover:bg-red-500 text-white hover:flex-grow transition-all duration-200 ease-in-out "
                     onClick={removeFields}
                   >
                      &#8594;
                  </button>
                  <button className="w-32 h-8 bg-green-300 text-2xl  rounded-r-full hover:bg-green-500 text-white hover:flex-grow transition-all duration-200 ease-in-out "
                     onClick={addAllFields}
                   >
                     &#8592;
                  </button>
              
           
        </div>
        
         <div className="col-start-3 col-end-4 flex items-center justify-end gap-10 w-29vw">
               <button className="btn btn-sm">ADD TAGS</button>
               <button className="btn btn-sm bg-green-600">Save item</button>
          
         </div>

      </div>
      
      <div className="col-start-1 col-end-2" >
         {/* <TextArea/> */}
         <Reorder.Group axis="y" values={addedFields} onReorder={setAddedFields}>
            {
               addedFields.map(baseField=> 
                  <Reorder.Item key={baseField.name} value={baseField}>
                     <ChosenItemField
                        key={baseField.name}
                        baseField={baseField}
                        setAddedFields = {setAddedFields}
                        setBaseFields = {setBaseFields}
                     />
                  </Reorder.Item>
               )
            }
         </Reorder.Group>
      </div>
      
      <div className="col-start-2 col-end-3">
         <Reorder.Group axis="y" values={baseFields} onReorder={setBaseFields}>
            {
               baseFields.map(baseField=> 
                  <Reorder.Item key={baseField.name} value={baseField}>
                  <BaseItemField
                     key={baseField.name}
                     setBaseFields = {setBaseFields}
                     baseField={baseField}
                     setAddedFields = {setAddedFields}
                  />
                  </Reorder.Item>
               )
            }
         </Reorder.Group>
      </div>
   </Fragment>
  )
}

export default CreateItem