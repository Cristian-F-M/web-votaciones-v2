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
	error: string | null | undefined
	required?: boolean
	className?: string
}

export interface InputTextProps
	extends InputBaseProps,
		React.InputHTMLAttributes<HTMLInputElement> {
	type: React.InputHTMLAttributes<HTMLInputElement>['type']
	onErrorChange?: (error: string | null) => void
	buttonShowPassword?: boolean
}

export interface InputSelectWrapperProps {
	items: () => Promise<{ [key: string]: SelectItem[] | any }>
	dataKey: string
	onErrorChange?: (error: string | null) => void
}


export interface SelectFullPropsProps extends InputBaseProps {
	selectedItem?: 'default-value' | (string & {})
	items: SelectItem[] | null
}

export type SelectProps = SelectFullPropsProps &
	React.SelectHTMLAttributes<HTMLSelectElement>
