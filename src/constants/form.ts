export const SELECT_DEFAULT_VALUE = 'default-value'
export const PASSWORD_MIN_MAX_LENGHT = [8, 20]
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD_REGEX = new RegExp(
	`^(?=(.*[A-Z]))(?=(.*[a-z]))(?=(.*\d))(?=(.*[\W_]))[A-Za-z\d\W_]{${PASSWORD_MIN_MAX_LENGHT[0]},${PASSWORD_MIN_MAX_LENGHT[1]}}$`
)

