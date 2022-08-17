import {
   Fragment,
   useState,
   useEffect,
   Dispatch,
   SetStateAction,
   ChangeEvent,
} from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.componentx";
import ChosenOptionalField from "./item-field/chosenItemField.component";
import OptionalField from "./item-field/optionalField.component";
import {
   Topic,
   IOptionalField,
   ICreateItem,
   COLLECTIONS_MOCKUP,
   OptionalFieldsKeysByTopic,
} from "./item-types/itemTypes";
import { disableTopicDropdown } from "../../store/local/local.action";
import Alert, { IAlert } from "../alert/alert.component";

interface ICreateItemComponent {
   collectionTopic: Topic;
   setItemData: Dispatch<SetStateAction<ICreateItem<Topic>>>;
   buttonText?: string;
}

const defaultUserInputData = {
   id: "",
   name: "",
   tags: ["Books", "English"],
   topic: "",
};

const CreateItem = ({
   collectionTopic,
   setItemData,
   buttonText = "Add item",
}: ICreateItemComponent) => {
   const [optionalFields, setOptionalFields] = useState<
      IOptionalField<typeof collectionTopic>[]
   >([]);
   const [chosenOptionalFields, setChosenOptionalFields] = useState<
      IOptionalField<typeof collectionTopic>[]
   >([]);
   const [userInputData, setUserInputData] =
      useState<ICreateItem<typeof collectionTopic>>(defaultUserInputData);
   const [alert, setAlert] = useState<IAlert>({
      message: "",
      type: "info",
      toggle: false,
   });
   const dispatch = useDispatch();

   const getCollectionKeyes = () => {
      if (!collectionTopic) return;
      const collectionKeys = Object.keys(
         COLLECTIONS_MOCKUP[collectionTopic]
      ) as OptionalFieldsKeysByTopic<typeof collectionTopic>;
      return collectionKeys;
   };

   const getBaseFields = () => {
      const collectionKeys = getCollectionKeyes();
      if (!collectionKeys || !collectionTopic) return [];
      return collectionKeys.map((fieldName) => {
         return {
            fieldName,
            isAdded: false,
            valueType: typeof COLLECTIONS_MOCKUP[collectionTopic][fieldName],
         };
      });
   };

   useEffect(() => {
      const optionalFields = getBaseFields();
      setOptionalFields(optionalFields);
      setChosenOptionalFields([]);
   }, [collectionTopic]);

   const moveFieldsToLeft = () => {
      if (!optionalFields.length) return;
      const upToDateBaseFields = getBaseFields();
      setChosenOptionalFields(() =>
         upToDateBaseFields.map((value) => ({ ...value, isAdded: true }))
      );
      setOptionalFields(() => optionalFields.filter((value) => value === null));
   };

   const moveFieldsToRight = () => {
      setOptionalFields(() => getBaseFields());
      setChosenOptionalFields(() =>
         chosenOptionalFields.filter((value) => value === null)
      );
      setUserInputData(defaultUserInputData);
   };

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserInputData((prevState) => ({
         ...prevState,
         [name]: value,
         topic: collectionTopic,
         tags: ["books"],
      }));
   };

   const saveItemHandler = () => {
      if (!userInputData?.id || !userInputData?.name) {
         return setAlert((prevState) => ({
            ...prevState,
            message: "Item name and id are required",
            type: "error",
            toggle: true,
         }));
      }
      setAlert((prevState) => {
         if (buttonText === "Add item") {
            return {
               ...prevState,
               message: "Item has been added",
               type: "info",
               toggle: true,
            };
         } else {
            return {
               ...prevState,
               message: "Item has been created",
               type: "success",
               toggle: true,
            };
         }
      });
      removeFalsyValues();
      setItemData(userInputData);
      dispatch(disableTopicDropdown(true));
      resetFields();
   };

   const removeFalsyValues = () => {
      if (!userInputData.optionalFields) return;
      const keyes = Object.keys(
         userInputData.optionalFields
      ) as OptionalFieldsKeysByTopic<typeof collectionTopic>;

      keyes.forEach((key) => {
         if (userInputData.optionalFields && !userInputData.optionalFields[key]) {
            delete userInputData.optionalFields[key];
         }
      });
   };

   const resetFields = () => {
      setUserInputData(defaultUserInputData);
      setChosenOptionalFields([]);
      setOptionalFields(getBaseFields());
   };

   return (
      <Fragment>
         <div className="border-b col-start-1 col-end-3  grid grid-cols-2 gap-x-4">
            <div
               className={`flex justify-end col-start-1 col-end-4 pointer  ${
                  !alert?.toggle && "opacity-0 h-5"
               }`}
               onClick={() => setAlert((prevState) => ({ ...prevState, toggle: false }))}
            >
               <Alert message={alert?.message} type={alert?.type} className="py-2" />
            </div>
            <div className="col-start-1 col-end-2 flex items-center gap-10 with-33vw max-w-33vw">
               <FormInput
                  data-test="create-item-name"
                  label="item name"
                  componentName="createCollection"
                  onChange={handleChange}
                  value={userInputData.name}
                  name="name"
                  required
               />

               <FormInput
                  data-test="creatre-item-id"
                  label="id"
                  componentName="createCollection"
                  onChange={handleChange}
                  value={userInputData.id}
                  name="id"
                  required
               />
            </div>
            <div className="col-start-2 col-end-3 w-33vw flex 2xl:max-w-[50%] max-w-[80%] m-auto justify-center items-center ">
               <button
                  className="w-32 h-8 bg-red-300 text-2xl  rounded-l-full hover:bg-red-500 text-white hover:flex-grow transition-all duration-200 ease-in-out "
                  onClick={moveFieldsToRight}
               >
                  &#8594;
               </button>
               <button
                  className="w-32 h-8 bg-green-300 text-2xl  rounded-r-full hover:bg-green-500 text-white hover:flex-grow transition-all duration-200 ease-in-out "
                  onClick={moveFieldsToLeft}
               >
                  &#8592;
               </button>
            </div>

            <div className="col-start-3 col-end-4 flex items-center justify-end gap-10 w-29vw">
               <button className="btn btn-sm">ADD TAGS</button>

               <button
                  className="btn btn-sm bg-green-600"
                  data-test="create-item-submit"
                  onClick={saveItemHandler}
               >
                  {buttonText}
               </button>
            </div>
         </div>

         <div className="grid grid-cols-2  gap-x-10">
            <div className="col-start-1 col-end-2">
               {chosenOptionalFields.map((baseField, index) => (
                  <ChosenOptionalField
                     key={index}
                     addedField={baseField}
                     setChosenOptionalFields={setChosenOptionalFields}
                     setOptionalFields={setOptionalFields}
                     setUserInputData={setUserInputData}
                     collectionTopic={collectionTopic}
                  />
               ))}
            </div>

            <div className="col-start-2 col-end-3">
               {optionalFields.map((baseField, index) => (
                  <OptionalField
                     key={index}
                     setOptionalFields={setOptionalFields}
                     baseField={baseField}
                     setChosenOptionalFields={setChosenOptionalFields}
                  />
               ))}
            </div>
         </div>
      </Fragment>
   );
};

export default CreateItem;
