import { useRef } from "react";

import HeaderExtension from "../../components/headerExtension/headerExtension.component";
import LatestItemsOverview from "../../components/latest-items/latest-items-overview.component";
import LargestCollectionsOverview from "../../components/largest-collections/largest-collections-overview.component";

const HomePage = () => {
   const ref = useRef<HTMLHeadingElement>(null);

   return (
      <section className=" relative z-0 pb-4">
         <HeaderExtension />
         <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded grid grid-cols-4">
            <figure className="col-start-1 col-end-4 mt-6 mr-2 pr-2 border-r-2 ">
               <h2 className="pb-4">Top collections</h2>
               <div ref={ref}>
                  <LargestCollectionsOverview />
               </div>
            </figure>
            <aside className="col-start-4 col-end-5">
               <h2 className="py-5">Latest Items</h2>
               <div className="overflow-y-auto">
                  <LatestItemsOverview />
               </div>
            </aside>
         </main>
      </section>
   );
};

export default HomePage;
