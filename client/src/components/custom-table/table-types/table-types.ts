export type SortedBy<T extends RequiredProps> = {
   column: Column<T>;
   ascending: boolean;
};

export type Columns<T> = Array<keyof T>;
export type Column<T> = keyof T;

export type Rows<T extends RequiredProps> = Array<T>;

export type Row<T extends RequiredProps> = T;

interface IAdminTable<T extends RequiredProps> {
   setSelectedItems?: React.Dispatch<React.SetStateAction<T[]>>;
   checkboxesAvaible?: boolean;
}

export type RequiredProps = {
   _id: string;
};

export interface ICustomTable<T extends RequiredProps> extends IAdminTable<T> {
   rows: Rows<T>;
   customizedColumns?: string[];
   url?: string;
}

export interface ITableRows<T extends RequiredProps> extends IAdminTable<T> {
   row: Row<T>;
   columns: Columns<T>;
   selectAll: boolean;
   url?: string;
}
