import {
	RefObject,
	ComponentProps,
	ReactNode
} from "react"

export type MediaImage = {
	minWidth: number
	imageSrc: string
}

export type MultipleImageSourcesProps = {
	aliasName?: string
	mediaImages: MediaImage[]
	imageElementProps?: ComponentProps<"img">
	pictureElementProps?: ComponentProps<"picture">
}

export type MediaImageProps = ComponentProps<"div"> & MultipleImageSourcesProps

export type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;