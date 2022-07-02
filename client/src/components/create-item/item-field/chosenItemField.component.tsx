import{useState, ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react'
import DatePicker from "react-datepicker";
import {MinusIcon} from "@heroicons/react/outline"
import {motion, useAnimation, AnimatePresence, useIsPresent} from "framer-motion"
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import {IItemField} from "./baseItemField.component"
import {ItemKey, UserInputFields} from "../createItem.component"
import {Topic} from "../../../routes/create-collection/create-collection"
import { COLLECTIONS_MOCKUP, ICollectionTopics } from "../../../routes/create-collection/MOCKUP_DATA"

interface IChosenItemField extends IItemField {
   setUserInputData:  Dispatch<SetStateAction<UserInputFields | undefined>>,

   topic: Topic
}
export type fieldValues<Type> = {[Property in keyof Type]: string; };
   
const ChosenItemField = ({baseField, setAddedFields, setUserInputData, setBaseFields, topic}: IChosenItemField) => {
                   
   const {fieldName, isAdded, valueType} = baseField
   const [startDate, setStartDate] = useState<Date>();
   const [fieldValue, setFieldValues] = useState<UserInputFields>(COLLECTIONS_MOCKUP[topic]);
   const isPresent = useIsPresent()
   const controls = useAnimation()

   const setDateHandler = (date:any) => {
          setStartDate(date)
           // @ts-ignore
         setFieldValues(prevState => ({...prevState, [fieldName]: date}))
 // @ts-ignore
          setUserInputData(prevState => ({...prevState, optional: {...prevState.optional, [fieldName]: date}}))
   }

   const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name
       // @ts-ignore
      let value;
      if(valueType === "boolean") {
         value = event.target.checked
      } else {
         value = event.target.value
      }
     
      // @ts-ignore
      setFieldValues(prevState => ({...prevState, [name]: value}))
      // @ts-ignore
     setUserInputData(prevState => ({...prevState, optional: {...prevState.optional, [name]: value}}))
   }


   const moveFieldHandler =async () => {
      await startAnimation()

      setAddedFields(prevValue =>  prevValue.filter(field => field.fieldName !== fieldName))
      setBaseFields(prevValue => [{...baseField, isAdded: false}, ...prevValue, ]) 
      //@ts-ignore
      setUserInputData(prevState =>  prevState.optional[fieldName] === fieldValue[fieldName] ? {...prevState, optional: {...prevState.optional ,[fieldName]: null}}: prevState)
      //@ts-ignore
   }
   // useEffect(() => {
   //    if(isAdded) return
   //    console.log("hit")
   //    //@ts-ignore
   //    setUserInputData(prevState => prevState[fieldName] === fieldValue[fieldName] ? {...prevState, [fieldName]: ""}: prevState)
   // }, [baseField])

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

                  //@ts-ignore
                  value={fieldValue.name}
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
                  //@ts-ignore
                  value={fieldValue.name}
                  name={fieldName}
                  onChange={handleChange}
                  />
               }
               {
               isAdded && valueType === "boolean" && 
               <input 
                  className="checkbox" 
                  type="checkbox"
                  //@ts-ignore

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
                     // onChange={(date:Date) => setStartDate(date)}
                     // @ts-ignore
                     onChange={(date) => setDateHandler(date)}
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
