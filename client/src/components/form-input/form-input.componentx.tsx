import { InputHTMLAttributes} from 'react';
import { FormattedMessage } from "react-intl"


type FormInputProps = { label: string, componentName: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({label,componentName, required, ...otherProps} : FormInputProps) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <input  {...otherProps} id="floating-input"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-color-border-main rounded-lg appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-color-border-main-hover peer" placeholder=" "  required={required}/>
      <label htmlFor="floating-input" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-color-secondary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${required && "after:content-['*'] after:ml-0.5 after:text-color-primary"}`}>
      <FormattedMessage
         id={`${componentName}.${label.toLocaleLowerCase()}`}
         defaultMessage={label}
      />
      </label>
    </div>
  )
}

export default FormInput