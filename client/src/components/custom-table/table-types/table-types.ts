import { ICollection } from "../../../store/collections/collection.types"
import { ICurrentUser } from "../../../store/user/user.types"

export type Columns = Array<keyof ICurrentUser>
export type Rows = ICurrentUser[] | ICollection[]
export type Row = ICurrentUser | ICollection

interface ITableAdmin{
   setSelectedItems?: React.Dispatch<React.SetStateAction<ICurrentUser[]>>
   checkboxesAvaible?: boolean,
}

export interface ICustomTable extends ITableAdmin {
   rows: Rows,
}

export interface ITableRows extends ITableAdmin {
   row: Row,
   columns: Columns
   selectAll: boolean,
}

