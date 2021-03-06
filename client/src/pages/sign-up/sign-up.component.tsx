import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { useDispatch, useSelector } from "react-redux"

import FormInput from "../../components/form-input/form-input.componentx"
import SocialMediaAuthentication from "../../components/social-media-auth/socialMediaAuth.component"
import { signUpStart } from "../../store/user/user.action"
import { selectCurrentUser, selectErrorMessage} from "../../store/user/user.selector"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"


const defaultFormFields = {
   email: '',
   name: '',
   password: '',
   confirmPassword: '',
}

const SignUp = () => {
   const [userCredentials, setUserCredentials] = useState(defaultFormFields)
   const {email, name, password, confirmPassword} = userCredentials
   const navigate = useNavigate()

   const dispatch = useDispatch()
   const error = useSelector(selectErrorMessage)
   const currentUser = useSelector(selectCurrentUser)

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if(password !== confirmPassword) return alert("passwords don't match") 
      dispatch(signUpStart({email, name, password}))
   }

   useEffect(() => {
      if(currentUser) {
         navigate(`/user/${currentUser.name}`)
      }   
   },[currentUser])

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setUserCredentials((prevState) => ({...prevState, [name]: value}))
   }

  return (
    <section className="relative z-0">
         <HeaderExtension/>
         
         <main className=" bg-secondary xl:w-80vw w-60vw m-auto grid grid-cols-2 gap-x-20 screen-height rounded-lg pt-6 pb-4 px-4">
            <figure className="mt-2">
               <img src="https://i.ibb.co/BTWS1xQ/Screen-Shot-2022-06-16-at-13-12-20-PM.png" alt="sign-up-picture" />
            </figure>
           
            <section className="">
               <p className="text-center text-xl font-bold ">
                 <FormattedMessage
                     id="authentication.signUp.messageOne"
                     defaultMessage="Welcome"
                 />
               </p>
               <p className="text-center text-lg mt-3 mb-5">
                  <FormattedMessage
                     id="authentication.signUp.messageTwo"
                     defaultMessage="Join our community"
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
                        componentName="authentication"
                        required
                     />
               
                     <FormInput
                        label="Username"
                        type="text"
                        name="name"
                        value={name}
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
               
                     <FormInput
                        label="ConfirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        componentName="authentication"
                        required
                     />
                     <button className="btn btn-block bg-color-secondary hover:bg-color-primary">
                        <FormattedMessage
                           id="authentication.button.register"
                           defaultMessage="REGISTER"
                        />
                     </button>
                     
                  </form>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                     <Link to='/signin' className="text-center font-light text-xs mx-4 mb-0 hover:underline">
                        <FormattedMessage
                           id="authentication.link.signUp"
                           defaultMessage=" DO YOU HAVE AN ACCOUNT?"
                        />
                     </Link>
                  </div>
               </div>
            </section>
           
         </main>
    </section>
  )
}

export default SignUp


