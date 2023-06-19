import { NavbarItemModel, NavbarModel } from '@/models/components/Navbar'
import { theme } from '@/theme/stitches.config'
import { motion, MotionProps, stagger, useAnimate, Variant } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { ElementType, useEffect, useRef, useState } from 'react'
import Button from '../Button'
import {
	StyledNavbar,
	StyledNavbarContent,
	StyledNavbarHamburgerItem,
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

const openCloseAnimations = {
	step1: async ({ animate, open }: any) => {
		console.debug('openCloseAnimations.step1')
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
	},
	step2: async ({ animate, scope, open, items, targetWidth }: any) => {
		console.debug('openCloseAnimations.step2')
		await animate(
			`${StyledNavbarItem}:not(:first-child)`,
			{
				marginLeft: open ? 0 : theme.space.small.computedValue,
				marginTop: open ? theme.space.small.computedValue : 0,
			},
			{
				duration: 0,
			}
		)
		await animate(
			`${StyledNavbarItem}`,
			{
				x: 0,
				y: 0,
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
				width: open ? 'auto' : 'min-content',
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
	},
	afterStep2: async ({ animate, scope, targetWidth }: any) => {
		await animate(
			scope.current,
			{
				width: targetWidth,
			},
			{
				duration: navbarAnimationDuration,
			}
		)
	},
	step3: async ({ animate, open }: any) => {
		console.debug('openCloseAnimations.step3')
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
	},
}

const NavBar = ({ items }: NavbarModel) => {
	// item which highlights the page we are currently on
	const [activeItem, setActiveItem] = useState<NavbarItemModel>()
	// item which is the only clickable element besides the hamburger button
	const [nextItem, setNextItem] = useState<NavbarItemModel>()
	const [open, setOpen] = useState(false)
	const [hiddenItems, setHiddenItems] = useState<NavbarItemModel[]>([])
	const router = useRouter()
	const afterOpenNavigation = useRef(false)
	const afterClosedNavigation = useRef(false)

	const [scope, animate] = useAnimate<HTMLDivElement>()
	const navbarContentRef = useRef<HTMLUListElement>(null)

	if (!items?.length) {
		throw new Error('No items provided')
	}

	const toggleMenuOpen = () => {
		setOpen(!open)
	}

	// initial state of the navbar
	// and add navbar items event listeners
	useEffect(() => {
		const initialAnimation = async (open: boolean) => {
			await openCloseAnimations.step2({ animate, scope, open, items })

			// intermediate step: update the navbar width after the items has been placed
			const targetWidth = navbarContentRef.current?.clientWidth
			await openCloseAnimations.afterStep2({ animate, scope, targetWidth })

			await openCloseAnimations.step3({ animate, open })
		}

		if (afterClosedNavigation.current) {
			initialAnimation(false)
		}
		afterClosedNavigation.current = false
	}, [scope, animate, router, items])

	// add navbar items event listener
	// to animate the navigation
	useEffect(() => {
		const animatedNavigation = async (evt: Event) => {
			// skip the default routing logic
			evt.preventDefault()
			evt.stopImmediatePropagation()

			// run the first step of the animation before navigating to the next page
			await openCloseAnimations.step1({ animate, scope, open: !open })

			// signal to skip the first step of the animation when navbar is open/closed
			if (open) {
				afterOpenNavigation.current = true
			} else {
				afterClosedNavigation.current = true
			}

			// always reset to the closed state
			setOpen(false)

			// programmatically trigger the previously cancelled navigation
			const anchor = evt.target as HTMLAnchorElement
			router.push(anchor.href)
		}

		const navbarItems = scope.current?.querySelectorAll(
			`${StyledNavbarItem}:not(${StyledNavbarHamburgerItem}), ${StyledNavbarOpenNavbarItem}`
		)
		const navbarItemsArray = navbarItems && Array.from(navbarItems)
		navbarItemsArray.forEach((item) => {
			item.removeEventListener('click', animatedNavigation)
			item.addEventListener('click', animatedNavigation)
		})

		return () => {
			navbarItemsArray.forEach((item) => {
				item.removeEventListener('click', animatedNavigation)
			})
		}
	}, [animate, items.length, router, scope, open])

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
			// pre animation: if navbar is opening, set a fixed width
			// this will set the minWidth navbar style
			// so the width is free to increase
			// and by doing so, we can set a minimum value for the navbar width
			if (open) {
				animate(
					scope.current,
					{
						width: scope.current?.clientWidth,
					},
					{
						duration: 0,
					}
				)
			}

			if (!afterOpenNavigation.current) {
				// step 1: fade out the navbar items
				// not needed if navigating from the open navbar
				// since the first step has already been performed before the navigation
				await openCloseAnimations.step1({ animate, open })
			}
			afterOpenNavigation.current = false

			// step 2: change the flex direction of the navbar
			// show hidden elements
			await openCloseAnimations.step2({ animate, scope, open, items })

			// intermediate step: update the navbar width after the items has been placed
			const targetWidth = navbarContentRef.current?.clientWidth
			await openCloseAnimations.afterStep2({ animate, scope, targetWidth })

			// step 3: fade in the navbar items
			await openCloseAnimations.step3({ animate, open })
		}

		myAnimation(open)
	}, [open, animate, scope, items])

	return (
		<StyledNavbar
			open={open}
			ref={scope}
			initial={false}
			css={{
				$$itemsAnimationOffset: navbarItemAnimationOffset + 'px',
			}}
		>
			<StyledNavbarContent ref={navbarContentRef}>
				<StyledNavbarItem disabled>
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
				<StyledNavbarHamburgerItem>
					<Button iconName="hamburger" ratio={1} onClick={toggleMenuOpen} />
				</StyledNavbarHamburgerItem>
			</StyledNavbarContent>
		</StyledNavbar>
	)
}

export default NavBar
