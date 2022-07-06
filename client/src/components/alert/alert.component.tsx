import {InformationCircleIcon, XIcon } from "@heroicons/react/outline"

export const ALERT_TYPE_CLASSES = {
   info: "info",
   error:"error",
   success: "success",
   warning: "warning",
}

type Alert = keyof typeof ALERT_TYPE_CLASSES

const Alert = ({alertType = "info", text = "message", className}: {alertType:  Alert, text: string, className?: string})=> {

  return (
   <div 
      className={`
      ${alertType === "info" && "bg-blue-50 border border-blue-400 text-blue-800"} 
      ${alertType === "error" && "bg-red-50 border border-red-400 rounded text-red-800"}
      ${alertType === "success" && "bg-green-50 border border-green-400 rounded text-green-800"}
      ${alertType === "warning" && "bg-yellow-50 border border-yellow-400 rounded text-yellow-800"}
      rounded  text-sm"  p-4 flex justify-between shadow-lg ${className}`} >
     <div className="flex items-center">
         <InformationCircleIcon className="h-4 w-4 mr-2"/>
         <p>
            <span className="font-bold pr-2">Info:</span>
            {text}
         </p>
     </div>
     <div className="ml-6">
         <XIcon className="h-6 w-6"/>
      </div>
   </div>

  )
}

export default Alert