import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../../components/form-input/form-input.componentx";
import SocialMediaAuthentication from "../../components/social-media-auth/socialMediaAuth.component";
import {
   selectUserReducer,
   selectToast,
   signInStart,
   closeToast,
} from "../../store/user";
import Alert, { IAlert } from "../../components/alert/alert.component";
import HeaderExtension from "../../components/headerExtension/headerExtension.component";

const alertSettings: IAlert = {
   message: "",
   toggle: false,
   type: "info",
};

const defaultFormFields = {
   email: "Frank_100.Lehner@gmail.com",
   password: "haslo",
};

const SignIn = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const [alert, setAlert] = useState(alertSettings);
   const { email, password } = formFields;
   const dispatch = useDispatch();
   const { currentUser, isLoading } = useSelector(selectUserReducer);
   const navigate = useNavigate();
   const toast = useSelector(selectToast);

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(signInStart(formFields));
   };

   useEffect(() => {
      if (currentUser) {
         navigate(`/user/${currentUser.name}`);
      }
   }, [currentUser]);

   useEffect(() => {
      if (!toast) return;
      setAlert({ toggle: true, message: toast.message, type: toast.type });
   }, [toast]);

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormFields((prevState) => ({ ...prevState, [name]: value }));
   };

   const closeToastHandler = () => {
      setAlert((prevState) => ({ ...prevState, toggle: false }));
      dispatch(closeToast());
   };
   return (
      <section className="relative  z-0">
         <HeaderExtension></HeaderExtension>

         <main className=" bg-secondary xl:w-80vw w-60vw m-auto grid grid-cols-2 gap-x-20 screen-height rounded-lg pt-6 pb-4 px-4">
            <figure className="mt-2">
               <img
                  src="https://i.ibb.co/c2X3Vj5/Screen-Shot-2022-06-16-at-20-45-15-PM.png"
                  alt=""
               />
            </figure>

            <section className="">
               <p className="text-center text-xl font-bold ">
                  <FormattedMessage
                     id="authentication.signIn.messageOne"
                     defaultMessage="Welcome Back"
                  />
               </p>
               <p className="text-center text-lg mt-3 mb-5">
                  <FormattedMessage
                     id="authentication.signIn.messageTwo"
                     defaultMessage="We are happy to see you back"
                  />
               </p>
               <SocialMediaAuthentication />

               <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-xs font-light mx-4 mb-0">
                     <FormattedMessage
                        id="authentication.message"
                        defaultMessage="LOGIN WITH EMAIL"
                     />
                  </p>
               </div>

               <div>
                  <form onSubmit={handleSubmit}>
                     <FormInput
                        data-test="signin-email"
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        componentName="authentication"
                        required
                     />

                     <FormInput
                        data-test="signin-password"
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        componentName="authentication"
                        required
                     />
                     <button
                        data-test="signin-submit"
                        className="btn btn-block bg-color-secondary hover:bg-color-primary"
                     >
                        <FormattedMessage
                           id="authentication.button.signIn"
                           defaultMessage="SIGN IN"
                        />
                     </button>
                  </form>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                     <Link
                        to="/signup"
                        className="text-center font-light text-xs mx-4 mb-0 hover:underline"
                     >
                        <FormattedMessage
                           id="authentication.link.signIn"
                           defaultMessage="CREATE AN ACCOUNT"
                        />
                     </Link>
                  </div>
               </div>
            </section>
            <div
               className={`${
                  !alert.toggle && "opacity-0"
               } absolute bottom-5 z-50 left-1/3`}
               onClick={closeToastHandler}
            >
               <Alert message={alert.message} type={alert.type} />
            </div>
         </main>
      </section>
   );
};

export default SignIn;
