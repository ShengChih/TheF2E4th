import {
	ComponentProps, ForwardRefRenderFunction,
	useRef, useImperativeHandle, forwardRef, RefObject
} from 'react'
import EntireImage from './images/entire.svg'

//const EntireImage = ''

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
			className={`absolute bg-no-repeat bg-center bg-cover desktop:w-[672.3px] desktop:h-[562px] ${className}`}
			ref={el}
		></div>
	)
}

export default forwardRef(Vendetta)