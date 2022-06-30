import{useState, ChangeEvent} from 'react'
import DatePicker from "react-datepicker";
import {MinusIcon} from "@heroicons/react/outline"
import {motion, useAnimation, AnimatePresence, useIsPresent} from "framer-motion"
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import {IItemField} from "./baseItemField.component"

const ChosenItemField = ({baseField, setAddedFields, setBaseFields}: IItemField) => {
   const {name, isAdded, valueType} = baseField
   const [startDate, setStartDate] = useState<Date>();
   const [fieldValues, setFieldValues] = useState({});
   const isPresent = useIsPresent()
   const controls = useAnimation()


   const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setFieldValues(prevState => ({...prevState, [name]: value}))
   }

   console.log(fieldValues)
   const moveFieldHandler =async () => {
      await startAnimation()

      setAddedFields(prevValue =>  prevValue.filter(field => field.name !== name))
      setBaseFields(prevValue => [{...baseField, isAdded: false}, ...prevValue, ]) 
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
                  className=" text-gray-700 placeholder-style  border-none focus:ring-transparent  py-2 px-4 block w-full appearance-none" 
                  placeholder="&#9998;"
                    //@ts-ignore
                  value={fieldValues.name}
                  name={name}
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
                  value={fieldValues.name}
                  name={name}
                  onChange={handleChange}
                  />
               }
               {
               isAdded && valueType === "boolean" && 
               <input 
                  className="checkbox" 
                  type="checkbox"
                  value={name}
                  name={name}
                  onChange={handleChange}
                />
               } 
               {
               isAdded && valueType === "object" && 
               <div>
                  <DatePicker placeholderText="&#128467;" className="focus:ring-transparent outline-none border-none bg-transparent"
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
