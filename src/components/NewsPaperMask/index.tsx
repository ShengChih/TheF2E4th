import {
  useRef,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction,
} from "react"
import { MediaImageProps as NewsPaperProps, NewsPaperHandle, MediaImage } from './type.d'

const NewsPaper: ForwardRefRenderFunction<NewsPaperHandle, NewsPaperProps> = ({
	aliasName,
	mediaImages,
	imageElementProps,
	...props
}, forwardref) => {
	const NewsPaperRef = useRef<HTMLDivElement>(null)
	const SourceElements = mediaImages.map(({
		minWidth, imageSrc
	}: MediaImage, index: number) => (
		<source key={`${aliasName ?? ''}${index}`} media={`(min-width: ${minWidth}px)`} srcSet={`${imageSrc}`}></source>
	))

	useImperativeHandle(forwardref, () => {
		return {
			getRefObject: () => {
				return NewsPaperRef ?? {}
			}
		}
	}, [])

	return (
		<div
			ref={NewsPaperRef}
			{...props}
		>
			<picture>
				{ SourceElements }
				<img { ...imageElementProps } />
			</picture>
		</div>
	)
}

export default forwardRef(NewsPaper);