import { Route, Routes} from "react-router-dom"
import ItemPage from "../../pages/item-page/itemPage.component"

const ItemPageRoute = () => {
  return (
   <Routes>
      <Route path="/:id" element={<ItemPage/>}></Route>
   </Routes>
  )
}

export default ItemPageRoute