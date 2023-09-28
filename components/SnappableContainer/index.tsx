import { ScrollingProgressProvider } from '@/contexts/ScrollingProgress'
import { useScroll, useSpring } from 'framer-motion'
import { Children, useEffect, useRef, useState } from 'react'
import SnappableSection from '../SnappableSection'
import { StyledSnappableContainer } from './styles'

export default function SnappableContainer({ children }: React.PropsWithChildren) {
	const containerRef = useRef<HTMLDivElement>(null)

	// get a MotionValue for the scroll progress of the contaienr element
	const { scrollYProgress } = useScroll({ container: containerRef })
	const [scrollYProgressValue, setScrollYProgressValue] = useState(0)

	useEffect(() => {
		// update the progress state variable when the progress changes
		scrollYProgress.on('change', (value) => {
			setScrollYProgressValue(value)
		})
	}, [scrollYProgress])

	return (
		<></>
		// <ScrollingProgressProvider scrollProgress={scrollYProgressValue}>
		// 	<StyledSnappableContainer ref={containerRef}>
		// 		{Children.map(children, (child) => (
		// 			<SnappableSection>{child}</SnappableSection>
		// 		))}
		// 	</StyledSnappableContainer>
		// </ScrollingProgressProvider>
	)
}
