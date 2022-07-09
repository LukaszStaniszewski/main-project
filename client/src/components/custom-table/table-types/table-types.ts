import { ICollection, ICollectionWithoutItems } from "../../../store/collections/collection.types"
import { ICurrentUser } from "../../../store/user/user.types"
import { ICustomizedCollections } from "../../../pages/user-page/frame/userPagecomponent"

export type Columns = Array<keyof ICurrentUser> 
export type Rows = ICurrentUser[] | ICustomizedCollections[]
export type Row = ICurrentUser | ICustomizedCollections

interface ITableAdmin{
   setSelectedItems?: React.Dispatch<React.SetStateAction<ICurrentUser[]>>
   checkboxesAvaible?: boolean,
}

export interface ICustomTable extends ITableAdmin {
   rows: Rows,
   customizedColumns?: string[]
   url?: string
}

export interface ITableRows extends ITableAdmin {
   row: Row,
   columns: Columns
   selectAll: boolean,
   url?: string
}

