import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PhotographIcon } from "@heroicons/react/outline";

import { ILargestCollection } from "../../store/collections/collection.types";

const LargestCollection = ({ collection }: { collection: ILargestCollection }) => {
  const navigate = useNavigate();

  const toCollectionPageHandler = () => {
    navigate(`/collection/${collection._id}`);
  };

  const handleOnMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = event;
    const rect = target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="custom-card my-2 flex" onClick={toCollectionPageHandler}>
      <div className="custom-card-border"></div>
      <div className="custom-card-content grid grid-cols-2 p-1">
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
    </div>
  );
};

export default LargestCollection;
