export const SELECT_DEFAULT_VALUE = 'default-value'
export const PASSWORD_MIN_MAX_LENGHT = [8, 20]
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD_REGEX = new RegExp(
	`^(?=(.*[A-Z]))(?=(.*[a-z]))(?=(.*\d))(?=(.*[\W_]))[A-Za-z\d\W_]{${PASSWORD_MIN_MAX_LENGHT[0]},${PASSWORD_MIN_MAX_LENGHT[1]}}$`
)

export const INPUTS_VALIDATIONS = {
	requiredMessage: 'Este campo es obligatorio',
	document: {
		min: 5,
		max: 15,
		sizeMessage: 'El documento debe tener entre 5 y 15 caracteres'
	},
	password: {
		sizeMessage: 'La contraseña debe tener entre 8 y 20 caracteres',
		strongMessage:
			'La contraseña debe tener al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial'
	},
	select: {
		requiredMessage: 'Selecciona una opción de la lista'
	}
}
