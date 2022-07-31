import { useNavigate } from "react-router-dom"

import { ILatestItem } from "../../store/items/item.types";

const LatestItem = ({ item }: { item: ILatestItem }) => {
   const navigate = useNavigate()

   const toItemPageHandler = () => {
      navigate(`/item/${item._id}`)
   }

    return (
        <div className=" border-b-2 mb-2 pb-2 cursor-pointer"
         onClick={toItemPageHandler}
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
