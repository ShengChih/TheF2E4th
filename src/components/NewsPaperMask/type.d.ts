import {
	RefObject,
  ComponentProps
} from "react"

export type MediaImage = {
	minWidth: number
	imageSrc: string
}

export type NewsPaperProps = ComponentProps<"div"> & {
	aliasName?: string
	mediaImages: MediaImage[]
	imageElementProps?: ComponentProps<"img">
}

export type NewsPaperHandle = {
	getRefObject: () => RefObject<HTMLDivElement>
}