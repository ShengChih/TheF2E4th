import {
	ReactNode,
	ComponentProps, ForwardRefRenderFunction,
	useRef, useImperativeHandle, forwardRef, RefObject
} from 'react'
import MainImage from './images/background.svg'

interface MainVisualProps {
	className?: string
	children: ReactNode | ReactNode[]
}

type MainVisualHandle = {
	getRef: () => RefObject<HTMLDivElement>
}

const MainBannerContainer: ForwardRefRenderFunction<MainVisualHandle, MainVisualProps> = (
	{ className, children }: MainVisualProps,
	forwardref
) => {
	const el = useRef<HTMLDivElement>(null)

	useImperativeHandle(forwardref, () => {
		return {
			getRef: () => {
				return el ?? {}
			}
		}
	}, [])

	return (
		<div
			ref={el}
			style={{
				backgroundImage: `url(${MainImage})`
			}}
			className={`bg-no-repeat bg-cover desktop:h-[720px] ${className ?? ''}`}
		>{children}</div>
	)
}

export default forwardRef(MainBannerContainer)