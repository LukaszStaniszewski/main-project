import { MouseEvent } from "react";

import { useNavigate } from "react-router-dom";

import { ILatestItem } from "../../store/items/item.types";

const LatestItem = ({ item }: { item: ILatestItem }) => {
  const navigate = useNavigate();

  const toItemPageHandler = () => {
    navigate(`/item/${item._id}`);
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
    <div
      className=" border-b-2 mb-2 pb-2 cursor-pointer cardD"
      onClick={toItemPageHandler}
      onMouseMove={handleOnMouseMove}
    >
      <div>
        {item.createdBy} \ {item.name}
      </div>
      <div>collection: {item.collection}</div>
      <div>{item.createdAt}</div>
    </div>
  );
};

export default LatestItem;
