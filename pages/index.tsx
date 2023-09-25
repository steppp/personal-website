import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export default function Home() {
	return (
		<Splide
			hasTrack={false}
			options={{
				speed: 1000,
				autoWidth: true,
				height: '100svb',
				perPage: 1,
				gap: 0,
				pagination: false,
				arrows: false,
				drag: true,
				snap: true,
				dragMinThreshold: 10,
				flickPower: 600,
				flickMaxPages: 1,
				waitForTransition: true,
				preloadPages: 1,
				wheel: true,
				keyboard: true,
				direction: 'ttb',
			}}
		>
			<SplideTrack>
				<SplideSlide>Slide 1</SplideSlide>
				<SplideSlide>Slide 2</SplideSlide>
				<SplideSlide>Slide 3</SplideSlide>
				<SplideSlide>Slide 4</SplideSlide>
				<SplideSlide>Slide 5</SplideSlide>
			</SplideTrack>
		</Splide>
	)
}
