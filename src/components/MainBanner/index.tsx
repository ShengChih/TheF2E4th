import { ComponentProps, ReactNode } from 'react'

import MainImage from './images/background.png'
import MainTitle from './images/title.svg'
import Attendee1158 from './images/1158.svg'
import Attendee1052 from './images/1052.svg'
import Attendee41 from './images/41.svg'


type MainBannerProps = Pick<ComponentProps<"div">, "className"> & {
	BannerImage?: ReactNode
	RewardTaskImage?: ReactNode
}

export default function MainBanner({
	BannerImage,
	RewardTaskImage,
	className
}: MainBannerProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${MainImage})`
			}}
			className={`desktop:w-[1200px] desktop:h-[597px] relative bg-no-repeat bg-center bg-contain ${className ?? ''}`}
		>
			<div className={`absolute font-julian text-[#38241B] desktop:w-[313px] desktop:h-[90px] desktop:text-[80px] desktop:leading-[89.84px] font-medium	left-[56px] top-[51px]`}>THE F2E</div>
			<div className={`absolute font-sans drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#951205] text-white text-[32px] leading-[46.34px] flex justify-center items-center desktop:w-[109px] desktop:h-[46px] desktop:left-[385px] desktop:top-[76px] rounded-[14px]`}>4th</div>
			<div className={`absolute font-black font-serif text-[#38241B] desktop:w-[343px] desktop:h-[180px] desktop:leading-[60.35px] desktop:text-[42px] desktop:left-[59px] desktop:top-[177px]`}>前端工程師和介面設計師，攜手合作拿獎金</div>
			<div className={`absolute font-normal font-sans text-[#38241B] desktop:w-[283px] desktop:h-[140px] desktop:leading-[34.75px] desktop:text-[24px] desktop:left-[59px] desktop:top-[372px]`}>羨慕別人的酷酷網頁動畫？ 滿足不了同事的許願？ 動畫技能樹太雜無從下手？</div>
			{ BannerImage }
			<div
				style={{
					backgroundImage: `url(${MainTitle})`
				}}
				className={`absolute bg-no-repeat bg-center desktop:w-[554px] desktop:h-[79px] desktop:left-[366px] desktop:top-[498px]`}
			></div>
			{ RewardTaskImage }
			<div
				style={{
					backgroundImage: `url(${Attendee1158})`
				}}
				className={`absolute bg-no-repeat bg-left-top	 desktop:w-[302px] desktop:h-[56px] desktop:left-[845px] desktop:top-[207px]`}
			></div>
			<div
				style={{
					backgroundImage: `url(${Attendee1052})`
				}}
				className={`absolute bg-no-repeat bg-left-top	 desktop:w-[302px] desktop:h-[56px] desktop:left-[845px] desktop:top-[271px]`}
			></div>
			<div
				style={{
					backgroundImage: `url(${Attendee41})`
				}}
				className={`absolute bg-no-repeat bg-left-top	 desktop:w-[302px] desktop:h-[56px] desktop:left-[845px] desktop:top-[335px]`}
			></div>
		</div>
	)
}