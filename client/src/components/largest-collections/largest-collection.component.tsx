import { useNavigate } from "react-router-dom";
import { PhotographIcon } from "@heroicons/react/outline";

import { ILargestCollection } from "../../store/collections/collection.types";

const LargestCollection = ({ collection }: { collection: ILargestCollection }) => {
   const navigate = useNavigate();

   const toCollectionPageHandler = () => {
      navigate(`/collection/${collection._id}`);
   };

   return (
      <div
         className="grid grid-cols-2 border-b-2 mb-2 pb-2 cursor-pointer"
         onClick={toCollectionPageHandler}
      >
         <div className="mr-4">
            <div className="flex flex-col justify-between h-full">
               <div>
                  <div className="flex w-1/2 justify-between whitespace-nowrap">
                     <div>
                        {collection.owner.name} / {collection.topic}
                     </div>
                     <div className="pl-6">{collection.name}</div>
                  </div>
                  <div>{collection.description}</div>
               </div>
               <div className="flex justify-between">
                  <div>Items in collection: {collection.itemCount}</div>
                  <div>{collection.createdAt}</div>
               </div>
            </div>
         </div>
         <div className="col-start-2 col-end-3">
            {collection.image ? (
               <img className="object-cover w-full" src={collection.image.url} alt="" />
            ) : (
               <PhotographIcon />
            )}
         </div>
      </div>
   );
};

export default LargestCollection;
