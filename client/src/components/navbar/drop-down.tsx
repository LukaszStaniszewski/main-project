import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { ReactComponent as UserIcon } from "../../assets/user-icon.svg";
import { ICurrentUser } from "../../store/user/user.types";

interface IDropDownWrapper {
   currentUser: ICurrentUser | null;
   userMenuToggleHandler: () => void;
   isUserMenuOpen: boolean;
   children: JSX.Element[];
}

export const DropDownWrapper = ({
   currentUser = null,
   userMenuToggleHandler,
   isUserMenuOpen,
   children,
}: IDropDownWrapper) => {
   const navigate = useNavigate();
   const redirectToSignIn = () => navigate("/signin");

   const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
         //@ts-ignore
         return React.cloneElement(child, { currentUser });
      }
      return child;
   });

   return (
      <div className="relative z-30 whitespace-nowrap">
         {currentUser ? (
            <div
               data-test="navbar-dropdown"
               className="text-primary text-3xl cursor-pointer"
               onClick={userMenuToggleHandler}
            >
               <UserIcon />
            </div>
         ) : (
            <button
               data-test="navbar-sign-in"
               className="btn bg-color-primary border-none hover:bg-color-primary hover:opacity-80"
               onClick={redirectToSignIn}
            >
               Sign In
            </button>
         )}
         <ul
            className={`${
               !isUserMenuOpen && "hidden"
            } min-w-max menu bg-base-100 w-28 rounded-box absolute top-10 -right-2 z-10`}
         >
            {childrenWithProps}
         </ul>
      </div>
   );
};

interface IOptions {
   url: string;
   text: string;
   defaultText?: string;
}

export const Options = ({ url, text, defaultText }: IOptions) => {
   return (
      <li>
         <NavLink
            to={url}
            className={({ isActive }) =>
               isActive ? "border-l-4 border-color-border-secondary" : undefined
            }
         >
            <FormattedMessage id={text} defaultMessage={defaultText} />
         </NavLink>
      </li>
   );
};

export const Button = ({ handler, ...props }: { handler: () => void }) => {
   return (
      <li>
         <button {...props} onClick={handler}>
            <FormattedMessage id="navigation.user-menu.logout" defaultMessage="Logout" />
         </button>
      </li>
   );
};

interface IRestricted extends IOptions {
   currentUser?: ICurrentUser;
}

export const Restricted = ({ currentUser, url, text, defaultText }: IRestricted) => {
   if (currentUser?.role !== "admin") {
      return <Fragment />;
   }
   return (
      <li>
         <NavLink
            to={url}
            className={({ isActive }) =>
               isActive ? "border-l-4 border-color-border-secondary" : undefined
            }
         >
            <FormattedMessage id={text} defaultMessage={defaultText} />
         </NavLink>
      </li>
   );
};
