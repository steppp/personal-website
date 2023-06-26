import ScrollingProgressContext from '@/contexts/ScrollingProgress'
import { useContext } from 'react'

export default function PageSection({ children }: React.PropsWithChildren) {
	const { progress } = useContext(ScrollingProgressContext)

	return <div>{progress}</div>
}
