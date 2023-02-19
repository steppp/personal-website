import { createStitches } from '@stitches/react'

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
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
				heading: 'CodeNext-Trial, sans-serif',
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
		},
		media: {
			sm: '(min-width: 640px)',
			md: '(min-width: 768px)',
			lg: '(min-width: 1024px)',
		},
		utils: {},
	})
