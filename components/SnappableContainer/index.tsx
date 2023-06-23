import { PanInfo, useSpring, useTransform } from 'framer-motion'
import { Children, useEffect, useRef, useState } from 'react'
import SnappableSection from '../SnappableSection'
import { StyledSnappableContainer } from './styles'

const getSectionHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 0)

export default function SnappableContainer({ children }: React.PropsWithChildren) {
	const [height, setHeight] = useState(0)
	const childrenCount = Children.count(children)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHeight(childrenCount * getSectionHeight())
		}
	}, [childrenCount])

	return (
		<StyledSnappableContainer css={{ $$height: height + 'px' }}>
			{Children.map(children, (child, i) => (
				<SnappableSection>{child}</SnappableSection>
			))}
		</StyledSnappableContainer>
	)
}
