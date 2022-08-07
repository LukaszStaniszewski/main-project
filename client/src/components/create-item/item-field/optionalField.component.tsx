import { Dispatch, SetStateAction } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { motion, useAnimation, AnimatePresence, useIsPresent } from "framer-motion";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import { IOptionalField, Topic } from "../item-types/itemTypes";

export interface IOptionalFieldComponent<T extends Topic> {
   baseField: IOptionalField<T>;
   setChosenOptionalFields: Dispatch<SetStateAction<IOptionalField<T>[]>>;
   setOptionalFields: Dispatch<SetStateAction<IOptionalField<T>[]>>;
}

const OptionalField = <T extends Topic>({
   baseField,
   setChosenOptionalFields,
   setOptionalFields,
}: IOptionalFieldComponent<T>) => {
   const { fieldName, isAdded } = baseField;
   const isPresent = useIsPresent();
   const controls = useAnimation();

   const moveFieldHandler = async () => {
      await startAnimation();

      setChosenOptionalFields((prevValue) => [...prevValue, { ...baseField, isAdded: true }]);
      setOptionalFields((prevValue) => prevValue.filter((field) => field.fieldName !== fieldName));
   };

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
            <motion.div key={fieldName.toString()} animate={controls}>
               <div className="mt-4 flex border border-gray-300 whitespace-nowrap rounded h-10 relative">
                  <div onClick={moveFieldHandler} className="px-4  flex items-center">
                     {!isAdded && (
                        <div className="w-5  text-green-600 ">
                           <PlusIcon />
                        </div>
                     )}
                  </div>
                  <div className="my-auto">{fieldName.toString()}</div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default OptionalField;
