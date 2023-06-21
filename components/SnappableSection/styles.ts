import { styled } from '@/theme/stitches.config'
import { motion } from 'framer-motion'

export const StyledSnappableSection = styled(motion.section, {
	position: 'absolute',
	top: 'calc($$offset * 100svb)',
	left: 0,
	height: '100svb',
	width: '100%',
	background: '$primaryAccent1',
	border: '1px solid $grayDark3',
	transform: 'translateY($$offsetTop px)',
})
