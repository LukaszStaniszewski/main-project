import { Fragment, useState, useEffect, Dispatch, SetStateAction, MouseEvent, ChangeEvent} from 'react'
import { Reorder } from "framer-motion"

import { COLLECTIONS_MOCKUP, ICollectionTopics } from "../../routes/create-collection/MOCKUP_DATA"
import { Topic } from "../../routes/create-collection/create-collection"
import FormInput from "../form-input/form-input.componentx"
import ChosenItemField, {fieldValues} from "./item-field/chosenItemField.component"
import BaseItemField from "./item-field/baseItemField.component"

export interface IItem {
   id: string,
   name: string,
   tags: string[],
   optional: UserInputFields
}

export interface IBaseField {
   fieldName: ItemKey,
   valueType: string | number | boolean | Date,
   isAdded?: boolean 
}

interface ICreateItem {
   topic: Topic
   setItemFields: Dispatch<SetStateAction<IItem | undefined>>
}
export type ItemKey = keyof ICollectionTopics[keyof ICollectionTopics]

export type UserInputFields = ICollectionTopics[Topic]

const CreateItem = ({topic, setItemFields}: ICreateItem) => {
   const [baseFields, setBaseFields] = useState<IBaseField[]>([])
   const [addedFields, setAddedFields] = useState<IBaseField[]>([])
               //@ts-ignore
   const [userInputData, setUserInputData] = useState<IItem>("")
   
   const getCollectionKeyes = () => {
      if(!topic) return
       const collectionKeys  = Object.keys(COLLECTIONS_MOCKUP[topic]) as Array<ItemKey>
       return collectionKeys
   }

   const getBaseFields = () => {
      const collectionKeys = getCollectionKeyes()
      if(!collectionKeys || !topic) return []
      return collectionKeys.map(fieldName => {
         return {fieldName, isAdded: false, valueType: typeof COLLECTIONS_MOCKUP[topic][fieldName]}
      })
   }

   useEffect(() => {
      const baseFields = getBaseFields()
      setBaseFields(baseFields)
      setAddedFields([])
   }, [topic])
   // useEffect(() => {
   //    setAddedFields(prevValue => prevValue.map(field => {
   //       //@ts-ignore
   //       return {...field, value: userInputData[field.fieldName]}

   //    }))
   // },[userInputData])

   const addAllFields = () => {
      if(!baseFields.length) return
      const upToDateBaseFields =  getBaseFields()
      setAddedFields(() => 
         upToDateBaseFields.map(value => ({...value, isAdded: true}))
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

   console.log("userInputData", userInputData)
   const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      // @ts-ignore
     setUserInputData(prevState => ({...prevState, [name]: value}))
   }
   const saveItemHandler = () => {
      if(userInputData)
      setItemFields(userInputData)
   }

   
  return (
   <Fragment>
      <div className=" border-b col-start-1 col-end-3 mt-4 grid grid-cols-2 gap-x-4 ">
         <div className="col-start-1 col-end-2 flex items-center gap-10 with-33vw max-w-33vw">
            <FormInput 
               label="item name"
               componentName="createCollection"
               onChange={handleChange}
               //@ts-ignore
               value={userInputData.name}
               name="name"
               required
            />
         
            <FormInput
               label="id"
               componentName="createCollection"
               onChange={handleChange}
               //@ts-ignore
               value={userInputData.id}
               name="id"
               required
            />
         </div>
         <div className="col-start-2 col-end-3 w-33vw flex 2xl:max-w-[50%] max-w-[80%] m-auto justify-center items-center ">

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
               <button className="btn btn-sm bg-green-600"
                  onClick={saveItemHandler}
               >Save item</button>
          
         </div>

      </div>
      
      <div className="grid grid-cols-2  gap-x-10  ">
         <div className="col-start-1 col-end-2" >
            <Reorder.Group axis="y" values={addedFields} onReorder={setAddedFields}>
               {
                  addedFields.map((baseField, index)=> 
                     <Reorder.Item key={index} value={baseField}>
                        <ChosenItemField
                           key={baseField.fieldName}
                           baseField={baseField}
                           setAddedFields = {setAddedFields}
                           setBaseFields = {setBaseFields}
               //@ts-ignore
                           setUserInputData= {setUserInputData}
                           topic = {topic}
                        />
                     </Reorder.Item>
                  )
               }
            </Reorder.Group>
         </div>
         
         <div className="col-start-2 col-end-3 ">
            <Reorder.Group axis="y" values={baseFields} onReorder={setBaseFields}>
               {
                  baseFields.map((baseField, index)=> 
                     <Reorder.Item key={index} value={baseField}>
                     <BaseItemField
                        key={baseField.fieldName}
                        setBaseFields = {setBaseFields}
                        baseField={baseField}
                        setAddedFields = {setAddedFields}
                     />
                     </Reorder.Item>
                  )
               }
            </Reorder.Group>
         </div>
      </div>
   </Fragment>
  )
}

export default CreateItem