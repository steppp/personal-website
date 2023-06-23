import { styled } from '@/theme/stitches.config'
import { motion } from 'framer-motion'

export const StyledSnappableSection = styled(motion.section, {
	height: '100svb',
	width: '100%',
	background: '$primaryAccent1',
	border: '1px solid $grayDark3',
	scrollSnapAlign: 'center',
})
