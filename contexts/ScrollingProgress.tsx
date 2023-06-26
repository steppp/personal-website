import { Context, createContext } from 'react'

type ScrollingProgressProviderPartialProps = {
	scrollProgress: number
}
type ScrollingProgressProviderProps = React.PropsWithChildren<ScrollingProgressProviderPartialProps>

type ScrollingContextProps = {
	progress: number
}

const ScrollingProgressContext: Context<ScrollingContextProps> = createContext({
	progress: 0,
})

function ScrollingProgressProvider(props: ScrollingProgressProviderProps): JSX.Element {
	// simpy forward the scrolling progress to components which need it
	return (
		<ScrollingProgressContext.Provider value={{ progress: props.scrollProgress }}>
			{props.children}
		</ScrollingProgressContext.Provider>
	)
}

export default ScrollingProgressContext
export { ScrollingProgressProvider }
