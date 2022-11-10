import {
	RefObject,
  ComponentProps
} from "react"

export type MediaImage = {
	minWidth: number
	imageSrc: string
}

export type MediaImageProps = ComponentProps<"div"> & {
	aliasName?: string
	mediaImages: MediaImage[]
	imageElementProps?: ComponentProps<"img">
	pictureElementProps?: ComponentProps<"picture">
}