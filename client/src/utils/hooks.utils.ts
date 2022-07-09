interface IUpdateItems {
   _id: string 
   [key: string]: any
}



export const changeItemsValue = <T>(items: T[], itemsToUpdate: IUpdateItems[], value: object): T[] =>{
   const keyToUpdate =  Object.keys(value).join("")
   const valueToUpdate =  Object.values(value).join("")

   for(let item = 0; item < items.length; item++) {
      for(let itemToUpdate = 0; itemToUpdate < itemsToUpdate.length; itemToUpdate++) {
            //@ts-ignore
         if(items[item]._id === itemsToUpdate[itemToUpdate]._id) {
            //@ts-ignore
            items[item][keyToUpdate] = valueToUpdate
         }
      }
   }

   return [...items]
}

export const deleteItems = <T>(items: T[], itemsToDelete: IUpdateItems[]): T[] => {
   if(!items || !items.length) throw new Error ("there are no items")

   return items.filter((item: any) => {
     return !itemsToDelete.some(itemToDelete=> {
       return item._id === itemToDelete._id;
     });
   });
 }

export const deleteItem = <T>(items:T[], itemToDelete: T) :T[] => {
   //@ts-ignore
   return items.filter(item => item._id !== itemToDelete._id)
}