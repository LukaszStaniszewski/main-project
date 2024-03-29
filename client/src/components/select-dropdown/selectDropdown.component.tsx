import React, { useState, Fragment, useEffect, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

import { Topics, Topic, topics } from "../create-item/item-types/itemTypes";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { selectTopicDropdown } from "../../store/local/local.selector";

interface ISelectDropDown {
   setTopic: Dispatch<SetStateAction<Topic | undefined>>;
}

const SelectDropdown = ({ setTopic }: ISelectDropDown) => {
   const [selected, setSelected] = useState<Topic | "Choose Topic">(() => {
      const topic = sessionStorage.getItem("topic") as Topic | undefined;
      if (!topic) return "Choose Topic";
      return topic;
   });
   const topicDropdownState = useSelector(selectTopicDropdown);

   useEffect(() => {
      if (selected === "Choose Topic") return;
      setTopic(selected);
      sessionStorage.setItem("topic", selected);
   }, [selected]);
   return (
      <Listbox
         data-test="select-dropdown"
         value={selected}
         onChange={setSelected}
         disabled={topicDropdownState}
      >
         <div className="relative z-10">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left  border-b-2 border-color-border-main  focus:outline-none focus-visible:border-main-hover focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
               <span className="block truncate">{selected}</span>
               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
               </span>
            </Listbox.Button>
            <Transition
               as={Fragment}
               leave="transition ease-in duration-100"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {topics.map((topic, topicIdx) => (
                     <Listbox.Option
                        key={topicIdx}
                        className={({ active }) =>
                           `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                 ? "bg-light-blue-100 text-light-blue-900"
                                 : "text-gray-900"
                           }`
                        }
                        value={topic}
                     >
                        {({ selected }) => (
                           <Fragment>
                              <span
                                 className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                 }`}
                              >
                                 {topic}
                              </span>
                              {selected ? (
                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-light-blue-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                 </span>
                              ) : null}
                           </Fragment>
                        )}
                     </Listbox.Option>
                  ))}
               </Listbox.Options>
            </Transition>
         </div>
      </Listbox>
   );
};

export default SelectDropdown;
