import { useState, useEffect, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PhotographIcon } from "@heroicons/react/outline";

import HeaderExtension from "../../components/headerExtension/headerExtension.component";
import Spinner from "../../components/spinner/spinner.component";
import { selectItem, getItemStart } from "../../store/items";
import MarkdownTextArea, {
   TextAreaUI,
} from "../../components/markdown-text/markdownTextArea.component";
import { ICurrentUser, selectCurrentUser, closeToast } from "../../store/user";
import {
   createCommentStart,
   getCommentStart,
   getCommentsStart,
   IComment,
   ICreateComment,
   selectComments,
} from "../../store/comments";
import useDeleteComment from "../../hooks/comments/delete-comment";
import socket from "../../api/socket";
import Comment from "../../components/comment/commet.component";
import OptionalItemFields from "../../components/optional-item-fields/optional-item-fields.component";
import { selectIs404PageActive } from "../../store/local/local.selector";
import NotFound from "../not-found/not-found.component";
import Alert, { IAlert } from "../../components/alert/alert.component";

type CommentBody = { description: string };

enum MessagesToUser {
   defaultButtonText = "Post comment",
   defaultLabel = "Enter your comment",
   postCreated = "Your post has been created",
   noCurrentUser = "You must be logged in to post a commnet",
}

const ItemPage = () => {
   const [commentBody, setCommentBody] = useState<CommentBody>();
   const [deleteComment] = useDeleteComment();
   const [alert, setAlert] = useState<IAlert>();
   const [textAreaUI, setTextAreaUI] = useState<TextAreaUI>({
      label: MessagesToUser.defaultButtonText,
      button: MessagesToUser.defaultButtonText,
      toggleUI: false,
   });
   const dispatch = useDispatch();
   const item = useSelector(selectItem);
   const comments = useSelector(selectComments);
   const currentUser = useSelector(selectCurrentUser);
   const Is404PageActive = useSelector(selectIs404PageActive);

   const { id } = useParams();

   useEffect(() => {
      if (!id) return;
      dispatch(getItemStart(id));
   }, [id]);

   useEffect(() => {
      if (!item) return;
      dispatch(getCommentsStart(item._id));
   }, [item]);

   useEffect(() => {
      if (!id) return;
      dispatch(getCommentStart(id));
   }, [socket]);

   useEffect(() => {
      if (!commentBody) return;
      if (isCommentInputValid(currentUser, id)) {
         const comment = adjustCommentData(commentBody, id!, currentUser);
         dispatch(createCommentStart(comment));
         setTextAreaUI((prevState) => ({
            ...prevState,
            submited: MessagesToUser.postCreated,
            toggleUI: true,
         }));
      } else {
         setAlert({
            message: MessagesToUser.noCurrentUser,
            type: "warning",
            toggle: true,
         });
      }
   }, [commentBody]);

   const isCommentInputValid = (
      currentUser: ICurrentUser | null,
      id?: string
   ): currentUser is ICurrentUser => {
      return id && currentUser ? true : false;
   };

   const adjustCommentData = (
      commentBody: CommentBody,
      id: string,
      currentUser: ICurrentUser
   ): ICreateComment => {
      return { body: commentBody.description, itemId: id, postedBy: currentUser.name };
   };

   const deleteCommentHandler = (event: MouseEvent<HTMLButtonElement>) => {
      const itemId = event.currentTarget.name;
      const comment = findCommentToDelete(itemId);
      if (!comment || !comments) return;
      deleteComment(comments, comment);
   };

   const findCommentToDelete = (itemId: string): IComment | undefined => {
      return comments?.find((comment) => comment._id === itemId);
   };

   const closeToastHandler = () => {
      setAlert((prevState) => ({ ...prevState, toggle: false }));
      dispatch(closeToast());
   };

   if (!item && !Is404PageActive) {
      return (
         <div className="flex justify-center items-center h-full">
            <Spinner />
         </div>
      );
   }

   if (Is404PageActive) {
      return <NotFound />;
   }
   return (
      <section className=" relative z-0 pb-4">
         <HeaderExtension />
         <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded grid grid-cols-5 gap-5">
            <div className="col-start-1 col-end-4 mb-4">
               <div className="flex justify-between">
                  <div className="text-lg ">Theme / {item?.topic}</div>
                  <div className="text-lg font-semibold">
                     {item && item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </div>
                  <div className="text-sm font-light">create at: {item?.createdAt}</div>
               </div>
               <OptionalItemFields fields={item?.optionalFields} />
            </div>
            <div className="col-start-4 col-end-6 mb-4">
               {item?.optionalFields?.hasOwnProperty("image") ? (
                  <img
                     className="object-cover h-full"
                     // @ts-ignore
                     src={`${item.optionalFields["image"]}`}
                     alt=""
                  />
               ) : (
                  <PhotographIcon />
               )}
            </div>
            <div className="col-start-1 col-end-6">
               {comments?.length > 0 &&
                  comments.map((comment) => (
                     <div key={comment._id} className="border p-2 m-2">
                        <Comment
                           comment={comment}
                           currentUser={currentUser}
                           //@ts-ignore
                           deleteCommentHandler={deleteCommentHandler}
                        />
                     </div>
                  ))}
               <MarkdownTextArea setText={setCommentBody} userInterface={textAreaUI} />
            </div>
            <div
               className={`${
                  !alert?.toggle && "opacity-0"
               } absolute bottom-5 z-50 left-1/3`}
               onClick={closeToastHandler}
            >
               <Alert message={alert?.message} type={alert?.type} />
            </div>
         </main>
      </section>
   );
};

export default ItemPage;
