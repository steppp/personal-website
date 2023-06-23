import { styled } from '@/theme/stitches.config'

export const StyledSnappableContainer = styled('div', {
	position: 'fixed',
	top: 0,
	left: 0,
	height: '100svb',
	width: '100svi',
	overflow: 'auto',
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent',
	scrollSnapType: 'y mandatory',
})
