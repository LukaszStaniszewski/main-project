import {useState, ChangeEvent, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { ITableRows } from "../table-types/table-types"

const TableRows = ({row, columns, selectAll, setSelectedItems, checkboxesAvaible, url}: ITableRows) => {
   const [checkbox, setCheckbox] = useState(false)
   const navigate = useNavigate()

   useEffect(() => {
      setCheckbox(selectAll)
      addItemsToUpdate(selectAll)
   }, [selectAll])
  
   const checkBoxHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const selectOne = event.target.checked
      setCheckbox((prevState) => prevState === selectAll ? selectOne : selectAll)
      addItemsToUpdate(selectOne)
   }

   const addItemsToUpdate = (checkbox: boolean) => {
      if(!setSelectedItems) return
      if(!checkbox) return removeFromUpdating()
   //@ts-ignore
      
      setSelectedItems((prevState) => [...new Set([...prevState, row])])
   }  
  
   const removeFromUpdating = () => {
      if(!setSelectedItems) return
      return setSelectedItems((prevState) => prevState.filter(prevItem => prevItem._id!== row._id))
   }

   const redirect = () => {
      if(!url) return
      navigate(`/${url}/${row._id}`)
   }

  return (
      <tr onClick={redirect} className="cursor-pointer">
         <td>
            {checkboxesAvaible && <input className="checkbox" type="checkbox" onChange={checkBoxHandler} checked={checkbox} />}
         </td>
         { 
         columns.map((column, index) => {
         //@ts-ignore
         if(column === "image" && row[column]) {
            return <td><img className="max-h-20" src={`${row[column]}`}/></td>
         }
         //@ts-ignore

               return <td className="whitespace-normal break-words"  key={index}>{row[column]}</td> 
          } )
         }
      </tr>
  )
}

export default TableRows