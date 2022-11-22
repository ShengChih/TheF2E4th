import { ComponentProps } from 'react'

export type MediaImage = {
  minWidth: number
  imageSrc: string
}

export type MultipleImageSourcesProps = {
  aliasName?: string
  mediaImages: MediaImage[]
  imageElementProps?: ComponentProps<'img'>
  pictureElementProps?: ComponentProps<'picture'>
}

export type MediaImageProps = ComponentProps<'div'> & MultipleImageSourcesProps

export type CallbackFunctionVariadicAnyReturn = (...args: unknown[]) => unknown

export type Position = {
  x: number
  y: number
}

export type Box = {
  width: number
  height: number
}

export type Nullable<T> = T | null

export type DictObject = {
  [key: string]: unknown
}
