import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {IntlProvider} from "react-intl"

import Navbar from "./components/navbar/navbar.component";
import SignUp from "./routes/sign-up/sign-up.component";
import SignIn from "./routes/sign-in/sign-in.component";
import AdminPage from "./routes/admin-page/adminPage.component";
import LangProvider from "./language/langProvider.component";

import polish from "./language/pl.json";
import english from "./language/en-Us.json"



const languages = {
    pl: polish,
    en: english,
}

function App() {
const [currentLocale, setLocale] = useState("en")

  return (
    <div className="w-screen h-screen  h-max-100vh w-max-100vw box-border">
    {//@ts-ignore
      <LangProvider>
         <Routes>
            <Route path="/" element={<Navbar/>}>
               <Route path="/signup" element={<SignUp/>}/>
               <Route path="/signin" element={<SignIn/>}/>
               <Route path="/admin" element={<AdminPage/>}/>
            </Route>
         </Routes>
      </LangProvider>}
    </div>

  );
}

export default App;
