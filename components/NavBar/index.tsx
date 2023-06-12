import { NavbarItemModel, NavbarModel } from '@/models/components/Navbar'
import { theme } from '@/theme/stitches.config'
import { motion, MotionProps, stagger, useAnimate, Variant } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { ElementType, useEffect, useRef, useState } from 'react'
import Button from '../Button'
import {
	StyledNavbar,
	StyledNavbarContent,
	StyledNavbarItem,
	StyledNavbarOpenNavbarItem,
} from './styles'

const navbarAnimationDuration = 0.2
const navbarItemAnimationOffset = 10
const navbarItemAnimationStagger = 0.03

/**
 * Converts a string pixel unit with the px suffix to a number
 * @param value the value to be converted with the px suffix
 * @returns a number representing the value without the px suffix
 */
const unitWithoutPx = (value: string) => Number(value.replace(/px$/, ''))

const NavBar = ({ items }: NavbarModel) => {
	// item which highlights the page we are currently on
	const [activeItem, setActiveItem] = useState<NavbarItemModel>()
	// item which is the only clickable element besides the hamburger button
	const [nextItem, setNextItem] = useState<NavbarItemModel>()
	const [open, setOpen] = useState(false)
	const [hiddenItems, setHiddenItems] = useState<NavbarItemModel[]>([])
	const router = useRouter()

	const [scope, animate] = useAnimate<HTMLDivElement>()
	const navbarContentRef = useRef<HTMLUListElement>(null)

	// this will set the minWidth navbar style
	// so the width is free to increase
	// and by doing so, we can set a minimum value for the navbar width
	const [navbarWidth, setNavbarWidth] = useState(-1)

	if (!items?.length) {
		throw new Error('No items provided')
	}

	const toggleMenuOpen = () => {
		setOpen(!open)
	}

	// set navbar minimum width
	useEffect(() => {
		if (navbarWidth > scope.current?.clientWidth) {
			return
		}

		setNavbarWidth(scope.current?.clientWidth)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scope, scope.current?.clientWidth])

	// update visible navbar items
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

	// animate the navbar when opening/closing
	useEffect(() => {
		async function myAnimation(open: boolean) {
			// first half of the animation: fade out the navbar items
			await animate(
				`${StyledNavbarItem}`,
				{
					opacity: [1, 0],
					x: open ? 0 : [0, navbarItemAnimationOffset],
					y: open ? [0, navbarItemAnimationOffset] : 0,
				},
				{
					duration: navbarAnimationDuration,
					delay: stagger(navbarItemAnimationStagger),
				}
			)
			await animate(
				`${StyledNavbarItem}`,
				{
					x: 0,
					y: 0,
					marginLeft: open ? 0 : theme.space.small.computedValue,
					marginTop: open ? theme.space.small.computedValue : 0,
				},
				{
					duration: 0,
				}
			)
			await animate(
				`${StyledNavbarItem}:first-child`,
				{
					marginLeft: 0,
					marginTop: 0,
				},
				{
					duration: 0,
				}
			)

			// mid animation: change the flex direction of the navbar
			// show hidden elements
			await animate(
				`${StyledNavbarOpenNavbarItem}`,
				{
					display: open ? 'inline-block' : 'none',
				},
				{
					duration: 0,
				}
			)
			// update flex items direction
			await animate(
				`${StyledNavbarContent}`,
				{
					flexDirection: open ? 'column' : 'row',
					alignItems: open ? 'end' : 'center',
				},
				{
					duration: 0,
				}
			)
			// update navbar height
			await animate(
				scope.current,
				{
					// use theme token values to get the correct height
					height: open
						? // need to use the unitWithoutPx function since the value of the token
						  // contains the unit string (px) and we need to remove it to perform calculations
						  (items.length + 1) * unitWithoutPx(theme.sizes.navbarButtonHeight.value) +
						  (items.length + 2) * unitWithoutPx(theme.space.small.value)
						: unitWithoutPx(theme.sizes.navbarButtonHeight.value) +
						  2 * unitWithoutPx(theme.space.small.value),
				},
				{
					duration: navbarAnimationDuration,
				}
			)

			// second half of the animation: fade in the navbar items
			await animate(
				`${StyledNavbarItem}`,
				{
					opacity: [0, 1],
					y: open ? 0 : [navbarItemAnimationOffset, 0],
					x: open ? [navbarItemAnimationOffset, 0] : 0,
				},
				{
					duration: navbarAnimationDuration,
					delay: stagger(navbarItemAnimationStagger),
				}
			)
		}

		myAnimation(open)
	}, [open, animate, scope, items.length])

	return (
		<StyledNavbar
			open={open}
			ref={scope}
			css={{
				minWidth: `${navbarWidth}px`,
			}}
			initial={false}
		>
			<StyledNavbarContent ref={navbarContentRef}>
				<StyledNavbarItem>
					<Button plain href={activeItem?.href}>
						{activeItem?.label}
					</Button>
				</StyledNavbarItem>
				<StyledNavbarItem>
					<Button href={nextItem?.href}>{nextItem?.label}</Button>
				</StyledNavbarItem>
				{
					// add remaining menu items, which are hidden when the navbar is closed
					// this is needed (?) to allow them to be displayed mid-transition
					hiddenItems?.map((item) => (
						<StyledNavbarOpenNavbarItem key={item.href}>
							<Button href={item.href}>{item.label}</Button>
						</StyledNavbarOpenNavbarItem>
					))
				}
				<StyledNavbarItem>
					<Button iconName="hamburger" ratio={1} onClick={toggleMenuOpen} />
				</StyledNavbarItem>
			</StyledNavbarContent>
		</StyledNavbar>
	)
}

export default NavBar
