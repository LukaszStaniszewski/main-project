import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// import {io} from "socket.io-client"
// import { baseUrl } from "./api/axios-instance.api"



import Navbar from "./components/navbar/navbar.component";
import SignUp from "./pages/sign-up/sign-up.component";
import SignIn from "./pages/sign-in/sign-in.component";
import AdminPage from "./pages/admin-page/admin-page.component";
import UserPageRoute from "./routes/user-page/user-page.route";
import CollectionPageRoute from "./routes/collection-page/collection-page.route";
import CreateContent from "./routes/create-content/create-content.route";
import ItemPageRoute from "./routes/item-page/item-page.route";
import HomePage from "./pages/home-page/hompe-page.component";
import LangProvider from "./language/langProvider.component";

function App() {
   useEffect(() => {
   //   const socket = io(baseUrl)
   },[])

  return (
    <div className="w-screen">
      <LangProvider>
         <Routes>
            <Route path="/" element={<Navbar/>}>
               <Route index element={<HomePage/>}/>
               <Route path="/signup" element={<SignUp/>}/>
               <Route path="/signin" element={<SignIn/>}/>
               <Route path="/admin" element={<AdminPage/>}/>
               <Route path="/user/*" element={<UserPageRoute/>}/>
               <Route path="/new/*" element={<CreateContent/>}/>
               <Route path="collection/*" element={<CollectionPageRoute/>}></Route>
               <Route path="/item/*" element={<ItemPageRoute/>}></Route>
            </Route>
         </Routes>
      </LangProvider>
    </div>

  );
}

export default App;
