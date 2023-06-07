import { styled } from '@/theme/stitches.config'

export const StyledNavbar = styled('nav', {
	backgroundColor: '$grayDark1',
	borderRadius: '$outer',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	maxWidth: '90%',
	position: 'fixed',
	left: '50%',
	bottom: '$medium',
	padding: '$small',
	transform: 'translate(-50%, 0)',
	fontFamily: '$heading',
	fontSize: '$default',
	minHeight: 'calc($navbarHeight)',

	'& > * + *': {
		marginLeft: '$small',
	},

	'& > *': {
		height: '100%',
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
				flexDirection: 'column',
				alignItems: 'end',

				'& > * + *': {
					marginLeft: '0',
					marginTop: '$small',
				},
			},
		},
	},
})
