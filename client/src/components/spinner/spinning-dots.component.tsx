import React from "react";

const SpinningDots = () => {
   return (
      <div className=" flex items-center flex-col">
         <div className="loader-dots block relative w-20 h-5 mt-2">
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-400"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-400"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-400"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-400"></div>
         </div>
         <div className="text-gray-500 text-xs font-light mt-2 text-center">
            Please wait...
         </div>
      </div>
   );
};

export default SpinningDots;
