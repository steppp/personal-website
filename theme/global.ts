import { globalCss } from './stitches.config'

const reset = {
	/*
    1. Use a more-intuitive box-sizing model.
  */
	'*, *::before, *::after': {
		boxSizing: 'border-box',
	},

	/*
    2. Remove default margin
  */
	'*': {
		margin: 0,
	},

	/*
    3. Allow percentage-based heights in the application
  */
	'html, body': {
		height: '100%',
		width: '100%',
		position: 'fixed',
	},

	/*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
	body: {
		lineHeight: 1.5,
		'-webkit-font-smoothing': 'antialiased',
	},

	/*
    6. Improve media defaults
  */
	'img, picture, video, canvas, svg': {
		display: 'block',
		maxWidth: '100%',
	},

	/*
    7. Remove built-in form typography styles
  */
	'input, button, textarea, select': {
		font: 'inherit',
	},

	/*
    8. Avoid text overflows
  */
	'p, h1, h2, h3, h4, h5, h6': {
		overflowWrap: 'break-word',
	},

	/*
    9. Create a root stacking context
  */
	'#root, #__next': {
		isolation: 'isolate',
		height: '100%',
	},
	/*
		10. Hide the scrollbar
	*/
	'::-webkit-scrollbar': {
		width: 0,
		height: 0,
		display: 'none',
	},
}

export const globalStyles = globalCss(reset)
