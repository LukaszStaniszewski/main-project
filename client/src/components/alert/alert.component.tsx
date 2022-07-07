import {InformationCircleIcon, XIcon } from "@heroicons/react/outline"

export const ALERT_TYPE_CLASSES = {
   info: "info",
   error:"error",
   success: "success",
   warning: "warning",
}

export type Alert = keyof typeof ALERT_TYPE_CLASSES

export interface IAlert  {
   message: string,
   type: Alert,
   className?: string,
   toggle?: boolean
}

const Alert = ({type = "info", message = "message", className}: IAlert)=> {


  return (
   <div 
      className={`
      ${type === "info" && "bg-blue-50 border border-blue-400 text-blue-800"} 
      ${type === "error" && "bg-red-50 border border-red-400 rounded text-red-800"}
      ${type === "success" && "bg-green-50 border border-green-400 rounded text-green-800"}
      ${type === "warning" && "bg-yellow-50 border border-yellow-400 rounded text-yellow-800"}
      rounded  text-sm"  p-4 flex justify-between  ${className}`} >
     <div className="flex items-center">
         <InformationCircleIcon className="h-4 w-4 mr-2"/>
         <p>
            <span className="font-bold pr-2">Info:</span>
            {message}
         </p>
     </div>
     <div className="ml-6">
         <XIcon className="h-6 w-6"/>
      </div>
   </div>

  )
}

export default Alert