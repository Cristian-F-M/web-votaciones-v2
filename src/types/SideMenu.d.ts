export interface SideMenuProps extends React.HTMLAttributes<HTMLDivElement> {
	items: (MenuItemImperativeProps & MenuItemBaseProps)[]
  id: string
}

export interface MenuItemImperativeProps {
	label: string
	icon?: keyof typeof import('@tabler/icons-react')
}

export interface MenuItemDeclarativeProps {
	children: React.ReactNode
}
export interface MenuItemBaseProps {
	href: `/${string}`
	prefix?: string | undefined
}

export type MenuItemProps = (
	| MenuItemImperativeProps
	| MenuItemDeclarativeProps
) &
	MenuItemBaseProps &
	React.HTMLAttributes<HTMLAnchorElement>
