import {useState, ChangeEvent, useEffect} from 'react'
import { ITableRows } from "../table-types/table-types"

const TableRows = ({row, columns, mainCheckbox, setSelectedItems, checkboxesOpen}: ITableRows) => {
   const [checkbox, setCheckbox] = useState(false)

   useEffect(() => {
      setCheckbox(mainCheckbox)
      addUsersToUpdate(mainCheckbox)
   }, [mainCheckbox])
  
   const checkBoxHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const rowChecked = event.target.checked
      setCheckbox((prevState) => prevState === mainCheckbox ? rowChecked : mainCheckbox)
      addUsersToUpdate(rowChecked)
   }

   const addUsersToUpdate = (checkbox: boolean) => {
      console.log("hit")
      if(!setSelectedItems) return
      if(!checkbox) return removeFromUpdating()
      setSelectedItems((prevState) => [...new Set([...prevState, row])])
   }  
  
   const removeFromUpdating = () => {
      if(!setSelectedItems) return
      return setSelectedItems((prevState) => prevState.filter(prevItem => prevItem._id!== row._id))
   }

  return (
      <tr>
         {checkboxesOpen && <input className="checkbox" type="checkbox" name={`index`} onChange={checkBoxHandler} checked={checkbox} />}
         { 
         columns.map((column, index) => 
               <td key={index}>{row[column].toString()}</td> 
            )
         }
      </tr>
  )
}

export default TableRows