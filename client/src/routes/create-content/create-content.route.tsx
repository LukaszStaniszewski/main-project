import { Route, Routes} from "react-router-dom"

import CreateCollection from "../../pages/create-collection/create-collection"
import CreateItemPage from "../../pages/create-item-page/create-item-page.comonent"

const CreateContent = () => {
  return (
    <Routes>
      <Route path="collection" element={<CreateCollection/>}/>
      <Route path="item" element={<CreateItemPage/>}/>
    </Routes>
  )
}

export default CreateContent