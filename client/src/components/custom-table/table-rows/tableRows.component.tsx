import {useState, ChangeEvent, useEffect} from 'react'
import { ITableRows } from "../table-types/table-types"

const TableRows = ({row, columns, selectAll, setSelectedItems, checkboxesAvaible}: ITableRows) => {
   const [checkbox, setCheckbox] = useState(false)

   useEffect(() => {
      setCheckbox(selectAll)
      addUsersToUpdate(selectAll)
   }, [selectAll])
  
   const checkBoxHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const selectOne = event.target.checked
      setCheckbox((prevState) => prevState === selectAll ? selectOne : selectAll)
      addUsersToUpdate(selectOne)
   }

   const addUsersToUpdate = (checkbox: boolean) => {
      if(!setSelectedItems) return
      if(!checkbox) return removeFromUpdating()
         //@ts-ignore
      setSelectedItems((prevState) => [...new Set([...prevState, row])])
   }  
  
   const removeFromUpdating = () => {
      if(!setSelectedItems) return
      return setSelectedItems((prevState) => prevState.filter(prevItem => prevItem._id!== row._id))
   }

  return (
      <tr>
         <td>
            {checkboxesAvaible && <input className="checkbox" type="checkbox" name={`index`} onChange={checkBoxHandler} checked={checkbox} />}
         </td>
         { 
         columns.map((column, index) => {
         console.log("column", column)
         //@ts-ignore
         if(column === "image") {
            return <img className="max-h-20" src={`${row[column]}`}></img>
         }
         //@ts-ignore
               return <td key={index}>{row[column]}</td> 
          } )
         }
      </tr>
  )
}

export default TableRows