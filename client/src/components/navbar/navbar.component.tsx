import React, { useEffect, MouseEvent, ChangeEvent, useState, Fragment } from 'react'
import { FormattedMessage } from "react-intl"
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {ReactComponent as MoonIcon} from "../../assets/moon-icon.svg"
import {ReactComponent as SunIcon} from "../../assets/sun-icon.svg"
import {ReactComponent as UserIcon} from "../../assets/user-icon.svg"
import { decode as decodeToken } from "../../utils/userToken.utils"
import { setCurrentUser, logOutStart } from "../../store/user/user.action"
import { selectCurrentUser } from "../../store/user/user.selector"
import { setLanguage } from "../../store/local/local.action"
import { selectCurrentLanguage } from "../../store/local/local.selector"
import SearchBar from "../search-bar/searchBar.component"

const languageList = {
    Polski: "pl",
    English: "en" 
}

const Navbar = () => {
   const [isUserMenuOpen, setUserMenu] = useState(false)
   const [isLangMenuOpen, setLangMenu] = useState(false)

   const dispatch = useDispatch()
   const currentUser = useSelector(selectCurrentUser)
   const language = useSelector(selectCurrentLanguage)
   const navigate = useNavigate()

   useEffect(() => {
      const token = JSON.parse(localStorage.getItem("token") as string)
      if(token) {
         const user = decodeToken(token.accessToken)
         if(user) {
            dispatch(setCurrentUser(user))
         }
      }
   },[])

   useEffect(() =>{
      const savedLanguage = localStorage.getItem("language")
      if(!savedLanguage) return
      const initialValue = JSON.parse(savedLanguage)
      dispatch(setLanguage(initialValue))
   }, [])

   // const redicrectToUserPage = () => navigate()

   const redirectToSignIn = () => navigate("/signin")

   const logoutHandler = () => {
      dispatch(logOutStart())
      setUserMenu(false)
   }

   const themeSwitchHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
      const isChecked = event.target.checked
      if(isChecked) return document.documentElement.setAttribute("data-theme", 'dark')
      document.documentElement.removeAttribute("data-theme")
      saveUserSetting("data-theme", "dark")
   }

   const languageSwitchHandler = (event: MouseEvent<HTMLLIElement>) : void => {
   //@ts-ignore
      const languageKey: "Polski" | "English" = event.currentTarget.innerText
      setLangMenu(false)
      dispatch(setLanguage(languageList[languageKey]))
      saveUserSetting("language", languageList[languageKey])
   }

   const saveUserSetting = (name: string, value: string) => {
      localStorage.setItem(name, JSON.stringify(value))
   }

   const userMenuToggleHandler = () : void => {
      setLangMenu(false)
      setUserMenu(!isUserMenuOpen)
   }

   const langMenuToggleHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
      const isChecked = event.target.checked
      setUserMenu(false)
      setLangMenu(isChecked)
   }
 
  return (
                //   <nav className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 h-32 p-3">
                // <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 h-20">
                // <nav className="bg-gradient-to-l from-purple-700 via-purple-600 to-purple-700 h-20 p-3">
                // <nav className="bg-gradient-to-r from-sky-700 to-cyan-600 h-32 p-3">
   <Fragment>
        <nav className="bg-gradient-to-r from-color-primary to-color-secondary h-30 pt-4 pb-6">
    
            <section className="flex items-center justify-between w-100vw border-b border-color-border-primary pb-4 px-9 ">
         
               <div>
                  <Link className="text-primary p-3 b rounded-md hover:bg-color-secondary" to='/'>
                     <FormattedMessage
                           id="navigation.home-link"
                           defaultMessage="Home"
                        />
                  </Link>
                  <Link className="text-primary px-10 "to='/'>
                     <FormattedMessage 
                           id="navigation.collections-link"
                           defaultMessage="Collections"
                        />
                  </Link> 

                  <Link className="text-primary" to={`/user/${currentUser?.name}`}>
                     <FormattedMessage 
                           id="navigation.my-collections-link"
                           defaultMessage="My collections"
                        />
                  </Link>
               </div>
            
               <SearchBar/>
               <div className="flex items-center pb-4">
      
                  <label className="swap swap-rotate w-6">
                     <input type="checkbox" className="hidden" onChange={themeSwitchHandler}/>
                     <SunIcon/>
                     <MoonIcon/>
                  </label>
                  
                  <div className="relative z-30">
                     <label className="swap px-10 text-primary">
                           <input className="hidden" type="checkbox" onChange={langMenuToggleHandler} checked={isLangMenuOpen} />
                           <div className="swap-off">{`${language.toUpperCase()} ▼`}</div>
                           <div className="swap-on">{`${language.toUpperCase()} ▲`}</div>
                     </label>
                     
                     <ul className={`${!isLangMenuOpen && "hidden"} menu bg-base-100 w-max absolute rounded-box top-10 -left-3`}>
                           <li onClick={languageSwitchHandler} className={`${language === "en" && "bordered"}`} ><a>English</a></li>
                           <li onClick={languageSwitchHandler} className={`${language === "pl" && "bordered"}`}><a>Polski</a></li>
                     </ul>
                  </div>


                  <div className="relative z-30 whitespace-nowrap" >
                     {currentUser 
                     ?  <div className="text-primary text-3xl cursor-pointer"  onClick={userMenuToggleHandler}><UserIcon/></div>
                     :  <button className="btn bg-color-primary border-none hover:bg-fuchsia-800" onClick={redirectToSignIn}>Sign In</button>
                     }
                     <ul className={`${!isUserMenuOpen && "hidden" } min-w-max menu bg-base-100 w-28 rounded-box absolute top-10 -right-2 z-10`}>
                           <li>
                              <NavLink to='/' className={({isActive}) => 
                                 isActive 
                                 ? "border-l-4 border-color-border-secondary" 
                                 : undefined} 
                              >
                              <FormattedMessage 
                                 id="navigation.user-menu.profile"
                                 defaultMessage="Profile"
                              />
                              </NavLink>
                           </li>
                           <li>
                              <NavLink to='/signin' className={({isActive}) => 
                                 isActive 
                                 ? "border-l-4 border-color-border-secondary" 
                                 : undefined} 
                              >
                              <FormattedMessage 
                                 id="navigation.user-menu.signIn"
                                 defaultMessage="Sign in"
                              />
                              </NavLink>
                           </li>
                           <li>
                              <NavLink to='/signup' className={({isActive}) => 
                                 isActive 
                                 ? "border-l-4 border-color-border-secondary" 
                                 : undefined} 
                              >
                              <FormattedMessage 
                                 id="navigation.user-menu.signUp"
                                 defaultMessage="Sign up"
                              />
                              </NavLink>
                           </li>
                           <li>
                              <button onClick={logoutHandler}>
                                 <FormattedMessage 
                                       id="navigation.user-menu.logout"
                                       defaultMessage="Logout"
                                 />
                              </button>
                           </li>
                     </ul>
                  </div>
               </div>
            </section>
         </nav>
        <Outlet/>
   </Fragment>
  )
}

export default Navbar