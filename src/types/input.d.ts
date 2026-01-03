export type SelectItem = {
	id: string
	value: string
	name: string
}

interface InputBaseProps {
	label: string
	name: string
	id: string
	error?: string | null | undefined
	className?: string
}

export interface InputTextProps
	extends InputBaseProps,
		React.InputHTMLAttributes<HTMLInputElement> {
	showTogglePassword?: boolean
}

export interface SelectBaseProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	selectedItem?: 'default-value' | (string & {})
	items: SelectItem[] | null
}

export interface SelectProps extends InputBaseProps, SelectBaseProps {
	required?: boolean
}
