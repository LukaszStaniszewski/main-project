import { ICustomizedCollections } from "../pages/user-page/user-page.component";
import { ICollectionWithoutItems } from "../store/collections/collection.types";

export function adjustCollections(
   collections: ICollectionWithoutItems[]
): ICustomizedCollections[] {
   return collections.map((collection) => ({
      ...collection,
      owner: collection.owner.name,
      image: collection.image?.url,
   }));
}
