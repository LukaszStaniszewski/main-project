import React, {useState, Fragment, useEffect, Dispatch, SetStateAction} from 'react'
import { Topics } from "../../routes/create-collection/MOCKUP_DATA"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import {ICollectionTopics} from "../../routes/create-collection/MOCKUP_DATA"

interface ISelectDropDown {
   data: typeof Topics,
   setTopic: Dispatch<SetStateAction<keyof ICollectionTopics | undefined>>
}
type SelectedTopic = typeof Topics[number]
const SelectDropdown = ({data, setTopic} : ISelectDropDown) => {

   const [selected, setSelected] = useState<SelectedTopic | "Choose Topic">("Choose Topic")

   useEffect(() => {
      if(selected === "Choose Topic") return
      setTopic(selected)
   }, [selected])
  return (
 
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative z-10">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left  border-b-2 border-color-border-main  focus:outline-none focus-visible:border-main-hover focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-light-blue-100 text-light-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-light-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  )
}

export default SelectDropdown