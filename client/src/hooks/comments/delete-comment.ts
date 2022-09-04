import { useDispatch } from "react-redux";

import { IComment,deleteCommentStart,setComments } from "../../store/comments";
import { deleteItem } from "../../utils/hooks.utils";

const useDeleteComment = () => {
   const dispatch = useDispatch();

   const deleteComment = (comments: IComment[], commentToDelete: IComment) => {
      const wihoutUnwontedComments = deleteItem<IComment>(comments, commentToDelete);
      dispatch(setComments(wihoutUnwontedComments));
      dispatch(deleteCommentStart(commentToDelete._id));
   };

   return [deleteComment];
};

export default useDeleteComment;
