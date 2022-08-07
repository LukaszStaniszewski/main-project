import ReactMarkdown from "react-markdown";
import { TrashIcon } from "@heroicons/react/outline";
import { IComment } from "../../store/comments/comment.types";
import { ICurrentUser } from "../../store/user/user.types";
import { Fragment } from "react";

const Comment = ({
   comment,
   currentUser,
   deleteCommentHandler,
}: {
   comment: IComment;
   currentUser: ICurrentUser | null;
   deleteCommentHandler: () => void;
}) => {
   return (
      <Fragment>
         <div className="flex justify-between mb-1">
            <div className="flex gap-4 ">
               <div className="font-semibold">{comment.postedBy}</div>
               <div className="text-sm">{comment.createdAt}</div>
            </div>
            {comment.postedBy === currentUser?.name && (
               <button name={comment._id} onClick={deleteCommentHandler}>
                  <TrashIcon className="w-5" />
               </button>
            )}
         </div>
         <ReactMarkdown children={comment.body} />
      </Fragment>
   );
};

export default Comment;
