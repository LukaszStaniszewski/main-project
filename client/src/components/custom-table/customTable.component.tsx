import{ useState,} from 'react'

import TableRows from "./table-rows/tableRows.component"
import { ICustomTable, Columns, Rows } from "./table-types/table-types"

const CustomTable =  ({rows = [], customizedColumns,  checkboxesAvaible = false, setSelectedItems, url}: ICustomTable) => {
   let columns: string[]
   if(customizedColumns) {
      columns = customizedColumns
   } else {
      columns = Object.keys(rows[0]).filter(value => value !== "_id") as Columns
   }

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
         //@ts-ignore
         if(a[column].toString() > b[column].toString()) {
            return ascending ? -1 : 1;
         }
         //@ts-ignore
         if(b[column].toString() > a[column].toString()) {
            return ascending ? 1: -1;
         }
         return 0
      })
   }
 
   return (
   <div >

      <table className="table bg-secondary table-normal w-full">
         <thead >
            <tr>
               <th>
                  {checkboxesAvaible && <input className="checkbox" type="checkbox" name="selectAll" onClick={selectRowsHandler} />}
               </th>
               {  
               columns.map((column, index) => 
               <th key={index}>
               {/* @ts-ignore */}
                {rows[0][column] &&  
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
                  }
               </th>
                  )   
               }
            </tr>
         </thead>
         <tbody >
            {
               sort(rows).map(row=> 
             
               <TableRows
                  key={row._id} 
                  row={row} 
                  //@ts-ignore
                  columns={columns} 
                  selectAll={checkbox} 
                  setSelectedItems={setSelectedItems} 
                  checkboxesAvaible={checkboxesAvaible}
                  url={url}
                  />

               )
            }
         </tbody>
      </table>
   </div>
   )
}

export default CustomTable