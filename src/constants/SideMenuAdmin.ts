import type {
	MenuItemBaseProps,
	MenuItemImperativeProps
} from '@/types/SideMenu'

export const MENU_ITEMS_ADMINISTRATOR = [
	{
		href: '/dashboard',
		label: 'Dashboard',
		icon: 'IconDashboard'
	},
	{
		label: 'Candidatos',
		href: '/candidates',
		icon: 'IconUsersGroup'
	},
	{
		label: 'Users',
		href: '/users',
		icon: 'IconUsers'
	},
	{
		label: 'Configuraciones',
		href: '/configs',
		icon: 'IconSettings'
	},
	{
		href: '/devices-tokens',
		label: 'Token de notificaciones',
		icon: 'IconDeviceMobile'
	},
	{
		href: '/elections',
		label: 'Votaciones',
		icon: 'IconCheckbox'
	},
	{
		href: '/password-resets',
		label: 'Reseteo de contraseña',
		icon: 'IconEye'
	},
	{
		href: '/profiles',
		label: 'Perfiles',
		icon: 'IconUserCircle'
	},
	{ href: '/roles', label: 'Roles', icon: 'IconUser' },
	{
		href: '/sessions',
		label: 'Sessiones',
		icon: 'IconVersions'
	},
	{
		href: '/shift-types',
		label: 'Jornadas',
		icon: 'IconClock'
	},
	{
		href: '/type-documents',
		label: 'Tipos de documento',
		icon: 'IconFileText'
	},
	{ href: '/votes', label: 'Votos', icon: 'IconCheck' }
] satisfies (MenuItemImperativeProps & MenuItemBaseProps)[]
