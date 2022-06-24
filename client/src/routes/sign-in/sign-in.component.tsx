import {FormEvent, ChangeEvent, useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { useDispatch, useSelector } from "react-redux"

import FormInput from "../../components/form-input/form-input.componentx"
import SocialMediaAuthentication from "../../components/social-media-auth/socialMediaAuth.component"
import { signInStart } from "../../store/user/user.action"
import { selectErrorMessage,selectUserReducer } from "../../store/user/user.selector"
import e from "express"

const defaultFormFields = {
   email: '',
   password: '',
}

const SignIn = () => {
   const [formFields, setFormFields] = useState(defaultFormFields)
   const {email,password,} = formFields
   const dispatch = useDispatch()
   const error = useSelector(selectErrorMessage)
   const {currentUser, isLoading} = useSelector(selectUserReducer)
   const navigate = useNavigate()
   
   useEffect(() => {
      if(currentUser) {
         navigate("/")
      }   
   },[])
 
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(signInStart(formFields))
      
      if(error){
         return alert(error.message)
      } 
      !isLoading && navigate("/")
      
      
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
               {/* <img src="https://i.ibb.co/K6Dw3Yb/Screen-Shot-2022-06-16-at-17-44-22-PM.png" alt="login-picture" /> */}
                {/* <img src="https://images.unsplash.com/photo-1590593162201-f67611a18b87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=860&q=80" alt="" /> */}
                <img src="https://i.ibb.co/c2X3Vj5/Screen-Shot-2022-06-16-at-20-45-15-PM.png" alt="" />
               {/* <img src="https://images.unsplash.com/photo-1629683555749-893ad794d910?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=824&q=80" alt="" /> */}
               {/* <img src="https://images.unsplash.com/photo-1652911366117-cbbab4ed43f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80s" alt="" /> */}
               {/* <img src="https://images.unsplash.com/photo-1626272406318-11e56e35dbea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" /> */}
               {/* <img src="https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" alt="" /> */}
               {/* <img src="https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" alt="" /> */}

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