import { HTMLMotionProps } from 'framer-motion'
import { useEffect } from 'react'
import { StyledSnappableSection } from './styles'

type SwappableSectionOwnProps = {
	offset: number
	dragOffset?: number
}
type SwappableSectionProps = HTMLMotionProps<'section'> & SwappableSectionOwnProps

export default function SnappableSection({
	children,
	offset,
	dragOffset,
	...props
}: React.PropsWithChildren<SwappableSectionProps>) {
	return (
		<StyledSnappableSection
			css={{ $$offset: offset, transform: `translateY(${dragOffset}px) !important` }}
			{...props}
		>
			<h1>{children}</h1>
		</StyledSnappableSection>
	)
}
