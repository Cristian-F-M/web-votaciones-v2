export const SELECT_DEFAULT_VALUE = 'default-value'
export const PASSWORD_MIN_MAX_LENGHT = [8, 20]
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD_REGEX = new RegExp(
	`^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{${PASSWORD_MIN_MAX_LENGHT[0]},${PASSWORD_MIN_MAX_LENGHT[1]}}$`
)
export const INDEX_REGEX = /^\d+$/

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
			'La contraseña debe tener al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial',
		confirmMessage: 'Las contraseñas no coinciden'
	},
	select: {
		requiredMessage: 'Selecciona una opción de la lista'
	},
	name: {
		min: 2,
		sizeMessage: 'El nombre debe tener al menos 2 caracteres'
	},
	lastname: {
		min: 2,
		sizeMessage: 'El apellido debe tener al menos 2 caracteres'
	},
	phone: {
		size: 10,
		sizeMessage: 'El telefono debe tener 10 caracteres'
	},
	email: {
		validMessage: 'Ingresa un correo electronico válido'
	},
	description: {
		min: 10,
		max: 255,
		sizeMessage: 'La descripción debe tener entre 10 y 255 caracteres'
	},
  objectives: {
    min: 5,
    max: 30,
    sizeMessage: 'Debes agregar al menos 5 objetivos',
    text: {
      min: 5, 
      sizeMessage: 'El objetivo debe tener al menos 5 caracteres'
    }
  }
}
