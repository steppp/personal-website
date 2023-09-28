import MainPagingController from '@/components/MainPagingController'
import PageSection from '@/components/Section'
import SnappableContainer from '@/components/SnappableContainer'

export default function Home() {
	return (
		<MainPagingController>
			<PageSection showDot>1</PageSection>
			<PageSection>2</PageSection>
			<PageSection showDot>3</PageSection>
			<PageSection>4</PageSection>
		</MainPagingController>
	)
}
