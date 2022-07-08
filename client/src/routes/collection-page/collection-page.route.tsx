import { Route, Routes} from "react-router-dom"

import CollectionPage from "../../pages/collection-page/frame/collectionPage.component"

const CollectionPageRoute = () => {
  return (
   <Routes>
      <Route path="/:id" element={<CollectionPage/>}></Route>
   </Routes>
  )
}

export default CollectionPageRoute