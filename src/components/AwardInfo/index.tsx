import {
	useRef,
	RefObject,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction,
	ComponentProps,
} from 'react'

import { flatClassName } from '@utils/reduce'
import TeamAward from './images/TeamAward.svg'
import PersonalAward from './images/PersonalAward.svg'
import ShortListAward from './images/ShortListAward.svg'
import SectionTitle from '@components/SectionTitle'


type AwardInfoHandle = {
	getSectionRef: () => RefObject<HTMLElement>
	getTeamAwardRef: () => RefObject<HTMLDivElement>
	getPersonalAwardRef: () => RefObject<HTMLDivElement>
	getShortListAwardRef: () => RefObject<HTMLDivElement>
	getBottomTextRef: () => RefObject<HTMLDivElement>
}

type AwardInfoProps = ComponentProps<"section"> 

const AwardInfoBase: ForwardRefRenderFunction<AwardInfoHandle, AwardInfoProps> = (props, forwardref) => {
	const sectionRef = useRef<HTMLElement>(null)
	const teamAwardRef = useRef<HTMLDivElement>(null)
	const personalAwardRef = useRef<HTMLDivElement>(null)
	const shortListAwardRef = useRef<HTMLDivElement>(null)
	const bottomTextRef = useRef<HTMLDivElement>(null)

	useImperativeHandle(forwardref, () => {
		return {
			getSectionRef: () => {
				return sectionRef ?? {}
			},
			getTeamAwardRef: () => {
				return teamAwardRef ?? {}
			},
			getPersonalAwardRef: () => {
				return personalAwardRef ?? {}
			},
			getShortListAwardRef: () => {
				return shortListAwardRef ?? {}
			},
			getBottomTextRef: () => {
				return bottomTextRef ?? {}
			}
		}
	}, [])

	return (
		<section ref={sectionRef} className={flatClassName({
			common: `w-full `,
			desktop: `xl:h-[879px]`,
			tablet: `md:h-[1160px]`,
			mobile: `sm:h-[1724px]`
		})}>
			<SectionTitle className={flatClassName({
				common: `animate-fade-in items-center`,
				desktop: `xl:h-[170px]`,
				tablet: `md:h-[114px]`,
				mobile: `sm:h-[114px]`
			})} title={`獎項`} />
			<div className={flatClassName({
				common: `flex items-center justify-center`,
				desktop: `xl:h-[709px]`,
				tablet: `md:h-[1046px]`,
				mobile: `sm:h-[1610px]`
			})}>
				<div className={
					flatClassName({
						common: `grid grid-flow-row  relative`,
						desktop: `xl:grid-cols-3 xl:w-[1198px] xl:h-[605px] xl:gap-x-[20px] xl:mt-[92px] xl:mb-[12px]`,
						tablet: `md:grid-cols-2 md:grid-rows-2 md:w-[694px] md:h-[914px] md:gap-x-[8px] md:gap-y-[50px] md:mt-[38px] md:mb-[106.6px]`,
						mobile: `sm:grid-cols-1 sm:w-[343px] sm:h-[1465.6px] sm:gap-y-[26px] sm:mt-[39px] sm:mb-[118px]`
					})}
				>

					<div className={flatClassName({
						common: `flex flex-wrap items-center justify-center`,
						desktop: `xl:w-[386px] xl:h-[461px]`,
						tablet: `md:w-[343px] md:h-[432px]`,
						mobile: `sm:w-[343px] sm:h-[432px]`
					})}>
						<div
							ref={teamAwardRef}
							style={{
								backgroundImage: `url(${TeamAward})`
							}}
							className={
								flatClassName({
									desktop: `xl:w-[386px] xl:h-[374px]`,
									tablet: `md:bg-contain md:w-[343px] md:h-[332.4px]`,
									mobile: `sm:bg-contain sm:w-[343px] sm:h-[332.4px]`
								})}
						>
							<div className={
								flatClassName({
									common: `rounded-[9px] relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center`,
									desktop: `xl:w-[232.41px] xl:h-[61.67px] xl:top-[298.25px] xl:text-[30px] xl:leading-[43px]`,
									tablet: `md:w-[206.52px] md:h-[54.8px] md:top-[265.02px] md:text-[26px] md:leading-[38px]`,
									mobile: `sm:w-[206.52px] sm:h-[54.8px] sm:top-[265.02px] sm:text-[26px] sm:leading-[38px]`
								})}
							>$10,000 (3名)</div>
						</div>
						<div className={
							flatClassName({
								common: `flex items-center font-sans font-normal text-[#3C221B] text-[26px] leading-[38px]`,
								desktop: `xl:h-[87px] `,
								tablet: `md:h-[99.6px]`,
								mobile: `sm:h-[99.6px]`,
							})}
						>每個關卡各 1 組</div>
					</div>

					<div className={flatClassName({
						common: `flex flex-wrap items-center justify-center`,
						desktop: `xl:w-[386px] xl:h-[461px]`,
						tablet: `md:w-[343px] md:h-[432px]`,
						mobile: `sm:w-[343px] sm:h-[432px]`
					})}>
						<div
							ref={personalAwardRef}
							style={{
								backgroundImage: `url(${PersonalAward})`
							}}
							className={flatClassName({
								common: ``,
								desktop: `xl:w-[386px] xl:h-[373px]`,
								tablet: `md:bg-contain md:w-[343px] md:h-[332.4px]`,
								mobile: `sm:bg-contain sm:w-[343px] sm:h-[332.4px]`,
							})}
						>
							<div className={flatClassName({
								common: `rounded-[9px] relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center`,
								desktop: `xl:w-[232.41px] xl:h-[61.5px] xl:top-[292.37px] xl:text-[30px] xl:leading-[43.44px]`,
								tablet: `md:w-[206.52px] md:h-[54.8px] md:top-[265.02px] md:text-[26px] md:leading-[38px]`,
								mobile: `sm:w-[206.52px] sm:h-[54.8px] sm:top-[265.02px] sm:text-[26px] sm:leading-[38px]`
							})}>$3000 (6名)</div>
						</div>
						<div className={flatClassName({
							common: `flex items-center font-sans font-normal whitespace-pre text-[#3C221B] text-[26px] leading-[38px]`,
							desktop: `xl:h-[87px]`,
							tablet: `md:h-[99.6px]`,
							mobile: `sm:h-[99.6px]`
						})}>{'每個關卡各 2 名，\n設計 1 名、前端 1 名'}</div>
					</div>

					<div className={flatClassName({
						common: `flex flex-wrap items-center justify-center`,
						desktop: `xl:w-[386px] xl:h-[461px]`,
						tablet: `md:w-[343px] md:h-[432px]`,
						mobile: `sm:w-[343px] sm:h-[432px]`
					})}>
						<div
							ref={shortListAwardRef}
							style={{
								backgroundImage: `url(${ShortListAward})`
							}}
							className={flatClassName({
								common: ``,
								desktop: `xl:w-[386px] xl:h-[373px]`,
								tablet: `md:bg-contain md:w-[343px] md:h-[332.4px]`,
								mobile: `sm:bg-contain sm:w-[343px] sm:h-[332.4px]`
							})}
						>
							<div className={flatClassName({
								common: `rounded-[9px] relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center`,
								desktop: `xl:w-[233.02px] xl:h-[61.67px] xl:top-[292.18px] xl:text-[30px]`,
								tablet: `md:w-[206.52px] md:h-[54.8px] md:top-[265.02px] md:text-[26px] md:leading-[38px]`,
								mobile: `sm:w-[206.52px] sm:h-[54.8px] sm:top-[265.02px] sm:text-[26px] sm:leading-[38px]`
							})}>數位獎狀(60名)</div>
						</div>
						<div className={flatClassName({
							common: `flex items-center text-center font-sans font-normal whitespace-pre text-[#3C221B] text-[26px] leading-[38px]`,
							desktop: `xl:h-[87px]`,
							tablet: `md:h-[99.6px]`,
							mobile: `sm:h-[99.6px]`
						})}>{'每個關卡個人組十位\n、團體組十組'}</div>
					</div>

					<div ref={bottomTextRef} className={
						flatClassName({
							common: `font-sans font-normal text-center mx-auto text-[#3C221B] h-fit`,
							desktop: `xl:absolute xl:bottom-[0px] xl:col-span-3 xl:w-full xl:leading-[52px] xl:text-[36px] `,
							tablet: `md:flex md:items-center md:w-[343px] md:h-[432px] md:text-[44px] md:leading-[64px]`,
							mobile: `sm:flex sm:items-center sm:w-[343px] sm:h-[43px] sm:text-[30px] sm:leading-[43px] sm:mt-[48.6px]`,
						})}
					>以上皆提供完賽數位獎狀</div>
				</div>
			</div>
		</section>
	)
}

export default forwardRef(AwardInfoBase)