import {
	useRef,
	RefObject,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction,
	ComponentProps,
} from 'react'

import TeamAward from './images/TeamAward.svg'
import PersonalAward from './images/PersonalAward.svg'
import ShortListAward from './images/ShortListAward.svg'

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
		<section ref={sectionRef}  className={`w-full xl:h-[879px]`}>
			<div className={`flex items-center justify-center bg-[#3C221B] font-serif font-black text-white xl:h-[170px] xl:text-[60px] xl:leading-[86px]`}>獎項</div>
			<div className={`xl:h-[645px] flex items-center justify-center`}>
				<div className={`grid grid-flow-col xl:w-[1198px] xl:h-[461px] xl:gap-x-[20px]`}>
					<div>
						<div
							ref={teamAwardRef}
							style={{
								backgroundImage: `url(${TeamAward})`
							}}
							className={`relative xl:w-[386px] xl:h-[374.07px]`}
						>
							<div className={`relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center xl:w-[232.41px] xl:h-[61.67px] xl:rounded-[9px] xl:top-[298.25px] xl:text-[30px]`}>$10,000 (3名)</div>
						</div>
						<div className={`font-sans font-normal text-center text-[#3C221B] xl:text-[26px] xl:leading-[38px] xl:mt-[19px]`}>每個關卡各 1 組</div>
					</div>
					<div>
						<div
							ref={personalAwardRef}
							style={{
								backgroundImage: `url(${PersonalAward})`
							}}
							className={`relative xl:w-[386px] xl:h-[373.03px]`}
						>
							<div className={`relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center xl:w-[232.41px] xl:h-[61.5px] xl:rounded-[9px] xl:top-[292.37px] xl:text-[30px] xl:leading-[43.44px]`}>$3000 (6名)</div>
						</div>
						<div className={`font-sans font-normal whitespace-pre text-center text-[#3C221B] xl:text-[26px] xl:leading-[38px]`}>{'每個關卡各 2 名，\n設計 1 名、前端 1 名'}</div>
					</div>
					<div className={`relative xl:w-[386px] xl:h-[461px]`}>
						<div
							ref={shortListAwardRef}
							style={{
								backgroundImage: `url(${ShortListAward})`
							}}
							className={`xl:w-[386px] xl:h-[374.07px]`}
						>
							<div className={`relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center xl:w-[233.02px] xl:h-[61.67px] xl:rounded-[9px] xl:top-[292.18px] xl:text-[30px]`}>數位獎狀(60名)</div>
						</div>
						<div className={`font-sans font-normal whitespace-pre text-center text-[#3C221B] xl:text-[26px] xl:leading-[38px] xl:mt-[11px]`}>{'每個關卡個人組十位\n、團體組十組'}</div>
					</div>
				</div>
			</div>
			<div ref={bottomTextRef}  className={`font-sans font-normal text-center mx-auto text-[#3C221B] xl:w-[396px] xl:h-[52px] xl:leading-[52px] xl:text-[36px] xl:mb-[12px]`}>以上皆提供完賽數位獎狀</div>
		</section>
	)
}

export default forwardRef(AwardInfoBase)