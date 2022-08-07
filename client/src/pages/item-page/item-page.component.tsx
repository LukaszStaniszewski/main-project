import { useState, useEffect, Fragment, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PhotographIcon } from "@heroicons/react/outline";

import HeaderExtension from "../../components/headerExtension/headerExtension.component";
import Spinner from "../../components/spinner/spinner.component";

import { getItemStart } from "../../store/items/item.actions";
import { selectItem } from "../../store/items/item.selector";
import { selectComments } from "../../store/comments/comment.selector";
import {
   createCommentStart,
   getCommentsStart,
   getCommentStart,
} from "../../store/comments/comment.action";
import MarkdownTextArea from "../../components/markdown-text/markdownTextArea.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { IComment, ICreateComment } from "../../store/comments/comment.types";
import useDeleteComment from "../../hooks/comments/delete-comment";
import socket from "../../api/socket";
import Comment from "../../components/comment/commet.component";
import OptionalItemFields from "../../components/optional-item-fields/optional-item-fields.component";
import { selectIs404PageActive } from "../../store/local/local.selector";
import NotFound from "../not-found/not-found.component";

const ItemPage = () => {
   const [commentText, setCommentText] = useState<{ description: string }>();
   const [deleteComment] = useDeleteComment();
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
      postCommentHandler();
   }, [commentText]);

   const postCommentHandler = () => {
      const comment = adjustCommentData();
      if (!comment) return;
      dispatch(createCommentStart(comment));
   };

   const adjustCommentData = (): ICreateComment | null => {
      if (!id || !commentText || !currentUser) return null;
      return { body: commentText.description, itemId: id, postedBy: currentUser?.name };
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
               {comments?.map((comment) => (
                  <div key={comment._id} className="border p-2 m-2">
                     <Comment
                        comment={comment}
                        currentUser={currentUser}
                        //@ts-ignore
                        deleteCommentHandler={deleteCommentHandler}
                     />
                  </div>
               ))}
               <MarkdownTextArea
                  setText={setCommentText}
                  elementsText={{
                     label: "Enter your comment",
                     button: "Post comment",
                     submited: "Your post has been created",
                  }}
               />
            </div>
         </main>
      </section>
   );
};

export default ItemPage;
