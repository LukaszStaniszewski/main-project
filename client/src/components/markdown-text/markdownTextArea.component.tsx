import React, { ChangeEvent, useState, Dispatch } from "react";
import ReactMarkdown from "react-markdown";
import { Textarea } from "@material-tailwind/react";

export type TextAreaUI = {
   button: string;
   label: string;
   submited?: string;
   toggleUI: boolean;
};

interface ITextArea<T> {
   setText: Dispatch<React.SetStateAction<T>>;
   label?: string;
   userInterface: TextAreaUI;
}

const MarkdownTextArea = <T extends ITextArea<T>>({ setText, userInterface }: T) => {
   const [input, setInput] = useState<string>("");
   // const [input, setInput] = useState<string>(() => {
   //    const userText = sessionStorage.getItem("description")
   //    if(!userText) return ""
   //    return userText
   // });
   const [message, setMessage] = useState<null | string>(null);

   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target.value.length > 10) setMessage(null);
      setInput(event.target.value);
      sessionStorage.setItem("description", input);
   };

   const handleSubmit = () => {
      if (!input) return setMessage("Description must be minimum 10 characters long");
      setText((prevValue) => ({ ...prevValue, description: input }));
   };

   return (
      <div className="h-full">
         <div className="collapse collapse-arrow w-40vw">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">Markdown tips</div>
            <div className="collapse-content m-0 p-0 grid grid-cols-3 text-xs whitespace-normal break-words">
               <div className="bg-white pl-2 pt-2 pb-2 ">
                  <p className="font-semibold">Serveal levels of headers</p>
                  <p># Header 1 #</p>
                  <p>## Header 2 ##</p>
                  <p>### Header 3 ###</p>
                  <p className="font-semibold pt-1">Break text into sections</p>
                  <p>***</p>
                  <p>----</p>
               </div>

               <div className="bg-white pt-2 pb-2">
                  <p className="font-semibold">Italicize font</p>
                  <p>_This is italicized_</p>
                  <p className="font-semibold pt-1">Make font bolder</p>
                  <p>**This is bold**</p>
               </div>

               <div className="bg-white pt-2 pb-2 pr-2">
                  <p className="font-semibold">To break the line use \</p>
                  <p>tekst example \</p>
                  <p className="font-semibold  pt-1">Fancier link:</p>
                  <p className="whitespace-nowrap">[google](https://google.com).</p>
                  <p className="font-semibold pt-1">To add quote</p>
                  <p>{"> Blockquote"}</p>
               </div>
            </div>
         </div>

         <Textarea
            className="flex w-full text-lg items-end gap-4 focus:ring-0 focus:border-color-border-main focus:text-secondary"
            data-test="markdown-text-area"
            autoFocus
            value={input}
            name="description"
            onChange={handleChange}
            label={`${userInterface.toggleUI ? "Success" : userInterface.label}`}
            success={userInterface.toggleUI && true}
         />
         <ReactMarkdown className="bg-white mt-2" children={input} />
         <div className="flex justify-between whitespace-normal break-words">
            <button
               data-test="text-area-button"
               type="button"
               onClick={handleSubmit}
               className="btn bg-cyan-600 hover:bg-cyan-800"
            >{`${
               userInterface.toggleUI ? userInterface.submited : userInterface.button
            }`}</button>
            <div className="text-red-600">{message}</div>
         </div>
      </div>
   );
};

export default React.memo(MarkdownTextArea);
