import { styled } from '@/theme/stitches.config'

export const StyledSnappableContainer = styled('div', {
	position: 'fixed',
	top: 0,
	left: 0,
	height: '$$height',
	width: '100svi',
	pointerEvents: 'none',

	'& > *': {
		pointerEvents: 'all',
	},
})
