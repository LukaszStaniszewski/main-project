import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import {IntlProvider} from "react-intl"

import polish from "./lang/pl.json";

import english from "./lang/en-Us.json"

const languages = {
    pl: polish,
    en: english,
}

function App() {
const [currentLocale, setLocale] = useState("en")

  return (
    <div className="w-screen h-screen">
    {//@ts-ignore
    <IntlProvider messages={languages[currentLocale]} locale={currentLocale} defaultLocale="en">
            <Routes>
                <Route path="/" element={<Navbar/>}>
        
                </Route>
            </Routes>
        </IntlProvider>}
    </div>

  );
}

export default App;
