export type SelectItem = {
	id: string
	value: string
	name: string
	[key: string]: any
}

interface InputBaseProps {
	label: string
	name: string
	id: string
	error: string | null
	required?: boolean
	className?: string
}

export interface InputTextProps
	extends InputBaseProps,
		React.InputHTMLAttributes<HTMLInputElement> {
	type: React.InputHTMLAttributes<HTMLInputElement>['type']
	onErrorChange?: (error: string | null) => void
}

export interface InputSelectProps
	extends InputBaseProps,
		React.SelectHTMLAttributes<HTMLSelectElement> {
	selectedItem: string
	items: SelectItem[]
}

export interface InputSelectWrapperProps extends InputSelectProps {
	items: () => Promise<{ [key: string]: SelectItem[] | any }>
	dataKey: string
	onErrorChange?: (error: string | null) => void
}
