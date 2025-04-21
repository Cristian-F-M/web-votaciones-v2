export type SelectItem = {
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

export type InputTextProps = InputBaseProps & {
	type: React.InputHTMLAttributes<HTMLInputElement>['type']
} & React.InputHTMLAttributes<HTMLInputElement>

export type InputSelectProps = {
	selectedItem: string
	items: SelectItem[]
} & InputBaseProps &
	React.SelectHTMLAttributes<HTMLSelectElement>

export type InputSelectWrapperProps = Omit<InputSelectProps, 'items'> & {
	items: () => Promise<{ [key: string]: SelectItem[] | any }>
	dataKey: string
}
