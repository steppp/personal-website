import { styled, css } from '@/theme/stitches.config'
import Link from 'next/link'

const commonStyles = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '$inner',
	padding: '$default',
	border: 'none',
	width: 'max-content',
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

export const StyledLink = styled(Link, commonStyles, {
	textDecoration: 'none',
})

export const StyledButton = styled('button', {
	...commonStyles,
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
