import { PanInfo, useSpring, useTransform } from 'framer-motion'
import { Children, useEffect, useRef, useState } from 'react'
import SnappableSection from '../SnappableSection'
import { StyledSnappableContainer } from './styles'

const getSectionHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 0)

export default function SnappableContainer({ children }: React.PropsWithChildren) {
	const [height, setHeight] = useState(0)
	const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
	const [offsetTop, setOffsetTop] = useState(0)
	const [deltaY, setDeltaY] = useState(0)
	const childrenCount = Children.count(children)
	const transformSmooth = useSpring(offsetTop + deltaY, { stiffness: 100, damping: 20 })
	const tValue = useTransform(transformSmooth, [0, -(height - getSectionHeight())], [0, 1], {
		clamp: false,
	})

	const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		console.debug({ event, info })
		const {
			delta: { y: deltaY },
		} = info

		console.debug({ offsetTop, deltaY, height })
		setDeltaY(deltaY)
	}

	useEffect(() => {
		console.debug({ transformSmooth })
		console.debug({ tValue })
		const transformValue = transformSmooth.get()

		if (transformValue > 0) {
			setOffsetTop(0)
		} else if (transformValue < -(height - getSectionHeight())) {
			setOffsetTop(-(height - getSectionHeight()))
		} else {
			setOffsetTop(transformValue)
		}
	}, [transformSmooth, height, deltaY, tValue])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHeight(childrenCount * getSectionHeight())
		}
	}, [childrenCount])

	return (
		<StyledSnappableContainer css={{ $$height: height + 'px' }}>
			{Children.map(children, (child, i) => (
				<SnappableSection
					offset={i}
					style={{ y: offsetTop }}
					drag="y"
					// dragConstraints={{ top: 0 }}
					// onDrag={(evt, info) => console.debug({ evt, info })}
					onPan={handleDrag}
				>
					{child}
				</SnappableSection>
			))}
		</StyledSnappableContainer>
	)
}
