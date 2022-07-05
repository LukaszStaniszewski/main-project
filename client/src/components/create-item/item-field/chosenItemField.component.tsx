import{useState, ChangeEvent, Dispatch, SetStateAction} from 'react'
import DatePicker from "react-datepicker";
import {MinusIcon} from "@heroicons/react/outline"
import {motion, useAnimation, AnimatePresence, useIsPresent} from "framer-motion"
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import {IOptionalFieldComponent} from "./optionalField.component"
import {OptionalItemData, ICreateItem, IOptionalField, COLLECTIONS_MOCKUP, CollectionTopic} from "../item-types/itemTypes"

interface IChosenItemField extends IOptionalFieldComponent {
   setUserInputData:  Dispatch<SetStateAction<ICreateItem>>,
   setChosenOptionalFields:  Dispatch<SetStateAction<IOptionalField[]>>,
   setOptionalFields:  Dispatch<SetStateAction<IOptionalField[]>>,
   collectionTopic: CollectionTopic
}
export type fieldValues<Type> = {[Property in keyof Type]: string; };
   
const ChosenItemField = ({baseField, setChosenOptionalFields, setUserInputData, setOptionalFields, collectionTopic}: IChosenItemField) => {
                   
   const {fieldName, isAdded, valueType} = baseField
   const [startDate, setStartDate] = useState<Date>();
   const [fieldValue, setFieldValues] = useState<OptionalItemData>(COLLECTIONS_MOCKUP[collectionTopic]);
   const isPresent = useIsPresent()
   const controls = useAnimation()

   const handleChange = (event?:ChangeEvent<HTMLInputElement>, date? : Date) => {
      let value:any;
      if(valueType === "boolean") {
         value = event?.target.checked.toString()
      } else if(valueType === "function") {
         setStartDate(date)
         value = date
      } else  
         value = event?.target.value
      
      setFieldValues(prevState => ({...prevState, [fieldName]: value}))
      setUserInputData(prevState => ({...prevState, optional: {...prevState.optional, [fieldName]: value}}))
   }

   const moveFieldHandler =async () => {
      await startAnimation()

      setChosenOptionalFields(prevValue =>  prevValue.filter(field => field.fieldName !== fieldName))
      setOptionalFields(prevValue => [{...baseField, isAdded: false}, ...prevValue, ]) 

      setUserInputData(prevState => prevState.optional&& prevState.optional[fieldName] === fieldValue[fieldName] ? {...prevState, optional: {...prevState.optional ,[fieldName]: ""}}: prevState)

   }

   const startAnimation = async () => {
      await  controls.start({
         opacity: 0,
         transition: {
            type:"tween",  
         }
      })
   }
   
  return (
   <AnimatePresence >
      {isPresent &&
      <motion.div 
         animate={controls}
         key={fieldName}
      >
         <div className="mt-4 flex border whitespace-nowrap rounded h-10 relative border-green-300">
            <div onClick={moveFieldHandler} className="px-4  flex items-center">
               {
               isAdded &&   <div className="w-5  text-red-600 "><MinusIcon/></div>
               }
            </div>
            <div className="my-auto">{fieldName}</div>
               {
               isAdded && valueType === "string" &&
               <input 
                  className=" text-gray-700 placeholder-style  border-none focus:ring-transparent  py-2 px-4 block w-full appearance-none" 
                  placeholder="&#9998;"
                  name={fieldName}
                  onChange={handleChange}
                  type="text"
                  />
               }
                {
               isAdded && valueType === "number" &&
               <input 
                  className=" text-gray-700  border-none focus:ring-transparent  py-2 px-4 block w-full appearance-none" 
                  placeholder="&#9998;" 
                  type="number"
                  name={fieldName}
                  onChange={handleChange}
                  />
               }
               {
               isAdded && valueType === "boolean" && 
               <input 
                  className="checkbox" 
                  type="checkbox"
                  name={fieldName}
                  onChange={handleChange}
                />
               } 
               {
               isAdded && valueType === "function" &&
               <div>
                  <DatePicker placeholderText="&#128467;" className="focus:ring-transparent outline-none border-none bg-transparent"
                     selected={startDate} 
                     name={fieldName}
                  //@ts-ignore
                     onChange={(date) => handleChange({}, date)}
                     closeOnScroll={true}
               />
            </div>
            }
         </div>
      </motion.div>
      }
   </AnimatePresence>
  )
}

export default ChosenItemField
