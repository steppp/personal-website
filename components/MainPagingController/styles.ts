import { styled } from '@/theme/stitches.config'
import { motion } from 'framer-motion'

export const StyledMainPagingContainer = styled(motion.div, {
	position: 'fixed',
	top: 0,
	left: 0,
	height: '100svb',
	width: '100svi',
	overflow: 'auto',
})

export const StyledMainPagingOverlayController = styled(motion.div, {
	position: 'absolute',
	top: 0,
	left: 0,
	height: 'inherit',
	width: 'inherit',
	backgroundColor: 'transparent',
	border: '2px solid yellow',
})
