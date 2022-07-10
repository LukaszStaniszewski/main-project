import { Route, Routes} from "react-router-dom"
import ItemPage from "../../pages/item-page/item-page.component"

const ItemPageRoute = () => {
  return (
   <Routes>
      <Route path="/:id" element={<ItemPage/>}></Route>
   </Routes>
  )
}

export default ItemPageRoute