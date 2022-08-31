import { useEffect, MouseEvent, ChangeEvent, useState, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MoonIcon, SunIcon } from "../../assets";
import { setLanguage, selectCurrentLanguage } from "../../store/local";
import SearchBar from "../search-bar/searchBar.component";
import { DropDownWrapper, Options, Button, Restricted } from "./drop-down";
import { getCurrentUserStart, logOutStart, selectCurrentUser } from "../../store/user";

const languageList = {
   Polski: "pl",
   English: "en",
};

const Navbar = () => {
   const [isUserMenuOpen, setUserMenu] = useState(false);
   const [isLangMenuOpen, setLangMenu] = useState(false);

   const dispatch = useDispatch();
   const currentUser = useSelector(selectCurrentUser);
   const language = useSelector(selectCurrentLanguage);
   const navigate = useNavigate();

   useEffect(() => {
      const controller = new AbortController();
      if (currentUser) return;
      dispatch(getCurrentUserStart());
   }, []);

   useEffect(() => {
      const savedLanguage = localStorage.getItem("language");
      if (!savedLanguage) return;
      const initialValue = JSON.parse(savedLanguage);
      dispatch(setLanguage(initialValue));
   }, []);

   const logoutHandler = () => {
      dispatch(logOutStart());
      setUserMenu(false);
      navigate("/");
   };

   const themeSwitchHandler = (event: ChangeEvent<HTMLInputElement>): void => {
      const isChecked = event.target.checked;
      if (isChecked) return document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.removeAttribute("data-theme");
      saveUserSetting("data-theme", "dark");
   };

   const languageSwitchHandler = (event: MouseEvent<HTMLLIElement>): void => {
      //@ts-ignore
      const languageKey: "Polski" | "English" = event.currentTarget.innerText;
      setLangMenu(false);
      dispatch(setLanguage(languageList[languageKey]));
      saveUserSetting("language", languageList[languageKey]);
   };

   const saveUserSetting = (name: string, value: string) => {
      localStorage.setItem(name, JSON.stringify(value));
   };

   const userMenuToggleHandler = (): void => {
      setLangMenu(false);
      setUserMenu(!isUserMenuOpen);
   };

   const langMenuToggleHandler = (event: ChangeEvent<HTMLInputElement>): void => {
      const isChecked = event.target.checked;
      setUserMenu(false);
      setLangMenu(isChecked);
   };

   return (
      <Fragment>
         <nav className="bg-gradient-to-r from-color-primary to-color-secondary min-h-max pt-4 pb-6">
            <section className="flex items-center justify-between w-100vw px-9 ">
               <div className="flex gap-10 items-center">
                  <Link
                     className="text-primary p-3 b rounded-md hover:bg-gradient-to-r from-color-primary to-color-secondary"
                     to="/"
                  >
                     <FormattedMessage id="navigation.home-link" defaultMessage="Home" />
                  </Link>

                  {currentUser && (
                     <Link
                        className="text-primary p-3 b rounded-md hover:bg-gradient-to-r from-color-primary to-color-secondary"
                        to={`/user/${currentUser?.name}`}
                     >
                        <FormattedMessage
                           id="navigation.my-collections-link"
                           defaultMessage="My collections"
                        />
                     </Link>
                  )}
               </div>

               <SearchBar />
               <div className="flex items-center pb-4">
                  <label className="swap swap-rotate w-6">
                     <input
                        type="checkbox"
                        className="hidden"
                        onChange={themeSwitchHandler}
                     />
                     <SunIcon />
                     <MoonIcon />
                  </label>

                  <div className="relative z-30">
                     <label className="swap px-10 text-primary">
                        <input
                           className="hidden"
                           type="checkbox"
                           onChange={langMenuToggleHandler}
                           checked={isLangMenuOpen}
                        />
                        <div className="swap-off">{`${language.toUpperCase()} ▼`}</div>
                        <div className="swap-on">{`${language.toUpperCase()} ▲`}</div>
                     </label>

                     <ul
                        className={`${
                           !isLangMenuOpen && "hidden"
                        } menu bg-base-100 w-max absolute rounded-box top-10 -left-3`}
                     >
                        <li
                           onClick={languageSwitchHandler}
                           className={`${language === "en" && "bordered"}`}
                        >
                           <a>English</a>
                        </li>
                        <li
                           onClick={languageSwitchHandler}
                           className={`${language === "pl" && "bordered"}`}
                        >
                           <a>Polski</a>
                        </li>
                     </ul>
                  </div>
                  <DropDownWrapper
                     currentUser={currentUser}
                     userMenuToggleHandler={userMenuToggleHandler}
                     isUserMenuOpen={isUserMenuOpen}
                  >
                     <Options
                        url={`/user/${currentUser?.name}`}
                        text="navigation.user-menu.profile"
                        defaultText="My Collections"
                     />
                     <Restricted
                        url="/admin"
                        text="navigation.user-menu.admin"
                        defaultText="Admin Page"
                     />
                     <Button data-test="logout-button" handler={logoutHandler} />
                  </DropDownWrapper>
               </div>
            </section>
         </nav>
         <Outlet />
      </Fragment>
   );
};

export default Navbar;
