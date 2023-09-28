import { ScrollingProgressProvider } from '@/contexts/ScrollingProgress'
import { motion, useAnimationControls } from 'framer-motion'
import { Children, PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import { StyledMainPagingContainer, StyledMainPagingOverlayController } from './styles'

type OnlineVelocityWMA = {
	value: number
	samplesCount: number
}

type ReducerAction = {
	type: 'update' | 'reset'
	payload: number
}

const VELOCITY_WMA_INITIAL_VALUE = 0

const MainPagingController = ({ children }: PropsWithChildren) => {
	const pagingControllerRef = useRef<HTMLDivElement>(null)
	const onDragEnd = useRef<(velocity: number) => void>()
	const animationControls = useAnimationControls()
	const [scrolledDistance, setScrolledDistance] = useState(0)

	// perform an online computation of the velocity Weighted Moving Average
	// this will be used to determine whether to change page or not
	const [velocityWMA, updateVelocityWMA] = useReducer(
		(state: OnlineVelocityWMA, action: ReducerAction) => {
			if (action.type === 'reset') {
				return { value: action.payload, samplesCount: 0 }
			}

			// action.type === 'update'
			const currentSampleNumber = state.samplesCount + 1
			const updatedVelocity = {
				// see https://stackoverflow.com/a/37830174
				value: state.value + (action.payload - state.value) / currentSampleNumber,
				samplesCount: currentSampleNumber,
			}

			return updatedVelocity
		},
		{ value: VELOCITY_WMA_INITIAL_VALUE, samplesCount: 0 }
	)

	// reset the reducer state to the initial value
	const resetVelocityWMAReducer = () =>
		updateVelocityWMA({ type: 'reset', payload: VELOCITY_WMA_INITIAL_VALUE })

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
			<ScrollingProgressProvider
				scrollProgress={scrolledDistance}
				currentPage={0}
				onDragEnd={onDragEnd}
			>
				{children}

				<StyledMainPagingOverlayController
					ref={pagingControllerRef}
					animate={animationControls}
					drag="y"
					// dragMomentum={false}
					dragSnapToOrigin
					onDrag={(event, info) => {
						console.debug({ event, info })
						setScrolledDistance(info.offset.y)
						updateVelocityWMA({
							type: 'update',
							payload: info.velocity.y,
						})
						// update velocity moving average
					}}
					onDragEnd={() => {
						resetVelocityWMAReducer()
						// compute moving average for velocity
						onDragEnd?.current?.(velocityWMA.value)
					}}
				/>
			</ScrollingProgressProvider>
		</StyledMainPagingContainer>
	)
}

export default MainPagingController
