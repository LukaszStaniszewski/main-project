import {ICurrentUser} from "../store/user/user.types"

interface IUpdateItems {
   _id: string 
   [key: string]: any
}

type Items = ICurrentUser[]

export const changeItemsValue = (items: Items, itemsToUpdate: IUpdateItems[], value: IUpdateItems) =>{
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