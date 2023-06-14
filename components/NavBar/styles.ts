import { styled } from '@/theme/stitches.config'
import { motion } from 'framer-motion'

export const StyledNavbarItem = styled(motion.li, {
	listStyle: 'none',

	variants: {
		disabled: {
			true: {
				pointerEvents: 'none',
			},
		},
	},
})

export const StyledNavbarHamburgerItem = styled(StyledNavbarItem, {
	listStyle: 'none',
	display: 'inline-block',
})

export const StyledNavbarOpenNavbarItem = styled(StyledNavbarItem, {
	display: 'none',
})

export const StyledNavbarContent = styled(motion.ul, {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'row',
	padding: '$small',
	fontSize: 'inherit',
	width: 'auto',

	'& > * + *': {
		marginLeft: '$small',
	},

	'& > *': {
		height: '$navbarButtonHeight',

		'& > * ': {
			height: 'inherit',
		},
	},
})

export const StyledNavbar = styled(motion.nav, {
	backgroundColor: '$grayDark1',
	borderRadius: '$outer',
	maxWidth: '90%',
	position: 'fixed',
	left: '50%',
	bottom: '$medium',
	fontFamily: '$heading',
	fontSize: '$default',
	width: 'auto',
	translate: '-50% 0',
	// opacity: 0,
	[`& ${StyledNavbarContent}`]: {
		[`& ${StyledNavbarItem}`]: {
			transform: `translate(0, $$itemsAnimationOffset)`,
			opacity: 0,
		},
	},

	'@md': {
		top: '$big',
		right: '$big',
		bottom: 'auto',
		left: 'auto',
		transform: 'none',
	},
	variants: {
		open: {
			true: {
				[`& ${StyledNavbarContent}`]: {
					alignItems: 'end',

					'& > * + *': {
						marginLeft: '0',
						marginTop: '$small',
					},
				},
			},
		},
	},
})
