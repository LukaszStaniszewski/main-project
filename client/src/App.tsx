import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";
import SignUp from "./pages/sign-up/sign-up.component";
import SignIn from "./pages/sign-in/sign-in.component";
import AdminPage from "./pages/admin-page/admin-page.component";
import CreateContent from "./routes/create-content/create-content.route";
import HomePage from "./pages/home-page/hompe-page.component";
import LangProvider from "./language/langProvider.component";
import UserPage from "./pages/user-page/user-page.component";
import CollectionPage from "./pages/collection-page/collection-page.component";
import ItemPage from "./pages/item-page/item-page.component";
import NotFound from "./pages/not-found/not-found.component";

function App() {
   return (
      <div className="w-screen">
         <LangProvider>
            <Routes>
               <Route path="/" element={<Navbar />}>
                  <Route index element={<HomePage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/user/:name" element={<UserPage />} />
                  <Route path="/new/*" element={<CreateContent />} />
                  <Route path="collection/:id" element={<CollectionPage />}></Route>
                  <Route path="/item/:id" element={<ItemPage />}></Route>
                  <Route path="/*" element={<NotFound />} />
               </Route>
            </Routes>
         </LangProvider>
      </div>
   );
}

export default App;
