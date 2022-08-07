interface IRequiredParams {
   _id: string;
}

export const changeItemsValue = <T extends IRequiredParams>(
   items: T[],
   itemsToUpdate: T[],
   value: object
): T[] => {
   const keyToUpdate = Object.keys(value).join("");
   const valueToUpdate = Object.values(value).join("");

   for (let item = 0; item < items.length; item++) {
      for (let itemToUpdate = 0; itemToUpdate < itemsToUpdate.length; itemToUpdate++) {
         if (items[item]._id === itemsToUpdate[itemToUpdate]._id) {
            //@ts-ignore
            items[item][keyToUpdate] = valueToUpdate;
         }
      }
   }

   return [...items];
};

export const deleteItems = <T extends IRequiredParams>(items: T[], itemsToDelete: T[]): T[] => {
   if (!items || !items.length) throw new Error("there are no items");

   return items.filter((item: any) => {
      return !itemsToDelete.some((itemToDelete) => {
         return item._id === itemToDelete._id;
      });
   });
};

export const deleteItem = <T extends IRequiredParams, D extends IRequiredParams = never>(
   items: T[],
   itemToDelete: T | D
): T[] => {
   return items.filter((item) => item._id !== itemToDelete._id);
};
