import { createStitches } from '@stitches/react'
import localFont from '@next/font/local'

const codeNextHairline = localFont({ src: '../fonts/CodeNext-Trial-Hairline.woff2', weight: '100' })
const codeNextThin = localFont({ src: '../fonts/CodeNext-Trial-Thin.woff2', weight: '200' })
const codeNextLight = localFont({ src: '../fonts/CodeNext-Trial-Light.woff2', weight: '300' })
const codeNextBook = localFont({ src: '../fonts/CodeNext-Trial-Book.woff2', weight: '400' })
const codeNextRegular = localFont({ src: '../fonts/CodeNext-Trial-Regular.woff2', weight: '500' })
const codeNextSemiBold = localFont({ src: '../fonts/CodeNext-Trial-SemiBold.woff2', weight: '600' })
const codeNextBold = localFont({ src: '../fonts/CodeNext-Trial-Bold.woff2', weight: '700' })
const codeNextExtraBold = localFont({
	src: '../fonts/CodeNext-Trial-ExtraBold.woff2',
	weight: '800',
})
const codeNextHeavy = localFont({ src: '../fonts/CodeNext-Trial-Heavy.woff2', weight: '900' })
const codeNextBlack = localFont({ src: '../fonts/CodeNext-Trial-Black.woff2', weight: '1000' })

const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
	createStitches({
		theme: {
			colors: {
				primaryAccent1: '#BB2649',
				primaryAccent2: '#E85F5C',
				primaryAccent3: '#BFBFBF',
				secondaryAccent1: '#1C2826',
				secondaryAccent2: '#48392A',
				grayLight1: '#FAFAFA',
				grayLight2: '#BFBFBF',
				grayLight3: '#606060',
				grayDark1: '#060606',
				grayDark2: '#222222',
				grayDark3: '#606060',
			},
			fonts: {
				heading: `${codeNextBold.style.fontFamily}, sans-serif`,
				text: 'SF Pro Display, sans-serif',
				mono: 'Menlo, monospace',
			},
			fontSizes: {
				smaller: '12px',
				small: '16px',
				default: '20px',
				medium: '32px',
				large: '40px',
				big: '60px',
				bigger: '64px',
				huge: '72px',
			},
			space: {
				smaller: '4px',
				small: '8px',
				default: '16px',
				medium: '24px',
				big: '32px',
				bigger: '40px',
				huge: '60px',
			},
			radii: {
				outer: '32px',
				inner: '24px',
			},
			sizes: {
				iconSmall: 14,
				iconRegular: 20,
				iconMedium: 32,
				iconBig: 48,
				iconHuge: 60,
			},
		},
		media: {
			sm: '(min-width: 640px)',
			md: '(min-width: 768px)',
			lg: '(min-width: 1024px)',
		},
		utils: {},
	})

export { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config }
