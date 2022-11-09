import { ComponentProps } from "react";
import BlockStudioImage from '../images/BlockStudioLogo.svg'
import ParallaxScrolling from '../images/ParallaxScrolling.svg'
import KdanImage from '../images/KdanLogo.svg'
import PdfSign from '../images/PdfSign.svg'
import Scrum from '../images/Scrum.svg'
import TitansoftImage from '../images/TitansoftLogo.svg'

type ImageProps = ComponentProps<"img">

function ImageContainer(props: ImageProps) {
	return (
		<img {...props} className={`absolute xl:right-[34px] xl:top-[16px] ${props.className}`} />
	)
}

export function BlockStudioLogo() {
	return {
		TaskLogo: <ImageContainer
			src={BlockStudioImage}
			className={`xl:w-[327px] xl:h-[69px]`}
		/>,
		EnterpriseLogo: <ImageContainer
			src={ParallaxScrolling}
			className={`xl:w-[313.38px] xl:h-[290px] xl:left-[105.97px] xl:top-[149px]`}
		/>
	}
}

export function KdanLogo() {
	return {
		TaskLogo: <ImageContainer
			src={KdanImage}
			className={`xl:w-[160px] xl:h-[70px]`}
		/>,
		EnterpriseLogo: <ImageContainer
			src={PdfSign}
			className={`xl:w-[259px] xl:h-[312px] xl:left-[160px] xl:top-[138px]`}
		/>
	}
}

export function TitansoftLogo() {
	return {
		TaskLogo: <ImageContainer
			src={TitansoftImage}
			className={`xl:w-[299px] xl:h-[56px]`}
		/>,
		EnterpriseLogo: <ImageContainer
			src={Scrum}
			className={`xl:w-[297px] xl:h-[245px] xl:left-[103px] xl:top-[172px]`}
		/>
	}
}