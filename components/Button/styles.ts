import { styled } from '@/theme/stitches.config'

export const StyledButton = styled('button', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '$inner',
	padding: '$default',
	border: 'none',
	width: 'auto',
	backgroundColor: '$primaryAccent1',
	color: '$grayLight1',

	variants: {
		plain: {
			true: {
				backgroundColor: 'transparent',
				color: '$grayLight1',
			},
		},
	},
})

export const StyledButtonIcon = styled('div', {
	variants: {
		hasText: {
			true: {
				marginRight: '$small',
			},
		},
	},
})
