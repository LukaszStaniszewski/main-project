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

const languageList = {
    Polski: "PL",
    English: "EN",
}

const Navbar = () => {
   const [isUserMenuOpen, setUserMenu] = useState(false)
   const [isLangMenuOpen, setLangMenu] = useState(false)

   const [language, setLanguage] = useState(languageList['English'])

   const dispatch = useDispatch()
   const currentUser = useSelector(selectCurrentUser)
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

   const redirectToSignIn = () => navigate("/signin")

   const logoutHandler = () => {
      dispatch(logOutStart())
      setUserMenu(false)
   }

    const themeSwitchHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
        const isChecked = event.target.checked
        if(isChecked) return document.documentElement.setAttribute("data-theme", 'dark')
        document.documentElement.removeAttribute("data-theme")
    }

    const languageSwitchHandler =(event: MouseEvent<HTMLLIElement>) : void => {
         //@ts-ignore
        const language = event.target.innerText
        //@ts-ignore
        setLanguage(languageList[language])
        setLangMenu(false)
    }

    const userMenuToggleHandler = () : void => {
        setLangMenu(false)
        setUserMenu(!isUserMenuOpen)
    }

    const langMenuTogglehHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
        const isChecked = event.target.checked
        setUserMenu(false)
        setLangMenu(isChecked)
    }
 
  return (
                //   <nav className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 h-32 p-3">
                // <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 h-20">
                // <nav className="bg-gradient-to-l from-purple-700 via-purpśle-600 to-purple-700 h-20 p-3">
                // <nav className="bg-gradient-to-r from-sky-700 to-cyan-600 h-32 p-3">
   <Fragment>
        <nav className="bg-gradient-to-r from-color-primary to-color-secondary h-30 pt-4 pb-6">
    
            {/* top side */}
            <section className="flex items-center justify-between w-100vw border-b border-color-border-primary px-9 mb-4">
         
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

                    <Link className="text-primary" to="/">
                        <FormattedMessage 
                            id="navigation.my-collections-link"
                            defaultMessage="My collections"
                         />
                    </Link>
                </div>
               
    
                <div className="flex items-center pb-4">
        
                    <label className="swap swap-rotate ">
                        <input type="checkbox" className="" onChange={themeSwitchHandler}/>
                        <SunIcon/>
                        <MoonIcon/>
                    </label>
                    
                    {/* <button className="px-10 text-primary" >language</button> */}
                    <div className="relative z-30">
                        <label className="swap px-10 text-primary">
                            <input className="hidden" type="checkbox" onChange={langMenuTogglehHandler} checked={isLangMenuOpen} />
                            <div className="swap-off">{`${language} ▼`}</div>
                            <div className="swap-on">{`${language} ▲`}</div>
                        </label>
                        
                        <ul className={`${!isLangMenuOpen && "hidden"} menu bg-base-100 w-max absolute rounded-box top-10 -left-3`}>
                            <li onClick={languageSwitchHandler} className={`${language === "EN" && "bordered"}`} ><a>English</a></li>
                            <li onClick={languageSwitchHandler} className={`${language === "PL" && "bordered"}`}><a>Polski</a></li>
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
            {/* bottom side */}
            <section className="flex justify-center px-2">
             
                <div className="w-50vw flex items-center ">
                    {/* <label htmlFor="simple-search" className="sr-only">Search</label> */}
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-primary :text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 bg-opacity-40 border border-color-border-primary text-primary text-sm rounded-lg focus:ring-color-secondary focus:border-color-secondary block w-full pl-10 p-2.5" placeholder="Search" required/>
                    </div>
                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                </div>
    
               
            </section>        
    
    
        </nav>
        <Outlet/>
   </Fragment>
  )
}

export default Navbar