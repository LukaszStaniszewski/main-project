import { useDispatch} from "react-redux";

import { deleteCommentStart, setComments } from "../../store/comments/comment.action";
import { IComment } from "../../store/comments/comment.types";
import { deleteItem } from "../../utils/hooks.utils";

const useDeleteComment = () => {
      const dispatch = useDispatch()

   const deleteComment = (comments: IComment[], commentToDelete: IComment) => {
      
      const wihoutUnwontedComments = deleteItem<IComment, {}>(comments, commentToDelete)
      dispatch(setComments(wihoutUnwontedComments))
      dispatch(deleteCommentStart(commentToDelete._id))
   }

   return [deleteComment]
}

export default useDeleteComment