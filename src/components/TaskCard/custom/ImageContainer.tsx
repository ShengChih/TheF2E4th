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
		<img {...props} className={`absolute desktop:right-[34px] desktop:top-[16px] ${props.className}`} />
	)
}

export function BlockStudioLogo() {
	return {
		TaskLogo: <ImageContainer
			src={BlockStudioImage}
			className={`desktop:w-[327px] desktop:h-[69px]`}
		/>,
		EnterpriseLogo: <ImageContainer
			src={ParallaxScrolling}
			className={`desktop:w-[313.38px] desktop:h-[290px] desktop:left-[105.97px] desktop:top-[149px]`}
		/>
	}
}

export function KdanLogo() {
	return {
		TaskLogo: <ImageContainer
			src={KdanImage}
			className={`desktop:w-[160px] desktop:h-[70px]`}
		/>,
		EnterpriseLogo: <ImageContainer
			src={PdfSign}
			className={`desktop:w-[259px] desktop:h-[312px] desktop:left-[160px] desktop:top-[138px]`}
		/>
	}
}

export function TitansoftLogo() {
	return {
		TaskLogo: <ImageContainer
			src={TitansoftImage}
			className={`desktop:w-[299px] desktop:h-[56px]`}
		/>,
		EnterpriseLogo: <ImageContainer
			src={Scrum}
			className={`desktop:w-[297px] desktop:h-[245px] desktop:left-[103px] desktop:top-[172px]`}
		/>
	}
}