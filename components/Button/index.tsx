import React, { MouseEventHandler } from 'react'
import Icon from '../Icon'
import { StyledButton, StyledButtonIcon } from './styles'

interface ButtonProps {
	href?: string
	iconName?: string
	onClick?: MouseEventHandler
	children?: React.ReactNode
}

const Button = ({ onClick, href, iconName, children, ...props }: ButtonProps) => {
	return (
		<StyledButton onClick={onClick}>
			{iconName && (
				<StyledButtonIcon hasText={children !== undefined}>
					<Icon name={iconName} role="button icon" />
				</StyledButtonIcon>
			)}
			{children}
		</StyledButton>
	)
}

export default Button
