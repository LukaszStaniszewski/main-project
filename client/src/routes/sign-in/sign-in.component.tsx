import {FormEvent, ChangeEvent, useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { useDispatch, useSelector } from "react-redux"

import FormInput from "../../components/form-input/form-input.componentx"
import SocialMediaAuthentication from "../../components/social-media-auth/socialMediaAuth.component"
import { signInStart } from "../../store/user/user.action"
import { selectErrorMessage,selectUserReducer } from "../../store/user/user.selector"

const defaultFormFields = {
   email: '',
   password: '',
}

const SignIn = () => {
   const [formFields, setFormFields] = useState(defaultFormFields)
   const {email,password,} = formFields
   const dispatch = useDispatch()
   const {currentUser, isLoading} = useSelector(selectUserReducer)
   const error = useSelector(selectErrorMessage)
   const navigate = useNavigate()
   
   useEffect(() => {
      if(currentUser) {
         navigate("/")
      }   
   },[])
 
   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(signInStart(formFields))
      if(!isLoading) {
         if(error){
            return alert(error.message)
         }  else {
            navigate("/")
         }
      }
   }

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setFormFields((prevState) => ({...prevState, [name]: value}))
   }

  return (
    <section className="relative  z-0">
         <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
         
         <main className=" bg-secondary xl:w-80vw w-60vw m-auto grid grid-cols-2 gap-x-20 h-min-max rounded-lg pt-6 pb-4 px-4">
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
               
               <SocialMediaAuthentication/>
              
               <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-xs font-light mx-4 mb-0">
                     <FormattedMessage
                        id="authentication.message"
                        defaultMessage="OR USE YOUR EMAIL"
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
                        required
                     />
               
                     <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
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