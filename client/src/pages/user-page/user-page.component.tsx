import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FolderAddIcon } from "@heroicons/react/outline";

import { useSelector } from "react-redux";
import { selectIs404PageActive } from "../../store/local";
import {
   selectToast,
   selectUserReducer,
   closeToast,
   ICurrentUser,
} from "../../store/user";
import CustomTable from "../../components/custom-table/custom-table.component";
import HeaderExtension from "../../components/headerExtension/headerExtension.component";
import {
   getCollectionsWithoutItemsStart,
   selectCollectionsWithoutItems,
   ICollectionWithoutItems,
} from "../../store/collections";
import Alert from "../../components/alert/alert.component";
import NotFound from "../not-found/not-found.component";

export interface ICustomizedCollections
   extends Omit<ICollectionWithoutItems, "image" | "owner"> {
   image: string | undefined;
   owner: string;
}

const UserPage = () => {
   const [columns, setColumns] = useState<string[]>([""]);
   const [writeMode, setWriteMode] = useState(false);
   const [toggle, setToggle] = useState(true);
   const { currentUser } = useSelector(selectUserReducer);
   const collectionsWihoutItems = useSelector(selectCollectionsWithoutItems);
   const is404PageActive = useSelector(selectIs404PageActive);
   const dispatch = useDispatch();
   const { name } = useParams();
   const toast = useSelector(selectToast);

   useEffect(() => {
      if (!name) return;
      getCollections();
   }, [name]);

   const getCollections = async () => {
      if (!name) return;
      dispatch(getCollectionsWithoutItemsStart(name));
   };

   useEffect(() => {
      if (!collectionsWihoutItems.length) return setColumns([""]);
      const columns = customizeColumns();
      setColumns(columns);
   }, [collectionsWihoutItems]);

   const customizeColumns = () => {
      return [
         ...Object.keys(collectionsWihoutItems[0]).filter(
            (value) => value !== "_id" && value !== "description" && value !== "createdAt"
         ),
         "createdAt",
      ];
   };

   useEffect(() => {
      if (isAuthorized(currentUser)) {
         setWriteMode(true);
      } else {
         setWriteMode(false);
      }
   }, [name, []]);

   const isAuthorized = (user: ICurrentUser | null): boolean => {
      if (user?.name == name || user?.status === "admin") return true;
      return false;
   };

   useEffect(() => {
      if (toast) {
         setToggle(true);
      }
   }, [toast]);

   const closeToastHandler = () => {
      setToggle(!toggle);
      dispatch(closeToast());
   };

   if (is404PageActive) {
      return <NotFound />;
   }

   return (
      <section className=" relative z-0 pb-4">
         <HeaderExtension />
         <main className="grid grid-cols-8 bg-secondary w-90vw m-auto max-w-90vw relative screen-height p-4">
            <div className="col-start-1 col-end-7 overflow-x-auto">
               {columns.length > 1 && collectionsWihoutItems.length && (
                  <CustomTable
                     rows={collectionsWihoutItems}
                     url="collection"
                     customizedColumns={columns}
                     data-test="user-page-table"
                  />
               )}
            </div>
            {writeMode && (
               <div className="col-start-7 col-end-9 p-5 border-l-2">
                  <div data-test="user-page-greeting" className="text-center pb-4">
                     <span>
                        Hello
                        <span className="font-semibold"> {currentUser?.name}</span>!
                     </span>
                  </div>
                  <Link
                     data-test="user-page-new-collection-button"
                     to="/new/collection"
                     className="btn btn-block bg-color-secondary hover:bg-color-primary outline-none"
                  >
                     New Collection
                  </Link>
                  {collectionsWihoutItems.length > 0 ? (
                     <div
                        data-test="user-page-collection-count"
                        className="text-center py-4"
                     >
                        <span>{collectionsWihoutItems.length} Collections</span>
                     </div>
                  ) : (
                     <div
                        data-test="user-page-info"
                        className="text-middle whitespace-nowrap flex flex-col justify-center items-center pt-4"
                     >
                        <FolderAddIcon
                           data-test="user-page-folder-icon"
                           className="w-7 font-light"
                        />
                        <p className="font-bold py-1">No projects </p>
                        <p className="text-sm font-light">
                           Get started by creating a new project
                        </p>
                     </div>
                  )}
               </div>
            )}
            <div
               className={`${!toggle && "opacity-0"} absolute bottom-5 z-50 left-1/3`}
               onClick={closeToastHandler}
               data-test="user-page-toast"
            >
               <Alert message={toast?.message} type={toast?.type} />
            </div>
         </main>
      </section>
   );
};

export default UserPage;
