import {ICurrentUser} from "../store/user/user.types"

interface IUpdateItems {
   _id: string 
   [key: string]: any
}

type Items = ICurrentUser[]

export const changeItemsValue = (items: Items, itemsToUpdate: IUpdateItems[], value: object) =>{
   const keyToUpdate =  Object.keys(value).join("")
   const valueToUpdate =  Object.values(value).join("")

   for(let i = 0; i < items.length; i++) {
      for(let j = 0; j< itemsToUpdate.length; j++) {
         if(items[i]._id === itemsToUpdate[j]._id) {
         //@ts-ignore
            items[i][keyToUpdate] = valueToUpdate
         }
      }
   }
   return [...items]
}

export const deleteItems = (items: Items, itemsToDelete: IUpdateItems[]) => {
   if(!items || !items.length) throw new Error ("there are no items")
   return items.filter(item => {
     return !itemsToDelete.some(itemToDelete => {
       return item._id === itemToDelete._id;
     });
   });
 }