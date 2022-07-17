
import { CheckCircleIcon } from "@heroicons/react/outline"

import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import LatestItemsOverview from "../../components/latest-items/latest-items-overview.component"
import LargestCollectionsOverview from "../../components/largest-collections/largest-collections-overview.component"
import pattern from "./test.svg"
import pattern2 from "./test2.svg"
import pattern3 from "./test3.svg"



const HomePage = () => {
   const image = {
      // backgroundImage: "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)",
      // backgroundImage: "url(https://images.unsplash.com/photo-1604128311556-816dfb846a54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)",
      // backgroundImage: "url(https://images.unsplash.com/photo-1551522912-1f3c03d22c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTA0fHxjb2xsZWN0aW9ufGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60)",
      // backgroundImage: "url(https://images.unsplash.com/photo-1558470598-a5dda9640f68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fHBhaW50aW5nfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60)",
      backgroundImage: "url(<svg xmlns='http://www.w3.org/2000/svg' width='69.141' height='40' transform='scale(2)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M69.212 40H46.118L34.57 20 46.118 0h23.094l11.547 20zM57.665 60H34.57L23.023 40 34.57 20h23.095l11.547 20zm0-40H34.57L23.023 0 34.57-20h23.095L69.212 0zM34.57 60H11.476L-.07 40l11.547-20h23.095l11.547 20zm0-40H11.476L-.07 0l11.547-20h23.095L46.118 0zM23.023 40H-.07l-11.547-20L-.07 0h23.094L34.57 20z'  stroke-width='1' stroke='hsla(258.5,59.4%,59.4%,1)' fill='none'/></svg>)",
   }

  return (
    <section className=" relative z-0 pb-4">
      <HeaderExtension/>
      <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded grid grid-cols-4" >
         {/* <div  className="col-start-1 col-end-5 grid justify-center py-6" style={{backgroundImage: `url(${pattern2})`}}>
            <div className="text-3xl font-bold leading-snug mb-4" >
               <p>Easiest way to</p>
               <p>collect anything</p>
            </div>
            <ul className="text-left text-lg font-light">
               <li><CheckCircleIcon className="w-5 mr-2 inline text-light-blue-700"/> Store whatever you want</li>
               <li><CheckCircleIcon className="w-5 mr-2 inline text-light-blue-700"/> Browse whatever you want </li>
               <li><CheckCircleIcon className="w-5 mr-2 inline text-light-blue-700"/> Comment whatever you want</li>
            </ul>
         
           
         </div> */}
         <figure className="col-start-1 col-end-4 mt-6 mr-2 pr-2 border-r-2 ">
            <h2 className="pb-4">Top 5 collections</h2>
            <LargestCollectionsOverview/>
         </figure>
         <aside className="col-start-4 col-end-5">
            <h2 className="py-5">Latest Items</h2>
            <LatestItemsOverview/>
         </aside>
      </main>
   </section>
  )
}

export default HomePage