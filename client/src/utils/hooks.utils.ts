import {ICurrentUser} from "../store/user/user.types"

interface IUpdateItems {
   _id: string 
   [key: string]: any
}

type Items = ICurrentUser[]

export const changeItemsValue = (items: Items, itemsToUpdate: IUpdateItems[], value: object): Items =>{
   const keyToUpdate =  Object.keys(value).join("")
   const valueToUpdate =  Object.values(value).join("")

   for(let item = 0; item < items.length; item++) {
      for(let itemToUpdate = 0; itemToUpdate < itemsToUpdate.length; itemToUpdate++) {
         if(items[item]._id === itemsToUpdate[itemToUpdate]._id) {
         //@ts-ignore
            items[item][keyToUpdate] = valueToUpdate
         }
      }
   }
   return [...items]
}

export const deleteItems = (items: Items, itemsToDelete: IUpdateItems[]): Items => {
   if(!items || !items.length) throw new Error ("there are no items")
   return items.filter(item => {
     return !itemsToDelete.some(itemToDelete => {
       return item._id === itemToDelete._id;
     });
   });
 }