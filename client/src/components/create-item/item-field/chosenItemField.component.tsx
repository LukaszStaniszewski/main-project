import { useState, ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import DatePicker from "react-datepicker";
import { MinusIcon } from "@heroicons/react/outline";
import { motion, useAnimation, AnimatePresence, useIsPresent } from "framer-motion";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import { IOptionalFieldComponent } from "./optionalField.component";
import {
   OptionalFieldsByTopic,
   ICreateItem,
   IOptionalField,
   COLLECTIONS_MOCKUP,
   Topic,
} from "../item-types/itemTypes";

interface IChosenItemField<T extends Topic> extends Omit<IOptionalFieldComponent<T>, "baseField"> {
   setUserInputData: Dispatch<SetStateAction<ICreateItem<T>>>;
   collectionTopic: Topic;
   addedField: IOptionalField<T>;
}

const ChosenItemField = <T extends Topic>({
   addedField,
   setChosenOptionalFields,
   setUserInputData,
   setOptionalFields,

   collectionTopic,
}: IChosenItemField<T>) => {
   const { fieldName, isAdded, valueType } = addedField;
   const [startDate, setStartDate] = useState<Date>();
   const [fieldValue, setFieldValues] = useState<OptionalFieldsByTopic<T>>(
      COLLECTIONS_MOCKUP[collectionTopic]
   );
   const isPresent = useIsPresent();
   const controls = useAnimation();

   console.log("fieldNAme", fieldName);

   const stringifyName = useCallback(() => fieldName.toString(), [fieldName]);
   const stringifiedName = stringifyName();

   const handleChange = (event?: ChangeEvent<HTMLInputElement>, date?: Date) => {
      let value: string | boolean | Date | number;
      if (valueType === "boolean" && event) {
         value = event.target.checked.toString();
      } else if (valueType === "Date") {
         setStartDate(date);
         value = date as Date;
      } else if (valueType === "number" && event) {
         value = event.target.value;
      } else {
         return;
      }

      setFieldValues((prevState) => ({ ...prevState, [stringifiedName]: value }));

      setUserInputData((prevState) => ({
         ...prevState,
         optionalFields: { ...prevState.optionalFields, [stringifiedName]: value },
      }));
   };

   const moveFieldHandler = async () => {
      const stringifiedName = stringifyName();
      await startAnimation();

      setChosenOptionalFields((prevValue) =>
         prevValue.filter((field) => field.fieldName !== fieldName)
      );
      setOptionalFields((prevValue) => [{ ...addedField, isAdded: false }, ...prevValue]);

      setUserInputData((prevState) =>
         prevState.optionalFields && prevState.optionalFields[fieldName] === fieldValue[fieldName]
            ? // prevState.optionalFields && prevState.optionalFields.hasOwnProperty(fieldName)
              {
                 ...prevState,
                 optionalFields: {
                    ...prevState.optionalFields,
                    [stringifiedName]: "",
                 },
              }
            : prevState
      );
   };

   // const saveInSession = () => {
   //    sessionStorage.setItem("setField", )
   // }

   const startAnimation = async () => {
      await controls.start({
         opacity: 0,
         transition: {
            type: "tween",
         },
      });
   };

   return (
      <AnimatePresence>
         {isPresent && (
            <motion.div animate={controls} key={stringifyName()}>
               <div className="mt-4 flex border whitespace-nowrap rounded h-10 relative border-green-300">
                  <div onClick={moveFieldHandler} className="px-4  flex items-center">
                     {isAdded && (
                        <div className="w-5  text-red-600 ">
                           <MinusIcon />
                        </div>
                     )}
                  </div>

                  <div className="my-auto">{stringifiedName}</div>
                  {isAdded && valueType === "string" && (
                     <input
                        className=" text-gray-700 placeholder-style  border-none focus:ring-transparent  py-2 px-4 block w-full appearance-none"
                        placeholder="&#9998;"
                        name={stringifiedName}
                        onChange={handleChange}
                        type="text"
                     />
                  )}
                  {isAdded && valueType === "number" && (
                     <input
                        className=" text-gray-700  border-none focus:ring-transparent  py-2 px-4 block w-full appearance-none"
                        placeholder="&#9998;"
                        type="number"
                        name={stringifiedName}
                        onChange={handleChange}
                     />
                  )}
                  {isAdded && valueType === "boolean" && (
                     <input
                        className="checkbox"
                        type="checkbox"
                        name={stringifiedName}
                        onChange={handleChange}
                     />
                  )}
                  {isAdded && valueType === "function" && (
                     <div>
                        <DatePicker
                           placeholderText="&#128467;"
                           className="focus:ring-transparent outline-none border-none bg-transparent"
                           selected={startDate}
                           name={stringifiedName}
                           //@ts-ignore
                           onChange={(date) => handleChange(undefined, date)}
                           closeOnScroll={true}
                        />
                     </div>
                  )}
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default ChosenItemField;
