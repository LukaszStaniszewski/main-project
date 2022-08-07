import { Fragment, useEffect, useState } from "react";
import { IItem } from "../../store/items/item.types";
import {
   COLLECTIONS_MOCKUP,
   OptionalFieldsByTopic,
   OptionalFieldsKeysByTopic,
   Topic,
} from "../create-item/item-types/itemTypes";
interface test<T> {
   optionalKey: keyof typeof COLLECTIONS_MOCKUP[];
}
// type OptionalKey = typeof  COLLECTIONS_MOCKUP[keyof typeof COLLECTIONS_MOCKUP];
// type OptionalKey = keyof typeof COLLECTIONS_MOCKUP["books"];

// type OptionalKey = OptionalItemData;
const OptionalItemFields = <T extends Topic>({ fields }: { fields?: OptionalFieldsByTopic<T> }) => {
   // type OptionalKey = typeof COLLECTIONS_MOCKUP[item.topic]
   const [fieldKeys, setFieldKeys] = useState<OptionalFieldsKeysByTopic<T>>();

   useEffect(() => {
      if (!fields) return;

      const fieldKey = Object.keys(fields) as OptionalFieldsKeysByTopic<T>;
      setFieldKeys(fieldKey);
   }, [fields]);

   if (!fields) {
      return <Fragment />;
   }

   return (
      <Fragment>
         {fieldKeys?.map((fieldKey, index) => {
            return (
               <div className="p-2 border my-1" key={index}>
                  <span className="font-semibold">{fieldKey.toString()}: </span>

                  {typeof fields[fieldKey] === "boolean"
                     ? //@ts-ignore
                       fields[fieldKey].toString()
                     : fields[fieldKey]}
               </div>
            );
         })}
      </Fragment>
   );
};

export default OptionalItemFields;
