import { Route, Routes} from "react-router-dom"

import CollectionPageFrame from "./frame/collectionPageFrame.component"

const CollectionPage = () => {
  return (
   <Routes>
      <Route path="/:id" element={<CollectionPageFrame/>}></Route>
   </Routes>
  )
}

export default CollectionPage