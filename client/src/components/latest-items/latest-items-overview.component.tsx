import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"

import Spinner from "../spinner/spinner.component"
import { selectLatestItems } from "../../store/items/item.selector"
import { getLatestItemsStart } from "../../store/items/item.actions"
import LatestItem from "./latest-item.component"

const LatestItemsOverview = () => {
   const dispatch = useDispatch()
   const latestItems = useSelector(selectLatestItems)

   useEffect(() => {
      dispatch(getLatestItemsStart())
   },[])


   if(!latestItems) {
      return <div><Spinner/></div>
   }

  return (
   <div> 
      {latestItems.map(item => 
         <LatestItem key={item._id} item={item}/>
      )}
   </div>
  )
}

export default LatestItemsOverview