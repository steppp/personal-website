import { styled } from '@/theme/stitches.config'
import { motion } from 'framer-motion'

export const StyledNavbarContent = styled(motion.ul, {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'row',
	padding: '$small',
	// height: '$navbarHeight',
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
	transform: 'translate(-50%, 0)',
	fontFamily: '$heading',
	fontSize: '$default',
	width: 'auto',

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

export const StyledNavbarItem = styled(motion.li, {
	listStyle: 'none',
})

export const StyledNavbarOpenNavbarItem = styled(StyledNavbarItem, {
	display: 'none',
})
