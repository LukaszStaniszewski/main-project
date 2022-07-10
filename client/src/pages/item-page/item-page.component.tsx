import {useState, useEffect, Fragment, MouseEvent} from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { TrashIcon } from "@heroicons/react/outline"

import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import Spinner from "../../components/spinner/spinner.component"
import {  ItemKey } from "../../components/create-item/item-types/itemTypes"
import { getItemStart } from "../../store/items/item.actions"
import { selectItem } from "../../store/items/item.selector"
import { selectComments } from "../../store/comments/comment.selector"
import { createCommentStart, getCommentsStart, getCommentStart, setComments } from "../../store/comments/comment.action"
import MarkdownTextArea from "../../components/markdown-text/markdownTextArea.component"
import { selectCurrentUser } from "../../store/user/user.selector"
import { IComment, ICreateComment } from "../../store/comments/comment.types"
import useDeleteComment from "../../hooks/comments/delete-comment"

const ItemPage = () => {
   const [fieldKeys, setFieldKeys] = useState<ItemKey[]>([])
   const [commentText, setCommentText] = useState<{description: string}>()
   const [deleteComment] = useDeleteComment()
   const dispatch = useDispatch()
   const item = useSelector(selectItem)
   const comments = useSelector(selectComments)
   const currentUser = useSelector(selectCurrentUser)
   const {id} = useParams()
   console.log("comments", comments)
  
   useEffect(() => {
      if(!id || item) return
      dispatch(getItemStart(id))
   }, [])

   useEffect(()=> {
      if(!item) return
      dispatch(getCommentsStart(item._id))
   },[item])

  
   useEffect(() => {
      if(!item?.optionalFields) return
      const fieldKey = Object.keys(item.optionalFields) as ItemKey[]
      setFieldKeys(fieldKey)
   },[item])

   useEffect(() => {
      postCommentHandler()
   }, [commentText])

   const postCommentHandler = () => {
      const comment = adjustCommentData()
      if(!comment) return
      dispatch(createCommentStart(comment))
   }

   const adjustCommentData = (): ICreateComment | null => {
      if(!id || !commentText || !currentUser) return null
      return ({body: commentText.description, itemId: id, postedBy: currentUser?.name})
   }
   
   const deleteCommentHandler = (event :MouseEvent<HTMLButtonElement>) => {
      const itemId = event.currentTarget.name
      const comment = findCommentToDelete(itemId)
      if(!comment || !comments) return
      deleteComment(comments, comment)
   }

   const findCommentToDelete = (itemId: string): IComment | undefined => {
      return comments?.find(comment => comment._id === itemId)
   }

  return (
    <section className=" relative z-0 pb-4">
      <HeaderExtension/>
      <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded">
         {
            item
            ?  <Fragment>
                  <div className="flex justify-between">
                     <div className="text-lg ">Theme / {item.topic}</div>
                     <div className="text-lg font-semibold">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                     <div className="text-sm font-light">create at: {item.createdAt}</div>
                 </div>
                 {
                  fieldKeys.length > 0 &&  
                  <div className="flex flex-wrap">
                     {fieldKeys.map((key, index) => {
                        if(!item.optionalFields) return <span></span>
                        if(key === "image") {
                           return <img className="max-h-50vh" src={`${item.optionalFields[key]}`} alt="" />
                        } else {
                           return <div className="p-1" key={index}>
                                       <span className="font-semibold">{key}</span>
                                          {/* @ts-ignore */}
                                    : {item.optionalFields[key].toString()}
                                 </div>   
                        }
                     })}
                  </div>
                  }
                  {
                     comments &&  comments.map((comment) => 
                        <div key={comment._id} className="border p-2 m-2">
                           <div className="flex justify-between mb-1">
                              <div className="flex gap-4 ">
                                 <div className="font-semibold">{comment.postedBy}</div>
                                 <div className="text-sm">{comment.createdAt}</div>
                              </div>
                              {comment.postedBy === currentUser?.name &&
                                 <button  name={comment._id} onClick={deleteCommentHandler}>
                                    <TrashIcon className="w-5"/>
                                 </button>
                              }
                           </div>
                           <div>{comment.body}</div>
                         
                        </div>
                     )
                    
                  }
                  <MarkdownTextArea
                  //@ts-ignore
                     setText={setCommentText}
                     elementsText={
                       { label: "Enter your comment",
                        button: "Post comment",
                        submited: "Your post has been created"}
                     }
                  />
               </Fragment>

            : <div className="left-1/2 absolute -ml-4 top-1/3">
               <Spinner/>
              </div>
         }
      </main>
    </section>
  )
}

export default ItemPage