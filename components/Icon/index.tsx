import glyphs from './Glyphs'
import { StyledIcon } from './styles'

interface IconProps {
	name: string
	role: string
}

const Icon = ({ name, role, ...props }: IconProps) => {
	const Glyph = glyphs[name]

	if (!Glyph) {
		console.warn('Cannot find icon with name ' + name)
	}

	return (
		<StyledIcon aria-hidden="true" role={role}>
			<Glyph />
		</StyledIcon>
	)
}

export default Icon
