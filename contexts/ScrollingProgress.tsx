import { Context, createContext, MutableRefObject, use, useRef } from 'react'

type ScrollingProgressProviderPartialProps = {
	scrollProgress: number
	currentPage: number
	onDragEnd?: MutableRefObject<((velocity: number) => void) | undefined>
}
type ScrollingProgressProviderProps = React.PropsWithChildren<ScrollingProgressProviderPartialProps>

type ScrollingContextProps = {
	progress: number
	currentPage: number
	onDragEnd?: MutableRefObject<((velocity: number) => void) | undefined>
}

const ScrollingProgressContext: Context<ScrollingContextProps> = createContext({
	progress: 0,
	currentPage: 0,
})

function ScrollingProgressProvider(props: ScrollingProgressProviderProps): JSX.Element {
	// simply forward the scrolling progress to components which need it
	return (
		<ScrollingProgressContext.Provider
			value={{
				progress: props.scrollProgress,
				currentPage: props.currentPage,
				onDragEnd: props.onDragEnd,
			}}
		>
			{props.children}
		</ScrollingProgressContext.Provider>
	)
}

export default ScrollingProgressContext
export { ScrollingProgressProvider }
