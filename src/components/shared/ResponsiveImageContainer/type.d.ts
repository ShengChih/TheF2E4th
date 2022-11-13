import { ReactNode } from 'react'
import { MediaImageProps, MediaImage } from '@type.d'

export type ResponsiveImageContainerProps = MediaImageProps & {
	children: ReactNode
}

export * from '@type.d'