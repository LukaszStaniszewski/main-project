import React from 'react'
import TextArea from "../../components/text-area/textArea.component"

const CreateCollection = () => {
  return (
   <section className=" relative z-0 ">
    <div className="bg-gradient-to-r from-color-primary to-color-secondary h-20 w-full absolute -z-10"></div>
    
    <main className="w-90vw m-auto bg-secondary flex flex-col justify-center items-center" >
      <h2 >Create new collection</h2>
      <TextArea/>
    </main>

</section>
  )
}

export default CreateCollection