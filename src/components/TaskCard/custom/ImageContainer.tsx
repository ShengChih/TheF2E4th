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
		<img {...props} className={`absolute ${props.className} xl:right-[34px] xl:top-[16px]`} />
	)
}

export function BlockStudioLogo() {
	return {
		EnterpriseLogo: <ImageContainer
			src={BlockStudioImage}
			className={`md:top-[19px] md:w-[310px] md:h-[65px] xl:w-[327px] xl:h-[69px]`}
		/>,
		TaskLogo: <ImageContainer
			src={ParallaxScrolling}
			className={`xl:w-[313.38px] xl:h-[290px] xl:left-[105.97px] xl:top-[149px]`}
		/>
	}
}

export function KdanLogo() {
	return {
		EnterpriseLogo: <ImageContainer
			src={KdanImage}
			className={`md:top-[17px] md:w-[160px] md:h-[70px] xl:w-[160px] xl:h-[70px]`}
		/>,
		TaskLogo: <ImageContainer
			src={PdfSign}
			className={`xl:w-[259px] xl:h-[312px] xl:left-[160px] xl:top-[138px]`}
		/>
	}
}

export function TitansoftLogo() {
	return {
		EnterpriseLogo: <ImageContainer
			src={TitansoftImage}
			className={`md:top-[27px] md:w-[312px] md:h-[58px] xl:w-[299px] xl:h-[56px]`}
		/>,
		TaskLogo: <ImageContainer
			src={Scrum}
			className={`xl:w-[297px] xl:h-[245px] xl:left-[103px] xl:top-[172px]`}
		/>
	}
}