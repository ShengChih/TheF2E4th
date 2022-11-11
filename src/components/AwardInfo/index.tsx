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
		<section ref={sectionRef}  className={`w-full md:h-[1160px] xl:h-[879px]`}>
			<SectionTitle className={`animate-fade-in items-center md:h-[114px] xl:h-[170px]`} title={`獎項`} />
			<div className={flatClassName({
				common: `flex items-center justify-center`,
				desktop: `xl:h-[709px]`,
				tablet: ``,
				mobile: ``
			})}>
				<div className={
					flatClassName({
						common: `grid grid-flow-row grid-cols-3 relative`,
						desktop: `xl:w-[1198px] xl:h-[605px] xl:gap-x-[20px] xl:mt-[92px] xl:mb-[12px]`,
						tablet: `md:h-[432px]`,
						mobile: ``
					})}
				>

					<div className={`flex flex-wrap items-center justify-center xl:w-[386px] xl:h-[461px]`}>
						<div
							ref={teamAwardRef}
							style={{
								backgroundImage: `url(${TeamAward})`
							}}
							className={
								flatClassName({
									desktop: `xl:w-[386px] xl:h-[374px]`,
								})}
						>
							<div className={
								flatClassName({
									common: `relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center`,
									desktop: `xl:w-[232.41px] xl:h-[61.67px] xl:rounded-[9px] xl:top-[298.25px] xl:text-[30px]`,
									tablet: ``
								})}
							>$10,000 (3名)</div>
						</div>
						<div className={
							flatClassName({
								common: `flex items-center font-sans font-normal text-[#3C221B]`,
								desktop: `xl:h-[87px] xl:text-[26px] xl:leading-[38px]`,
								tablet: ``
							})}
						>每個關卡各 1 組</div>
					</div>

					<div className={flatClassName({
						common: `flex flex-wrap items-center justify-center`,
						desktop: `xl:w-[386px] xl:h-[461px]`
					})}>
						<div
							ref={personalAwardRef}
							style={{
								backgroundImage: `url(${PersonalAward})`
							}}
							className={flatClassName({
								common: ``,
								desktop: `xl:w-[386px] xl:h-[373px]`,
								tablet: ``,
							})}
						>
							<div className={flatClassName({
								common: `relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center`,
								desktop: `xl:w-[232.41px] xl:h-[61.5px] xl:rounded-[9px] xl:top-[292.37px] xl:text-[30px] xl:leading-[43.44px]`,
								tablet: ``,
								mobile: ``
							})}>$3000 (6名)</div>
						</div>
						<div className={flatClassName({
							common: `flex items-center font-sans font-normal whitespace-pre text-[#3C221B]`,
							desktop: `xl:h-[87px] xl:text-[26px] xl:leading-[38px]`,
							tablet: ``,
							mobile: ``
						})}>{'每個關卡各 2 名，\n設計 1 名、前端 1 名'}</div>
					</div>

					<div className={flatClassName({
						common: `flex flex-wrap items-center justify-center`,
						desktop: `xl:w-[386px] xl:h-[461px]`
					})}>
						<div
							ref={shortListAwardRef}
							style={{
								backgroundImage: `url(${ShortListAward})`
							}}
							className={flatClassName({
								common: ``,
								desktop: `xl:w-[386px] xl:h-[373px]`,
								tablet: ``,
								mobile: ``
							})}
						>
							<div className={flatClassName({
								common: `relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center`,
								desktop: `xl:w-[233.02px] xl:h-[61.67px] xl:rounded-[9px] xl:top-[292.18px] xl:text-[30px]`,
								tablet: ``,
								mobile: ``
							})}>數位獎狀(60名)</div>
						</div>
						<div className={flatClassName({
							common: `flex items-center font-sans font-normal whitespace-pre text-[#3C221B]`,
							desktop: `xl:h-[87px] xl:text-[26px] xl:leading-[38px]`,
							tablet: ``,
							mobile: ``
						})}>{'每個關卡個人組十位\n、團體組十組'}</div>
					</div>

					<div ref={bottomTextRef} className={
						flatClassName({
							common: `font-sans font-normal text-center mx-auto text-[#3C221B] h-fit`,
							desktop: `xl:absolute xl:bottom-[0px] xl:col-span-3 xl:w-full xl:leading-[52px] xl:text-[36px] `,
							tablet: ``,
							mobile: ``,
						})}
					>以上皆提供完賽數位獎狀</div>
				</div>
			</div>
		</section>
	)
}

export default forwardRef(AwardInfoBase)