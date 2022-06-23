import React, { useEffect, ChangeEvent, useState} from 'react'

import { ICurrentUser } from "../../store/user/user.types"


interface ITableRows {
   rows: ICurrentUser[],
   checkboxesOpen?: boolean,
}

const CustomTable =  ({rows = [], checkboxesOpen = false}: ITableRows) => {
   const columns: ITableRows | string[] = Object.keys(rows[0])

   const [sortedBy, setSortedBy] = useState({
      column: columns[0],
      ascending: true
   })
 
   const sort = (rows: []) => {
      const {column, ascending} = sortedBy
      return rows.sort((a,b) => {

         if(a[column] > b[column]) {
            return ascending ? -1 : 1;
         }
         if(b[column] > a[column]) {
            return ascending ? 1: -1;
         }
         return 0
      })
   }
 

   return (
   <div className="overlow-x-auto">
     {checkboxesOpen && <input className="checkbox" type="checkbox"/>}
      {/* <button className="w-4 ml-4" onClick={() => filterUsers("name")}> filter names</button> */}
      <table className="table w-full bg-secondary table-normal">
         <thead>
            <tr className="text-center">
               {checkboxesOpen && <th></th>}
               {  
                  columns.map((column, index) => 
                  <th  key={index}>
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
            
            {//@ts-ignore
            sort(rows).map((row, index )=> (
                  //@ts-ignore
            <tr key={index}>
              
              {checkboxesOpen && <input className="checkbox" type="checkbox" name={`index`} />}
               {  //@ts-ignore
               columns.map((column, index) => 
                   <td key={index}> 
                     {row[column]}</td>
                  )
               }
            </tr>
            ))}
         </tbody>
      </table>
   </div>
   )
}

export default CustomTable