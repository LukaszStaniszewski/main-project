import { Route, Routes} from "react-router-dom"

import CollectionPage from "../../pages/collection-page/collection-page.component"

const CollectionPageRoute = () => {
  return (
   <Routes>
      <Route path="/:id" element={<CollectionPage/>}></Route>
   </Routes>
  )
}

export default CollectionPageRoute