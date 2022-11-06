import {
	useRef,
	RefObject,
	forwardRef,
	useImperativeHandle,
	ForwardRefRenderFunction,
	ComponentProps
} from 'react'
import TeamAward from './images/TeamAward.svg'
import PersonalAward from './images/PersonalAward.svg'
import ShortListAward from './images/ShortListAward.svg'

type AwardInfoHandle = {
	getSectionTitleRef: () => RefObject<HTMLDivElement>
	getTeamAwardRef: () => RefObject<HTMLDivElement>
	getPersonalAwardRef: () => RefObject<HTMLDivElement>
	getShortListAwardRef: () => RefObject<HTMLDivElement>
}

type AwardInfoProps = ComponentProps<"section"> 

const AwardInfoBase: ForwardRefRenderFunction<AwardInfoHandle, AwardInfoProps> = (props, forwardref) => {
	const sectionTitleRef = useRef<HTMLDivElement>(null)
	const teamAwardRef = useRef<HTMLDivElement>(null)
	const personalAwardRef = useRef<HTMLDivElement>(null)
	const shortListAwardRef = useRef<HTMLDivElement>(null)

	useImperativeHandle(forwardref, () => {
		return {
			getSectionTitleRef: () => {
				return sectionTitleRef ?? {}
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
		}
	}, [])

	return (
		<section className={`w-full desktop:h-[879px]`}>
			<div ref={sectionTitleRef} className={`flex items-center justify-center bg-[#3C221B] font-serif font-black text-white desktop:h-[170px] desktop:text-[60px] desktop:leading-[86px]`}>獎項</div>
			<div className={`grid grid-flow-col mx-auto desktop:mt-[92px] desktop:w-[1198px] desktop:h-[461px] desktop:gap-x-[20px]`}>
				<div className={`desktop:w-[386px] desktop:h-[461px]`}>
					<div
						ref={teamAwardRef}
						style={{
							backgroundImage: `url(${TeamAward})`
						}}
						className={`relative desktop:w-[386px] desktop:h-[374.07px]`}
					>
						<div className={`relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center desktop:w-[232.41px] desktop:h-[61.67px] desktop:rounded-[9px] desktop:top-[298.25px] desktop:text-[30px]`}>$10,000 (3名)</div>
					</div>
					<div className={`font-sans font-normal text-center text-[#3C221B] desktop:text-[26px] desktop:leading-[38px] desktop:mt-[19px]`}>每個關卡各 1 組</div>
				</div>
				<div className={`desktop:w-[386px] desktop:h-[461px]`}>
					<div
						ref={personalAwardRef}
						style={{
							backgroundImage: `url(${PersonalAward})`
						}}
						className={`relative desktop:w-[386px] desktop:h-[373.03px]`}
					>
						<div className={`relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center desktop:w-[232.41px] desktop:h-[61.5px] desktop:rounded-[9px] desktop:top-[292.37px] desktop:text-[30px] desktop:leading-[43.44px]`}>$3000 (6名)</div>
					</div>
					<div className={`font-sans font-normal whitespace-pre text-center text-[#3C221B] desktop:text-[26px] desktop:leading-[38px]`}>{'每個關卡各 2 名，\n設計 1 名、前端 1 名'}</div>
				</div>
				<div className={`relative desktop:w-[386px] desktop:h-[461px]`}>
					<div
						ref={shortListAwardRef}
						style={{
							backgroundImage: `url(${ShortListAward})`
						}}
						className={`desktop:w-[386px] desktop:h-[374.07px]`}
					>
						<div className={`relative mx-auto shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-bold font-sans bg-[#951205] text-white flex items-center justify-center desktop:w-[233.02px] desktop:h-[61.67px] desktop:rounded-[9px] desktop:top-[292.18px] desktop:text-[30px]`}>數位獎狀(60名)</div>
					</div>
					<div className={`font-sans font-normal text-center text-[#3C221B] desktop:text-[26px] desktop:leading-[38px] desktop:mt-[11px]`}>{'每個關卡個人組十位\n、團體組十組'}</div>
				</div>
			</div>
			<div className={`font-sans font-normal text-center mx-auto text-[#3C221B] desktop:w-[396px] desktop:h-[52px] desktop:leading-[52px] desktop:text-[36px] desktop:mt-[92px] desktop:mb-[12px]`}>以上皆提供完賽數位獎狀</div>
		</section>
	)
}

export default forwardRef(AwardInfoBase)