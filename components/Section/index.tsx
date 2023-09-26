import ScrollingProgressContext from '@/contexts/ScrollingProgress'
import { styled } from '@/theme/stitches.config'
import { useContext } from 'react'

const StyledPageSection = styled('div', {
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

export default function PageSection({ children }: React.PropsWithChildren) {
	const { progress } = useContext(ScrollingProgressContext)

	return (
		<StyledPageSection>
			<StyledPageSectionContent></StyledPageSectionContent>
		</StyledPageSection>
	)
}
