import {FormEvent, ChangeEvent, useState} from 'react'
import { Link } from "react-router-dom"
import FormInput from "../../components/form-input/form-input.componentx"
import {ReactComponent as GitIconLight} from "../../assets/light-theme/git-logo.light.svg"
import {ReactComponent as GoogleIconLight} from "../../assets/light-theme/google-logo.light.svg"

const defaultFormFields = {
   email: '',
   password: '',
}

const SignIn = () => {
   const [formFields, setFormFields] = useState(defaultFormFields)
   const {email,password,} = formFields

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
   }

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target
      setFormFields((prevState) => ({...prevState, [name]: value}))
   }

  return (
    <section className="relative  z-0">
         <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
         
         <main className=" bg-secondary w-80vw m-auto grid grid-cols-2 gap-x-20 h-min-max rounded-lg pt-6 pb-4 px-4">
            <figure className="mt-2">
               <img src="https://i.ibb.co/K6Dw3Yb/Screen-Shot-2022-06-16-at-17-44-22-PM.png" alt="login-picture" />
            </figure>
           
            <section className="">
               <p className="text-center text-xl font-bold ">Welcome Back</p>
               <p className="text-center my-3">We are happy to see you back</p>
               
               <div className="flex justify-evenly">
                  <button className="flex text-xl border-2 border-color-border-primary-m rounded-md py-1 px-2 items-center hover:bg-color-border-primary-m">
                     <GitIconLight/>
                     <span className="text-base ml-2">Login with GitHub</span>
                  </button>
                  <button className="flex text-xl border-2 border-color-border-primary-m hover:bg-color-border-primary-m rounded-md py-1 px-2 items-center">
                     <GoogleIconLight/>
                     <span className="text-base ml-2">Login with Google</span>
                  </button>
               </div>
              
               <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-xs font-light mx-4 mb-0">OR USE YOUR EMAIL</p>
               </div>

               <div>
                  <form onSubmit={handleSubmit} >
                     <FormInput
                        label="Your Email"
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
                     <button className="btn btn-block bg-color-secondary hover:bg-color-primary">Sign in</button>
                  </form>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                     <Link to='/signup' className="text-center font-light text-xs mx-4 mb-0 hover:underline">CREATE AN ACCOUNT</Link>
                  </div>
               </div>
            </section>
           
         </main>
    </section>
  )
}

export default SignIn