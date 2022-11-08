import { ComponentProps, ReactNode } from 'react'

import ScrollMouseIcon from "@components/ScrollMouseIcon"
import MainImage from './images/background.png'

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
			className={`relative bg-no-repeat bg-center bg-cover desktop:w-[1200px] desktop:h-[597px] ${className ?? ''}`}
		>
			<div className={`absolute font-julian text-[#38241B] desktop:w-[313px] desktop:h-[90px] desktop:text-[80px] desktop:leading-[89.84px] font-medium	left-[56px] top-[51px]`}>THE F2E</div>
			<div className={`absolute font-sans drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#951205] text-white text-[32px] leading-[46.34px] flex justify-center items-center desktop:w-[109px] desktop:h-[46px] desktop:left-[385px] desktop:top-[76px] rounded-[14px]`}>4th</div>
			<div className={`absolute font-black font-serif text-[#38241B] desktop:w-[343px] desktop:h-[180px] desktop:leading-[60.35px] desktop:text-[42px] desktop:left-[59px] desktop:top-[177px]`}>前端工程師和介面設計師，攜手合作拿獎金</div>
			<div className={`absolute font-normal font-sans text-[#38241B] desktop:w-[283px] desktop:h-[140px] desktop:leading-[34.75px] desktop:text-[24px] desktop:left-[59px] desktop:top-[372px]`}>羨慕別人的酷酷網頁動畫？ 滿足不了同事的許願？ 動畫技能樹太雜無從下手？</div>
			{ BannerImage }
			{ RewardTaskImage }
			<div
				style={{
					backgroundImage: '',//`url(${Attendee1158})`
				}}
				className={`flex items-center justify-center flex-wrap absolute text-[#38241B] desktop:w-[294px] desktop:h-[191px] desktop:left-[845px] desktop:top-[215px]`}
			>
				{
					[
						{
							name: '報名總人數',
							amount: '1158',
							unit: '人'
						},
						{
							name: '個人賽人數',
							amount: '1052',
							unit: '人'
						},
						{
							name: '團體賽人數',
							amount: '41',
							unit: '人'
						},
					].map(({ name, amount, unit }, index: number) => (
						<div className={`flex items-center`} key={`attendee-${index}`}>
							<div className={`font-julian desktop:w-[140px] desktop:h-[31px] desktop:text-[28px]`}>{name}</div>
							<div className={`font-ebgaramond text-right desktop:w-[109px] desktop:h-[65px] desktop:text-[50px]`}>{amount}</div>
							<div className={`font-julian desktop:w-[28px] desktop:h-[31px] desktop:text-[28px]`}>{unit}</div>
						</div>
					))
				}
			</div>
			<ScrollMouseIcon className={`absolute translate-x-[1085px] translate-y-[467px]`} />
		</div>
	)
}