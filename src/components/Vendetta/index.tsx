import {
	ComponentProps, ForwardRefRenderFunction,
	useRef, useImperativeHandle, forwardRef, RefObject
} from 'react'
import { flatClassName } from '@utils/reduce'
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
				flatClassName({
					common: `absolute bg-no-repeat bg-center bg-cover w-[672.27px] h-[562px]`
				}) + `${className}`
			}
			ref={el}
		>
			<div className={'relative grid grid-flow-row grid-cols-2 gap-x-[22px] h-[73px] left-[50px] top-[461px] w-[560.86px]'}>
				<div className={`flex xl:w-[254.43px]`}>
					<div className={`font-sans text-white xl:leading-[41px] xl:text-[28px] xl:w-[84px] xl:pt-[23px] xl:pb-[9px]`}>個人獎</div>
					<div className={`font-ebgaramond font-bold text-[#951205] xl:ml-[8.43px] xl:leading-[73px] xl:w-[162px] xl:text-[56px]`}>$3,000</div>
				</div>
				<div className={`flex xl:w-[284.43px]`}>
					<div className={`font-sans text-white xl:leading-[41px] xl:text-[28px] xl:w-[84px] xl:pt-[23px] xl:pb-[9px]`}>團體獎</div>
					<div className={`font-ebgaramond font-bold text-[#951205] xl:ml-[8.43px] xl:leading-[73px] xl:w-[192px] xl:text-[56px]`}>$10,000</div>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(Vendetta)