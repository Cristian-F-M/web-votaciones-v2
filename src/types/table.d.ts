import type { CustomObject } from '.'

export type TableSingleItem = string | null | CustomObject | CustomObject[]

export type TableItems = Record<string, TableSingleItem>[]

export interface TableProps {
	items: TableItems
	modelName: string
  allowEdit?: boolean
}

interface TdBaseProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
	itemId: string
	items: TableItems
}

type TdValueProps = {
	value: TableSingleItem
	headerName: string
}

type TdProps = TdBaseProps & (TdValueProps | { children: React.ReactNode })

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export interface OpenDetailsButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	objectKey: string
	entityId: string
	items: TableItems
	children: React.ReactNode
}
