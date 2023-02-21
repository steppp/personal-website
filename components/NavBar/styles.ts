import { styled } from '@/theme/stitches.config'

export const StyledNavBar = styled('nav', {
	backgroundColor: '$grayDark1',
	borderRadius: '$outer',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'stretch',
	maxWidth: '90%',
	position: 'fixed',
	left: '50%',
	bottom: '$medium',
	padding: '$small',
	transform: 'translate(-50%, 0)',

	'& > * + *': {
		marginLeft: '$small',
	},
})
