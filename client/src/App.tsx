import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";
import SignUp from "./routes/sign-up/sign-up.component";
import SignIn from "./routes/sign-in/sign-in.component";
import AdminPage from "./routes/admin-page/adminPage.component";
import UserPage from "./routes/user-page/userPage.component";
import CreateCollection from "./routes/create-collection/create-collection";
import LangProvider from "./language/langProvider.component";



function App() {


  return (
    <div className="w-screen h-screen  h-max-100vh w-max-100vw box-border">
      <LangProvider>
         <Routes>
            <Route path="/" element={<Navbar/>}>
               <Route path="/signup" element={<SignUp/>}/>
               <Route path="/signin" element={<SignIn/>}/>
               <Route path="/admin" element={<AdminPage/>}/>
               <Route path="/user*" element={<UserPage/>}/>
               <Route path="/new" element={<CreateCollection/>}/>
            </Route>
         </Routes>
      </LangProvider>
    </div>

  );
}

export default App;
