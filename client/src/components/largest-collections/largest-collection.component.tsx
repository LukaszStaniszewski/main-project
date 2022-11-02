import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PhotographIcon } from "@heroicons/react/outline";

import { ILargestCollection } from "../../store/collections/collection.types";

const LargestCollection = ({ collection }: { collection: ILargestCollection }) => {
  const navigate = useNavigate();

  const toCollectionPageHandler = () => {
    navigate(`/collection/${collection._id}`);
  };

  return (
    <div className="custom-card my-2 flex" onClick={toCollectionPageHandler}>
      <div className="custom-card-border"></div>
      <div className="custom-card-content grid grid-cols-2 p-1">
        <div className="mr-4">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-center capitalize font-medium">{collection.name}</h3>
              <div className="text-justify">{collection.description}</div>
            </div>
            <div className="flex justify-between">
              <div>Items in collection: {collection.itemCount}</div>
              <div className="capitalize">
                {collection.owner.name} / {collection.topic}
              </div>
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
    </div>
  );
};

export default LargestCollection;
