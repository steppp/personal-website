import React from 'react'
import Button from '../Button'
import { StyledNavBar } from './styles'

const NavBar = () => {
	return (
		<StyledNavBar>
			<Button plain>Home</Button>
			<Button>About</Button>
			<Button iconName="hamburger" onClick={(e) => console.debug({ e })} />
		</StyledNavBar>
	)
}

export default NavBar
