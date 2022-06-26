import { ICurrentUser } from "../../../store/user/user.types"

export type Columns = Array<keyof ICurrentUser>
export type Rows = ICurrentUser[]
export type Row = ICurrentUser

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

