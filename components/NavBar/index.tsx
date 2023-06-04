import { NavbarItemModel, NavbarModel } from '@/models/components/Navbar'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { StyledNavbar } from './styles'

const NavBar = ({ items }: NavbarModel) => {
	// item which highlights the page we are currently on
	const [activeItem, setActiveItem] = useState<NavbarItemModel>()
	// item which is the only clickable element besides the hamburger button
	const [nextItem, setNextItem] = useState<NavbarItemModel>()
	const router = useRouter()

	if (!items?.length) {
		throw new Error('No items provided')
	}

	useEffect(() => {
		if (!router.isReady) {
			return
		}

		// select the element whose URL matches the pathname
		const activeRouteItem = items?.find((item) => router.asPath == item.href)
		setActiveItem(activeRouteItem)

		// the next clickable element will be the first one whose URL do not match the active one
		const nextRouteItem = items?.find((item) => item.href !== activeRouteItem?.href)
		setNextItem(nextRouteItem)
	}, [router, items])

	return (
		<StyledNavbar>
			<Button plain href={activeItem?.href}>
				{activeItem?.label}
			</Button>
			<Button href={nextItem?.href}>{nextItem?.label}</Button>
			<Button iconName="hamburger" onClick={(e) => console.debug({ e })} />
		</StyledNavbar>
	)
}

export default NavBar
