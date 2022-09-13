import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/navbar/navbar.component";
import SignIn from "./pages/sign-in/sign-in.component";
import HomePage from "./pages/home-page/hompe-page.component";
import LangProvider from "./language/langProvider.component";
import CollectionPage from "./pages/collection-page/collection-page.component";
import ItemPage from "./pages/item-page/item-page.component";
import NotFound from "./pages/not-found/not-found.component";
import { Spinner } from "./components/spinner";

const AdminPage = lazy(() => import("./pages/admin-page/admin-page.component"));
const CreateContent = lazy(() => import("./routes/create-content/create-content.route"));
const UserPage = lazy(() => import("./pages/user-page/user-page.component"));
const SignUp = lazy(() => import("./pages/sign-up/sign-up.component"));

function App() {
   return (
      <div className="w-screen">
         <LangProvider>
            <Suspense fallback={<Spinner />}>
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
            </Suspense>
         </LangProvider>
      </div>
   );
}

export default App;
