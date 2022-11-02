import { useNavigate } from "react-router-dom";

import { ILatestItem } from "../../store/items/item.types";

const LatestItem = ({ item }: { item: ILatestItem }) => {
  const navigate = useNavigate();

  const toItemPageHandler = () => {
    navigate(`/item/${item._id}`);
  };

  return (
    <div className="mb-2 flex cursor-pointer custom-card" onClick={toItemPageHandler}>
      <div className="custom-card-border"></div>
      <div className="custom-card-content">
        <div>
          {item.createdBy} \ {item.name}
        </div>
        <div>collection: {item.collection}</div>
        <div>{item.createdAt}</div>
      </div>
    </div>
  );
};

export default LatestItem;
