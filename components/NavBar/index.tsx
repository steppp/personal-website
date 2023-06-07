import { NavbarItemModel, NavbarModel } from '@/models/components/Navbar'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import { StyledNavbar } from './styles'

const NavBar = ({ items }: NavbarModel) => {
	// item which highlights the page we are currently on
	const [activeItem, setActiveItem] = useState<NavbarItemModel>()
	// item which is the only clickable element besides the hamburger button
	const [nextItem, setNextItem] = useState<NavbarItemModel>()
	const [open, setOpen] = useState<boolean>(false)
	const [hiddenItems, setHiddenItems] = useState<NavbarItemModel[]>([])
	const navbarRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const navbarWidth = navbarRef.current?.clientWidth

	if (!items?.length) {
		throw new Error('No items provided')
	}

	const toggleMenuOpen = () => {
		setOpen(!open)
	}

	useEffect(() => {
		if (!router.isReady) {
			return
		}

		// local copy of the items array used to keep a reference of items
		// the need to be displayed when the navbar is open
		const localItems = [...items]

		// select the element whose URL matches the pathname
		const activeRouteItemIndex = localItems?.findIndex((item) => router.asPath == item.href)
		const activeRouteItem = localItems[activeRouteItemIndex]
		localItems.splice(activeRouteItemIndex, 1)
		setActiveItem(activeRouteItem)

		// the next clickable element will be the first one whose URL do not match the active one
		const nextRouteItemIndex = localItems?.findIndex((item) => item.href !== activeRouteItem?.href)
		const nextRouteItem = localItems[nextRouteItemIndex]
		localItems.splice(nextRouteItemIndex, 1)
		setNextItem(nextRouteItem)

		setHiddenItems(localItems)
	}, [router, items])

	return (
		<StyledNavbar
			open={open}
			ref={navbarRef}
			css={{
				width: open ? `${navbarWidth}px` : 'auto',
			}}
		>
			<Button plain href={activeItem?.href}>
				{activeItem?.label}
			</Button>
			<Button href={nextItem?.href}>{nextItem?.label}</Button>
			{open &&
				// show also remaining menu items when the navbar is open
				hiddenItems?.map((item) => (
					<Button key={item.href} href={item.href}>
						{item.label}
					</Button>
				))}
			<Button iconName="hamburger" ratio={1} onClick={toggleMenuOpen} />
		</StyledNavbar>
	)
}

export default NavBar
