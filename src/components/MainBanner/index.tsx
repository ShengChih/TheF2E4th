import { ComponentProps, ReactNode } from 'react'
import { isDesktop, isTablet } from 'react-device-detect';
import { flatAndPrefixClassName } from '@utils/reduce';

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
			className={`relative bg-no-repeat bg-center bg-cover desktop:w-[1200px] desktop:h-[597px] desktop:w-[902px] desktop:h-[732px] ${className ?? ''}`}
		>
			<div className={
				flatAndPrefixClassName({
					common: ['absolute font-ebgaramond font-bold text-[#38241B] leading-[104px] text-[80px]'],
					desktop: ['w-[313px]', 'h-[90px]', 'left-[56px]', 'top-[51px]'],
					tablet: ['w-[320px]', 'h-[104px]', 'left-[39px]', 'top-[93px]'],
					mobile: []
				})
			}>THE F2E</div>
			<div className={
				flatAndPrefixClassName({
					common: ['rounded-[14px] w-[109px] h-[46px] flex justify-center items-center absolute font-roboto font-bold text-white leading-[40px] text-[34px] bg-[#951205] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'],
					desktop: ['left-[385px]', 'top-[76px]' ],
					tablet: ['left-[368px]', 'top-[118px]'],
					mobile: []
				})
			}>4th</div>
			<div className={
				flatAndPrefixClassName({
					common: ['absolute font-black font-serif text-[#38241B]'],
					desktop: ['w-[343px]', 'h-[180px]', 'leading-[60px]', 'text-[42px]', 'left-[59px]', 'top-[177px]'],
					tablet: ['w-[607px]', 'h-[144px]', 'leading-[72px]', 'text-[50px]', 'left-[39px]', 'top-[183px]'],
					mobile: []
				})
			}>前端工程師和介面設計師，攜手合作拿獎金</div>

			{ BannerImage }
			{ RewardTaskImage }

			{
				isDesktop
					? (<>
					<div className={`absolute font-normal font-sans text-[#38241B] desktop:w-[283px] desktop:h-[140px] desktop:leading-[34.75px] desktop:text-[24px] desktop:left-[59px] desktop:top-[372px]`}>羨慕別人的酷酷網頁動畫？ 滿足不了同事的許願？ 動畫技能樹太雜無從下手？</div>
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
				</>)
				: ''
			}
			
			<ScrollMouseIcon className={`absolute translate-x-[1085px] translate-y-[467px]`} />
		</div>
	)
}