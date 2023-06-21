import NavBar from '@/components/NavBar'
import { globalStyles } from '@/theme/global'
import { css } from '@/theme/stitches.config'
import type { AppProps } from 'next/app'

// style the main element in the HTML hierarchy with padding
// and background color
export const mainTagStyle = css({
	height: '100%',
	backgroundColor: '$grayDark2',
	padding: '$small',
	'@lg': {
		padding: '$medium',
	},
})

const navBarRoutes = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
]

export default function App({ Component, pageProps }: AppProps) {
	globalStyles()

	return (
		<>
			<main className={mainTagStyle()}>
				<Component {...pageProps} />
			</main>
			<NavBar items={navBarRoutes} />
		</>
	)
}
