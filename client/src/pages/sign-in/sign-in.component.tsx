import {FormEvent, ChangeEvent, useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { useDispatch, useSelector } from "react-redux"

import FormInput from "../../components/form-input/form-input.componentx"
import SocialMediaAuthentication from "../../components/social-media-auth/socialMediaAuth.component"
import { signInStart } from "../../store/user/user.action"
import { selectErrorMessage} from "../../store/user/user.selector"
import {selectUserReducer} from "../../store/user/user.selector"
import Alert, {IAlert} from "../../components/alert/alert.component"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"

const alertSettings:IAlert  = {
   message: "",
   toggle: false,
   type: "info"
}

const defaultFormFields = {
   email: '',
   password: '',
}

const SignIn = () => {
   const [formFields, setFormFields] = useState(defaultFormFields)
   const [alert, setAlert] = useState(alertSettings)
   const {email,password,} = formFields
   const dispatch = useDispatch()
   const {currentUser, isLoading} = useSelector(selectUserReducer)
   const navigate = useNavigate()
   const error = useSelector(selectErrorMessage)
   
   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(signInStart(formFields))
     
   }

   useEffect(() => {
      if(currentUser) {
         navigate(`/user/${currentUser.name}`)
      }   
   },[currentUser])

   useEffect(() => {
     if(!error) return
      setAlert({toggle: true, message: error, type: "error"})
   },[error])

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setFormFields((prevState) => ({...prevState, [name]: value}))
   }

  return (
    <section className="relative  z-0">
         <HeaderExtension></HeaderExtension>
         
         <main className=" bg-secondary xl:w-80vw w-60vw m-auto grid grid-cols-2 gap-x-20 screen-height rounded-lg pt-6 pb-4 px-4">
            <figure className="mt-2">
                <img src="https://i.ibb.co/c2X3Vj5/Screen-Shot-2022-06-16-at-20-45-15-PM.png" alt="" />
            </figure>

            <section className="">
      
               <p className="text-center text-xl font-bold ">
                  <FormattedMessage 
                     id="authentication.signIn.messageOne"
                     defaultMessage="Welcome Back"/>
               </p>
               <p className="text-center text-lg mt-3 mb-5">
                  <FormattedMessage
                     id="authentication.signIn.messageTwo"
                     defaultMessage="We are happy to see you back"
                  />
               </p>
               
               <div className={`${!alert.toggle && "opacity-0"}`}
                  onClick={()=> setAlert(prevState => ({...prevState, toggle: false}))}
               >
                  <Alert
                     message={alert.message}
                     type = {alert.type}
                  />
                 
               </div>
               <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-xs font-light mx-4 mb-0">
                     <FormattedMessage
                        id="authentication.message"
                        defaultMessage="LOGIN WITH EMAIL"
                     />
                  </p>
               </div>

               <div>
                  <form onSubmit={handleSubmit} >
                     <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        componentName="authentication"
                        required
                     />
               
                     <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        componentName="authentication"
                        required
                     />
                     <button className="btn btn-block bg-color-secondary hover:bg-color-primary">
                        <FormattedMessage
                           id="authentication.button.signIn"
                           defaultMessage="SIGN IN"
                        />
                     </button>
                  </form>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                     <Link to='/signup' className="text-center font-light text-xs mx-4 mb-0 hover:underline">
                        <FormattedMessage
                           id="authentication.link.signIn"
                           defaultMessage="CREATE AN ACCOUNT"
                        />
                     </Link>
                  </div>
               </div>
            </section>
           
         </main>
    </section>
  )
}

export default SignIn