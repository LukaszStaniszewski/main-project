import { FC } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

import { selectCurrentLanguage } from "../store/local/local.selector";
import polish from "./pl.json";
import english from "./en-Us.json";

type Children = {
   children: JSX.Element;
};

const languages = {
   pl: polish,
   en: english,
};

const LangProvider: FC<Children> = ({ children }) => {
   const currentLanguage = useSelector(selectCurrentLanguage);

   return (
      <IntlProvider
         // @ts-ignore
         messages={languages[currentLanguage]}
         locale={currentLanguage}
         defaultLocale="en"
      >
         {children}
      </IntlProvider>
   );
};

export default LangProvider;
