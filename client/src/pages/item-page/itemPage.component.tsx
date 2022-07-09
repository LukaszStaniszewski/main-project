import {useState, useEffect, Fragment} from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getItemStart } from "../../store/items/item.actions"
import { selectItem } from "../../store/items/item.selector"
import HeaderExtension from "../../components/headerExtension/headerExtension.component"
import Spinner from "../../components/spinner/spinner.component"
import { OptionalItemData, Topics, ItemKey } from "../../components/create-item/item-types/itemTypes"

const ItemPage = () => {
   const [fieldKeys, setFieldKeys] = useState<ItemKey[]>([])
   const dispatch = useDispatch()
   const item = useSelector(selectItem)

   const {id} = useParams()

   useEffect(() => {
      if(!id || item) return
      dispatch(getItemStart(id))
   }, [])

   useEffect(() => {
      if(!item?.optionalFields) return

      const fieldKey = Object.keys(item.optionalFields) as ItemKey[]
      setFieldKeys(fieldKey)
   },[item])
   console.log("item", fieldKeys)
  return (
    <section className=" relative z-0 pb-4">
      <HeaderExtension/>
      <main className="bg-secondary w-90vw m-auto screen-height p-4 rounded">
         {
            item
            ?  <Fragment>
                  <div>
                     <div>name: {item.name}</div>
                     <div>topic: {item.topic}</div>
                     <div>createdAt: {item.createdAt}</div>
                 </div>
                 {
                  fieldKeys.length > 0 &&  
                  <div>
                     {fieldKeys.map((key, index) => {
                        if(!item.optionalFields) return <span></span>
                        if(key === "image") {
                           return <img src={`${item.optionalFields[key]}`} alt="" />
                        } else {
                           return <div key={index}>{key}:{item.optionalFields[key]}</div>   
                        }
                     })}
                  </div>
               
                  }
               </Fragment>

            : <div className="left-1/2 absolute -ml-4 top-1/3">
               <Spinner/>
              </div>
         }
      </main>
    </section>
  )
}

export default ItemPage