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
	buttonShowPassword?: boolean
}

export interface InputSelectWrapperProps {
	items: () => Promise<{ [key: string]: SelectItem[] | any }>
	dataKey: string
	onErrorChange?: (error: string | null) => void
}

export interface SelectFallbackProps
	extends Pick<InputBaseProps, 'label' | 'className' | 'error'> {
	mode: 'fallback'
}

export interface SelectFullPropsProps extends InputBaseProps {
	mode: 'normal'
	selectedItem: string
	items: SelectItem[]
}

export type SelectProps = (SelectFallbackProps | SelectFullPropsProps) &
	React.SelectHTMLAttributes<HTMLSelectElement>
