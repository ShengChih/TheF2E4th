import {
	ComponentProps, ForwardRefRenderFunction,
	useRef, useImperativeHandle, forwardRef, RefObject
} from 'react'
import { flatAndPrefixClassName } from '@utils/reduce'
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
			className={
				flatAndPrefixClassName({
					common: `absolute bg-no-repeat bg-center bg-cover`,
					desktop: ['w-[672.3px]', 'h-[562px]'],
					tablet: ['mt-[28px]', 'desktop:mb-[32px]'],
				}) + `${className}`
			}
			ref={el}
		>
			<div className={'relative grid grid-flow-row grid-cols-2 gap-x-[22px] h-[73px] left-[50px] top-[461px] w-[560.86px]'}>
				<div className={`flex desktop:w-[254.43px]`}>
					<div className={`font-sans text-white desktop:leading-[41px] desktop:text-[28px] desktop:w-[84px] desktop:pt-[23px] desktop:pb-[9px]`}>個人獎</div>
					<div className={`font-ebgaramond font-bold text-[#951205] desktop:ml-[8.43px] desktop:leading-[73px] desktop:w-[162px] desktop:text-[56px]`}>$3,000</div>
				</div>
				<div className={`flex desktop:w-[284.43px]`}>
					<div className={`font-sans text-white desktop:leading-[41px] desktop:text-[28px] desktop:w-[84px] desktop:pt-[23px] desktop:pb-[9px]`}>團體獎</div>
					<div className={`font-ebgaramond font-bold text-[#951205] desktop:ml-[8.43px] desktop:leading-[73px] desktop:w-[192px] desktop:text-[56px]`}>$10,000</div>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(Vendetta)