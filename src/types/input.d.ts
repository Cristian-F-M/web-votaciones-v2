interface InputBaseProps {
	label: string
	name: string
	id: string
	error: string | null
	required?: boolean
	typeInput: 'text' | 'select'
	className?: string
}

type InputTextProps = InputBaseProps & {
	type: React.InputHTMLAttributes<HTMLInputElement>['type']
	typeInput: 'text'
} & React.InputHTMLAttributes<HTMLInputElement>
type InputSelectProps = {
	typeInput: 'select'
	selectedItem: string
	items: { value: string; name: string; id: string }[]
} & InputBaseProps &
	React.SelectHTMLAttributes<HTMLSelectElement>

export type InputProps = InputTextProps | InputSelectProps
