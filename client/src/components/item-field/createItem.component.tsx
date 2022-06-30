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

   const addOrRemoveAllFields =() => {
      if(addedFields.length) return removeFields()
      addAllFields()
   }

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

   if(!topic) return <div>Choose a topic to see possible item fields</div>
  return (
   <Fragment>
      {/* <div className="text-center">ADD Item To Collection</div> */}
      <div className="col-start-1 col-end-3 flex justify-between mt-4  items-center">
         {/* save Item
            add all fields
            remove all fields
         */}
          <div className="w-2/5">
             <FormInput
                  label="item name"
                  componentName="createCollection"
                  required
               />
          </div>
          <button className="min-w-auto w-32 h-8 bg-green-600 rounded text-2xl hover:bg-red-600 text-white"
            onClick={addOrRemoveAllFields}
          >
             &#11138;
         </button>
         <div className="w-2/5">
            <FormInput
               label="id"
               componentName="createCollection"
               required
            />
         </div>
         {/* <button className="btn btn-sm bg-green-600">Save item</button> */}
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