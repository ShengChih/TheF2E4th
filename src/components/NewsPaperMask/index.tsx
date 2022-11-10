import {
  useRef,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction,
} from "react"
import { MediaImageProps as NewsPaperProps, NewsPaperHandle, MediaImage } from './type.d'
import { gsap, ScrollTrigger } from "@animations/gsap"

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
			initTimelineScroller: (config: ScrollTrigger.Vars) => {
				return gsap.effects.timelineScroller(NewsPaperRef.current, config)
			},
			initTimelineLocation: (tl: gsap.core.Timeline, vars: gsap.TweenVars, position?: gsap.Position) => {
				return tl.set(NewsPaperRef.current, vars, position).to(NewsPaperRef.current, vars)
			},
			moveAnimation: (tl: gsap.core.Timeline, fromVars: gsap.TweenVars, toVars: gsap.TweenVars, position?: gsap.Position) => {
				return tl.fromTo(NewsPaperRef.current, fromVars, toVars, position)
			},
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