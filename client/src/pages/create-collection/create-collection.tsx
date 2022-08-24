import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhotographIcon } from "@heroicons/react/outline";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import HeaderExtension from "../../components/headerExtension/headerExtension.component";
import FormInput from "../../components/form-input/form-input.componentx";
import SelectDropwdown from "../../components/select-dropdown/selectDropdown.component";
import CreateItem from "../../components/create-item/createItem.component";
import { ICreateItem, Topic } from "../../components/create-item/item-types/itemTypes";
import MarkdownTextArea from "../../components/markdown-text/markdownTextArea.component";
import Alert, { IAlert } from "../../components/alert/alert.component";
import { disableTopicDropdown } from "../../store/local/local.action";
import { closeToast, selectCurrentUser, selectToast } from "../../store/user";
import {
   createCollectionWithItemsStart,
   selectCollectionLoadingState,
   ICreateCollection,
} from "../../store/collections";

const requiredCollectionFields = {
   name: "",
   description: "",
   topic: undefined,
};

const alertSettings: IAlert = {
   message: "You won't be able to change a topic, after you add an item.",
   toggle: true,
   type: "info",
};

enum AlertMessages {
   signIn = "You must be sign in to create collection",
   requiredFields = "You missed required fields!",
   wrongFileType = "File must be of type png, jpg or jpeg",
}

export const defaultItemData = {
   id: "",
   name: "",
   tags: [""],
   topic: "",
};

export interface ICollectionFields {
   name: string;
   description: string;
   topic?: Topic;
}

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CreateCollection = () => {
   const [collectionTopic, setCollectionTopic] = useState<Topic | undefined>();
   const [collectionFields, setCollectionFields] = useState<ICollectionFields>(
      requiredCollectionFields
   );
   const [itemData, setItemData] = useState<ICreateItem<Topic>>(defaultItemData);
   const [header, setHeader] = useState(false);
   const [fileDataURL, setFileDataURL] = useState(null);
   const [alert, setAlert] = useState(alertSettings);
   const [image, setImage] = useState<File>();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const currentUser = useSelector(selectCurrentUser);
   const collectionFetch = useSelector(selectCollectionLoadingState);
   const toast = useSelector(selectToast);

   const setCardHandler = () => setHeader(!header);

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!currentUser)
         return setAlert({ message: AlertMessages.signIn, type: "info", toggle: true });
      const collectionWithItems = appendItemsToCollection();
      if (!collectionWithItems) return;
      dispatch(
         createCollectionWithItemsStart({
            collectionWithItems: collectionWithItems,
            image: image,
         })
      );
      dispatch(disableTopicDropdown(false));
      clearSession();
   };

   const appendItemsToCollection = (): ICreateCollection | false => {
      if (!currentUser?.name || !currentUser?._id || !collectionTopic) {
         setAlert((prevState) => ({
            ...prevState,
            toggle: true,
            message: AlertMessages.requiredFields,
            type: "error",
         }));
         return false;
      }
      return {
         ...collectionFields,
         topic: collectionTopic,
         owner: { _id: currentUser?._id, name: currentUser?.name },
         items: new Array(itemData),
      };
   };

   const clearSession = () => {
      sessionStorage.removeItem("topic");
      sessionStorage.removeItem("description");
   };

   const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCollectionFields((prevValue) => ({ ...prevValue, [name]: value }));
   };

   const selectFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const file = event.target.files[0];
      if (!file.type.match(imageMimeType)) {
         setAlert((prevState) => ({
            toggle: true,
            message: AlertMessages.wrongFileType,
            type: "error",
         }));
         return;
      }

      setImage(file);
   };

   const alertHandler = () => {
      setAlert((prevState) => ({ ...prevState, toggle: false }));
      dispatch(closeToast());
   };

   useEffect(() => {
      // @ts-ignore
      let fileReader,
         isCancel = false;
      if (image) {
         fileReader = new FileReader();
         fileReader.onload = (e) => {
            // @ts-ignore
            const { result } = e.target;
            if (result && !isCancel) {
               setFileDataURL(result);
            }
         };
         fileReader.readAsDataURL(image);
      }
      return () => {
         isCancel = true;
         // @ts-ignore
         if (fileReader && fileReader.readyState === 1) {
            // @ts-ignore
            fileReader.abort();
         }
      };
   }, [image]);

   useEffect(() => {
      setAlert({
         message: toast?.message,
         toggle: true,
         type: toast?.type,
      });
   }, [toast]);

   useEffect(() => {
      setAlert(alertSettings);
   }, []);

   return (
      <section className="relative z-0 pb-4">
         <HeaderExtension />
         <Tabs
            value="createCollection"
            className="w-90vw m-auto bg-secondary p-3 screen-height "
         >
            <div className="flex justify-between items-center">
               <div />
               <TabsHeader>
                  <Tab
                     data-test="create-collection-tab"
                     value="createCollection"
                     className="text-2xl w-50vw pb-1 cursor-pointer"
                     onClick={setCardHandler}
                  >
                     Create Collection
                  </Tab>
                  <Tab
                     data-test="add-items-tab"
                     value="addItems"
                     className="text-2xl  pb-1 cursor-pointer"
                     onClick={setCardHandler}
                  >
                     Add Items
                  </Tab>
               </TabsHeader>

               <button
                  className={`btn ${collectionFetch && "loading"}`}
                  form="create-collection"
                  type="submit"
                  data-test="create-collection-submit"
               >
                  DONE!
               </button>
            </div>

            <TabsBody>
               <TabPanel
                  value="createCollection"
                  className="grid grid-cols-2 content-start gap-x-10"
               >
                  <div className="col-start-1 col-end-2">
                     <form onSubmit={handleSubmit} id="create-collection">
                        <div className="w-full">
                           <FormInput
                              data-test="create-collection-name"
                              label="collection name"
                              componentName="createCollection"
                              value={collectionFields.name}
                              onChange={handleChange}
                              name="name"
                           />
                        </div>
                        <MarkdownTextArea
                           setText={setCollectionFields}
                           elementsText={{
                              label: "Enter description",
                              button: "Save description",
                              submited: "Edit description",
                           }}
                        />
                     </form>
                  </div>

                  <div className="col-start-2 col-end-3">
                     <div className="w-full mb-5">
                        <SelectDropwdown setTopic={setCollectionTopic} />
                     </div>
                     <div
                        className={`${!alert.toggle && "opacity-0"}`}
                        onClick={alertHandler}
                     >
                        <Alert
                           type={alert.type}
                           message={alert.message}
                           className="text-sm"
                        />
                     </div>
                     <div>
                        {fileDataURL ? <img src={fileDataURL} alt="preview" /> : null}
                        <label className="flex justify-center w-full h-32 px-4 bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-tertiary focus:outline-none">
                           <span className="flex items-center space-x-2">
                              <PhotographIcon className="w-1/12" />
                              <span className="font-medium text-gray-600">
                                 Drop files to Attach, or
                                 <span className="text-blue-600 underline"> browse</span>
                              </span>
                              <input
                                 data-test="collection-image-input"
                                 type="file"
                                 name="image"
                                 className="hidden"
                                 accept="image/*"
                                 onChange={selectFileHandler}
                              />
                           </span>
                        </label>
                     </div>
                  </div>
               </TabPanel>
               <TabPanel className="col-start-1 col-end-3 min-h-70vh" value="addItems">
                  {collectionTopic ? (
                     <div className="col-start-1 col-end-3">
                        <CreateItem
                           collectionTopic={collectionTopic}
                           setItemData={setItemData}
                        />
                     </div>
                  ) : (
                     <div className="h-30vh text-center col-start-1 col-end-3 text-xl mt-20">
                        Choose collection topic to see possible item fields
                     </div>
                  )}
               </TabPanel>
            </TabsBody>
         </Tabs>
      </section>
   );
};

export default React.memo(CreateCollection);
