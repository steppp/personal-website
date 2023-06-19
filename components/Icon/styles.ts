import { styled } from '@/theme/stitches.config'

export const StyledIcon = styled('i', {
	width: '$iconRegular',
	height: '$iconRegular',
	display: 'block',
	minWidth: 'max-content',

	'& svg': {
		width: '$iconRegular',
		height: '$iconRegular',
		minWidth: 'auto',
		minHeight: 'auto',

		'& path': {
			stroke: '$grayLight1',
		},
	},
})
