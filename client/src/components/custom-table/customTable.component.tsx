import{ useState,} from 'react'

import TableRows from "./table-rows/tableRows.component"
import { ICustomTable, Columns, Rows } from "./table-types/table-types"

const CustomTable =  ({rows = [], checkboxesOpen = false, setSelectedItems}: ICustomTable) => {
   const columns = Object.keys(rows[0]).filter(value => value !== "_id") as Columns
   
   const [checkbox, setCheckbox] = useState(false)
   const [sortedBy, setSortedBy] = useState({
      column: columns[0],
      ascending: true
   })

   const selectRowsHandler = () => {
      setCheckbox(!checkbox)
   }
  
   const sort = (rows: Rows) => {
      const {column, ascending} = sortedBy
      return rows.sort((a,b) => {

         if(a[column].toString() > b[column].toString()) {
            return ascending ? -1 : 1;
         }
         if(b[column].toString() > a[column].toString()) {
            return ascending ? 1: -1;
         }
         return 0
      })
   }
 
   return (
   <div className="overlow-auto">

      <table className="table w-full bg-secondary table-normal">
         <thead>
            <tr>
               <th>
                  {checkboxesOpen && <input className="checkbox" type="checkbox" name="selectAll" onClick={selectRowsHandler} />}
               </th>
               {  
               columns.map((column, index) => 
               <th key={index}>
                  <div className="flex items-center gap-2 cursor-pointer" 
                     onClick={() => setSortedBy(prevState => ({
                     column,
                     ascending: !prevState.ascending
                  }))}>
                     <div >{column}</div>
                     {sortedBy.column === column && (
                        sortedBy.ascending
                        ? <div>▲</div>
                        : <div>▼</div>
                     )}
                  </div>
               </th>
                  )   
               }
            </tr>
         </thead>
         <tbody>
            {
               sort(rows).map(row=> (
               <TableRows
                  key={row._id} 
                  row={row} 
                  columns={columns} 
                  mainCheckbox={checkbox} 
                  setSelectedItems={setSelectedItems} 
                  checkboxesOpen={checkboxesOpen}/>
               ))
            }
         </tbody>
      </table>
   </div>
   )
}

export default CustomTable