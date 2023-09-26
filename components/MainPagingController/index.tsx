import { ScrollingProgressProvider } from '@/contexts/ScrollingProgress'
import { motion, useAnimationControls } from 'framer-motion'
import { Children, PropsWithChildren, useEffect, useRef } from 'react'
import { StyledMainPagingContainer, StyledMainPagingOverlayController } from './styles'

const MainPagingController = ({ children }: PropsWithChildren) => {
	const pagingControllerRef = useRef<HTMLDivElement>(null)
	const animationControls = useAnimationControls()
	// const totalHeight = Children.count(children) * window.innerHeight

	// need to register the event handler manually since
	// we have to use a non-passive event listener
	// and react use passive ones by default
	useEffect(() => {
		const currentRef = pagingControllerRef.current
		currentRef?.addEventListener(
			'wheel',
			(evt) => {
				evt.preventDefault()
			},
			{ passive: false }
		)

		return () => {
			currentRef?.removeEventListener('wheel', (evt) => {
				evt.preventDefault()
			})
		}
	}, [pagingControllerRef])

	return (
		<StyledMainPagingContainer>
			<ScrollingProgressProvider scrollProgress={0}>
				{children}

				<StyledMainPagingOverlayController
					ref={pagingControllerRef}
					animate={animationControls}
					drag="y"
					// dragMomentum={false}
					dragSnapToOrigin
					onDrag={(event, info) => {
						console.debug({ event, info })
						window.scrollBy(0, info.delta.y)
					}}
					onDragEnd={() => {
						// animationControls.set({ x: 0, y: 0 })
					}}
				/>
			</ScrollingProgressProvider>
		</StyledMainPagingContainer>
	)
}

export default MainPagingController
