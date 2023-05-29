import { styled } from '@/theme/stitches.config'

export const StyledIcon = styled('i', {
	width: '$iconSmall',
	height: '$iconSmall',
	display: 'block',
	minWidth: 'max-content',

	'& svg': {
		width: '$iconSmall',
		height: '$iconSmall',
		minWidth: 'max-content',
		minHeight: 'max-content',

		'& path': {
			stroke: '$grayLight1',
		},
	},
})
