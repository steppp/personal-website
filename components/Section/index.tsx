import ScrollingProgressContext from '@/contexts/ScrollingProgress'
import { styled } from '@/theme/stitches.config'
import { motion, useAnimationControls } from 'framer-motion'
import { useContext, useEffect } from 'react'

// min velocity value to trigger page change
const VELOCITY_THRESHOLD = 500

const StyledPageSection = styled(motion.div, {
	position: 'fixed',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',
})

const StyledPageSectionContent = styled('div', {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '3rem',
	height: '3rem',
	backgroundColor: 'orange',
	borderRadius: '50%',
})

type PageSectionProps = {
	showDot?: boolean
} & React.PropsWithChildren

export default function PageSection({ children, showDot }: PageSectionProps) {
	const { progress, onDragEnd } = useContext(ScrollingProgressContext)
	const animationControls = useAnimationControls()
	onDragEnd &&
		(onDragEnd.current = (velocity: number) => {
			const followingPage = velocity > 0 ? 'prev' : 'next'
			if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
				console.debug('following page: {0}', followingPage)
			} else {
				console.debug('staying on current page')
				animationControls
					.start({
						y: -300,
						transition: {
							from: progress,
							type: 'inertia',
							velocity: 400,
							duration: 1,
						},
					})
					.then(() => {
						console.debug('reset')
					})
			}
		})

	useEffect(() => {
		animationControls.set({ y: progress })
	}, [animationControls, progress])

	return (
		<StyledPageSection animate={animationControls}>
			{showDot && <StyledPageSectionContent />}
		</StyledPageSection>
	)
}
