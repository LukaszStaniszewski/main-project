import { ICustomizedCollections } from "../routes/user-page/frame/userPageFrame.component"
import { ICollectionWithoutItems } from "../store/collections/collection.types"



export function adjustCollections(collections: ICollectionWithoutItems[] ) : ICustomizedCollections[]  {
   return collections.map(collection => {
       return {...collection, owner: collection.owner.name, image: collection.image?.url}
    })
 }
