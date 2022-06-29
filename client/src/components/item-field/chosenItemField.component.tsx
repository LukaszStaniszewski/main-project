import{useState} from 'react'
import DatePicker from "react-datepicker";
import {MinusIcon} from "@heroicons/react/solid"
import {motion, useAnimation, AnimatePresence, useIsPresent} from "framer-motion"
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

import {IItemField} from "./baseItemField.component"

const ChosenItemField = ({baseField, setAddedFields, setBaseFields}: IItemField) => {
   const {name, isAdded, valueType} = baseField
   const [startDate, setStartDate] = useState<Date>();
   const isPresent = useIsPresent()
   const controls = useAnimation()

   const moveFieldHandler =async () => {

      await startAnimation()

      setAddedFields(prevValue =>  prevValue.filter(field => field.name !== name))
      setBaseFields(prevValue => [{...baseField, isAdded: false}, ...prevValue, ]) 
   }

   const startAnimation = async () => {
      await  controls.start({
         opacity: 0,
         transition: {
            type:"spring",  
            stiffness: 70, 
            duration: 0.3
         }
      })
   }
   
  return (
   <AnimatePresence exitBeforeEnter  >
      {isPresent &&
      <motion.div 
         animate={controls}
         key={name}
      >
         <div className="mt-4 flex border whitespace-nowrap rounded h-10 relative border-green-300">
            <div onClick={moveFieldHandler} className="px-4  flex items-center">
               {
               isAdded &&   <div className="w-5  text-red-600 "><MinusIcon/></div>
               }
            </div>
            <div className="my-auto">{name}</div>
               {
               isAdded && valueType === "string" &&
               <input 
                  className=" text-gray-700  border-none focus:ring-transparent  py-2 px-4 block w-full appearance-none" 
                  placeholder="type here" 
                  type="text"
                  />
               }
               {
               isAdded && valueType === "boolean" && 
               <input className="checkbox" type="checkbox"  />
               } 
               {
               isAdded && valueType === "object" && 
               <div>
                  <DatePicker placeholderText="choose date" className="focus:ring-transparent outline-none border-none bg-transparent"
                     selected={startDate} 
                     onChange={(date:Date) => setStartDate(date)}
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
