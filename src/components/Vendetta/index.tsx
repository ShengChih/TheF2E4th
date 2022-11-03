import {
	ComponentProps, ForwardRefRenderFunction,
	useRef, useImperativeHandle, forwardRef, RefObject
} from 'react'
import EntireImage from './images/entire.svg'

type VendettaProps = ComponentProps<"div"> 

type VendettaHandle = {
	getRef: () => RefObject<HTMLDivElement>
}

const Vendetta: ForwardRefRenderFunction<VendettaHandle, VendettaProps> = ({ className }:VendettaProps, forwardref) => {
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
			style={{
				backgroundImage: `url(${EntireImage})`
			}}
			className={`relative desktop:w-[632.89px] desktop:h-[529.05px] ${className}`}
			ref={el}
		></div>
	)
}

export default forwardRef(Vendetta)