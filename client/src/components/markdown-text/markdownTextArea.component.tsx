import {ChangeEvent, useState} from 'react'
import ReactMarkdown from "react-markdown"


const MarkdownTextArea = () => {
   const [input, setInput] = useState<string>("")

   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)
  return (
    <div className="h-full"> 
      <div className="collapse w-40vw">
         <input type="checkbox" /> 
         <div className="collapse-title text-lg font-medium">
            Markdown tips
         </div>
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

      <textarea className="block w-full h-40vh  p-2 border-2"  
         placeholder="Your message"
         autoFocus
         value={input}
         name="description"
         //@ts-ignore
         onChange={handleChange}
         required
            />
      <ReactMarkdown className="bg-white mt-2 p-2 border-2 border-color-secondary" children={input}/> 
   </div>
  )
}

export default MarkdownTextArea