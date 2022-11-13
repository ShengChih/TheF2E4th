import { MediaImageProps } from '@type.d'

export type LoadingPageProps = Partial<MediaImageProps> & {
	content?: ReactNode
	extraInfo?: ReactNode
	loadingImg?: ReactNode
}

export * from '@type.d'