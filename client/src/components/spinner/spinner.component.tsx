import React from 'react'

const Spinner = () => {
  return (
   <div className="flex flex-col">
      <div className="flex flex-row space-x-4">
         <div className="w-12 h-12 rounded-full animate-spin border-y-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
      </div>
   </div>
  )
}

export default Spinner