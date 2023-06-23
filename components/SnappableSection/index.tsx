import { HTMLMotionProps } from 'framer-motion'
import { useEffect } from 'react'
import { StyledSnappableSection } from './styles'

type SwappableSectionOwnProps = {}
type SwappableSectionProps = HTMLMotionProps<'section'> & SwappableSectionOwnProps

export default function SnappableSection({
	children,
	...props
}: React.PropsWithChildren<SwappableSectionProps>) {
	return (
		<StyledSnappableSection {...props}>
			<h1>{children}</h1>
		</StyledSnappableSection>
	)
}
