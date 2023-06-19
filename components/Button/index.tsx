import React, { MouseEventHandler } from 'react'
import Icon from '../Icon'
import { StyledButton, StyledButtonIcon, StyledLink } from './styles'

interface ButtonProps {
	href?: string
	iconName?: string
	onClick?: MouseEventHandler
	children?: React.ReactNode
	plain?: boolean
	ratio?: number // aspect ratio
}

const Button = ({ onClick, href, iconName, children, ...props }: ButtonProps) => {
	const WrapperComponent = (!!href ? StyledLink : StyledButton) as React.ElementType

	return (
		<WrapperComponent href={href} onClick={onClick} plain={props.plain} css={{ $$aR: props.ratio }}>
			{iconName && (
				<StyledButtonIcon hasText={children !== undefined}>
					<Icon name={iconName} role="button icon" />
				</StyledButtonIcon>
			)}
			{children}
		</WrapperComponent>
	)
}

export default Button
