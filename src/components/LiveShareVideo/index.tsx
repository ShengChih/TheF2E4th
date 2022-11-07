import React, { useCallback, useState, MouseEvent, ReactNode } from 'react'
import SectionTitle from '@components/SectionTitle'
import BackgroundImage from './images/BackgroundImage.svg'
import BlockStudioSpeaker from './images/BlockStudioSpeaker1x.png'
import LeoSpeaker from './images/LeoSpeaker1x.png'
import DraggableSpeaker from './images/DraggableSpeaker1x.png'
import CreativeSpeaker from './images/CreativeSpeaker1x.png'
import NameBgImage from './images/NameBgImage1x.png'
import PlayAction from './images/PlayAction.svg'

interface ShareSpeakerCardProps {
	SubjectStyle: string
	SubjectTitle: string
	SpeakerImage: string
	SpeakerInfo: string
	SpeakerTitleStyle: string
	SpeakerTitle: string
	ActivityPeriodsStyle: string
	ActivityInfo: string
	VideoLink?: string
}

interface LiveShareState {
	displayCard: boolean
}

const initState = {
	displayCard: false
}

const ShareSpeakerCard = React.memo(({
	SubjectStyle,
	SubjectTitle,
	SpeakerImage,
	SpeakerInfo,
	SpeakerTitleStyle,
	SpeakerTitle,
	ActivityPeriodsStyle,
	ActivityInfo,
	VideoLink
}: ShareSpeakerCardProps) => {
	const go2Link = VideoLink ? () => {
		window.open(VideoLink, "_blank")
	} : undefined

	return (
		<div 
			style={{
				backgroundImage: `url(${BackgroundImage})`
			}}
			className={`relative flex flex-col desktop:w-[522px] h-[738.5px]`}
		>
			<div className={`text-center font-serif font-black mx-auto ${SubjectStyle}`}>{SubjectTitle}</div>
			<div
				onClick={go2Link}
				className={`relative mx-auto desktop:w-[341.48px] desktop:h-[468.35px]`}
			>
				<img src={SpeakerImage} alt={SpeakerInfo} />
				<div
					style={{
						backgroundImage: `url(${PlayAction})`
					}}
					className={`bg-no-repeat bg-center absolute border-white bg-[#38241B]/[.6] desktop:w-[107.03px] desktop:h-[107.03px] desktop:border-4 desktop:rounded-[97px] desktop:left-[120px] desktop:top-[180px]`}
				></div>
				<div className={`font-roboto flex items-center justify-center absolute bg-[#951205] text-white desktop:text-[28px] desktop:w-[104px] desktop:h-[53px] desktop:font-medium desktop:left-[229px] desktop:top-[25px] desktop:leading-[67px]`}>LIVE</div>
				<div
					style={{
						backgroundImage: `url(${NameBgImage})`
					}}
					className={`absolute flex items-center desktop:w-[259px] desktop:h-[66px] desktop:top-[428px] desktop:left-[41px]`}
				>
					<div className={`relative whitespace-pre text-center text-white font-sans font-bold ${SpeakerTitleStyle}`}>{SpeakerTitle}</div>
				</div>
			</div>
			<div className={`relative font-roboto font-black text-center text-[#38241B] ${ActivityPeriodsStyle}`}>{ActivityInfo}</div>
		</div>
	)
})

const liveShares = [
	{
		SubjectStyle: `desktop:text-[57px] desktop:leading-[62px] desktop:mt-[47.68px] desktop:mb-[45.32px] desktop:w-[402.39px] desktop:h-[62px]`,
		SubjectTitle: `網站的動態趨勢`,
		SpeakerImage: BlockStudioSpeaker,
		SpeakerInfo: `李明-版塊設計創辦人兼總監`,
		SpeakerTitleStyle: `desktop:text-[20px] desktop:leading-[26px] desktop:w-[200px] desktop:h-[52px] desktop:left-[35px]`,
		SpeakerTitle: '李明\n版塊設計創辦人兼總監',
		ActivityPeriodsStyle: `desktop:text-[35px] desktop:leading-[67px] desktop:ml-[57px] desktop:mt-[28.65px] desktop:w-[402.39px] desktop:h-[58.74px]`,
		ActivityInfo: `11/03(四)20:00 ~ 21:30`,
		VideoLink: `https://www.youtube.com/watch?v=9gzDFKTIFB4`
	},
	{
		SubjectStyle: `desktop:text-[49px] desktop:leading-[62px] desktop:mt-[20.68px] desktop:mb-[16.84px] desktop:w-[402.39px] desktop:h-[117.47px]`,
		SubjectTitle: `jQuery 也可以做到的互動效果`,
		SpeakerImage: LeoSpeaker,
		SpeakerInfo: `Leo-Angular Taiwan 傳教士`,
		SpeakerTitleStyle: `desktop:text-[20px] desktop:leading-[26px] desktop:w-[217px] desktop:h-[52px] desktop:left-[27px]`,
		SpeakerTitle: 'Leo\nAngular Taiwan 傳教士',
		ActivityPeriodsStyle: `desktop:text-[35px] desktop:leading-[67px] desktop:ml-[57px] desktop:mt-[28.65px] desktop:mb-[45.32px] desktop:w-[402.39px] desktop:h-[58.74px]`,
		ActivityInfo: `11/10(四)20:00 ~ 21:30`,
	},
	{
		SubjectStyle: `desktop:text-[46px] desktop:leading-[62px] desktop:mt-[20.68px] desktop:mb-[16.84px] desktop:w-[402.39px] desktop:h-[117.47px]`,
		SubjectTitle: `網頁可以拖拖拉拉draggable.js 介紹`,
		SpeakerImage: DraggableSpeaker,
		SpeakerInfo: `邱繼緯-前端工程師`,
		SpeakerTitleStyle: `desktop:text-[20px] desktop:leading-[26px] desktop:w-[100px] desktop:h-[52px] desktop:left-[85px]`,
		SpeakerTitle: '邱繼緯\n前端工程師',
		ActivityPeriodsStyle: `desktop:text-[35px] desktop:leading-[67px] desktop:ml-[57px] desktop:mt-[28.65px] desktop:w-[402.39px] desktop:h-[58.74px]`,
		ActivityInfo: `11/17(四)20:00 ~ 21:30`,
	},
	{
		SubjectStyle: `desktop:text-[44px] desktop:leading-[62px] desktop:mt-[20.68px] desktop:mb-[16.84px] desktop:w-[402.39px] desktop:h-[117.47px]`,
		SubjectTitle: `互動式網頁設計工程師該具備哪些技能？`,
		SpeakerImage: CreativeSpeaker,
		SpeakerInfo: `吳哲宇-墨雨互動設計 創辦人`,
		SpeakerTitleStyle: `desktop:text-[20px] desktop:leading-[26px] desktop:w-[185px] desktop:h-[52px] desktop:left-[43px]`,
		SpeakerTitle: '吳哲宇\n墨雨互動設計 創辦人',
		ActivityPeriodsStyle: `desktop:text-[35px] desktop:leading-[67px] desktop:ml-[57px] desktop:mt-[28.65px] desktop:w-[402.39px] desktop:h-[58.74px]`,
		ActivityInfo: `11/24(四)20:00 ~ 21:30`,
	}
]

type ClickBlockProps = {
	handleClick: (e: MouseEvent<HTMLDivElement>) => void
}

const ClickBlock = React.memo(({ handleClick }: ClickBlockProps) => (
	<div
		onClick={handleClick}
		className={`font-serif font-black mx-auto text-center text-[#3C221B] desktop:leading-[103px] desktop:text-[72px] desktop:mt-[215px] desktop:w-[504px] desktop:h-[245px]`}
	>
		意想不到的好康
		<span className={`text-[#951205]`}>請點擊</span>
	</div>
))

type LiveShareVideoProps = {
	children?: ReactNode | ReactNode[]
}
	
export default function LiveShareVideo({ children }: LiveShareVideoProps) {
	const [state, setState] = useState<LiveShareState>(initState)

	const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
		setState({
			displayCard: true
		})
	}, [])

	return (
		state.displayCard ?
			(
				<>
					<SectionTitle className={`animate-fade-in items-center desktop:h-[170px]`} title={`各界大神直播分享`} />
					<div className={`mx-auto flex items-center justify-center desktop:w-[1280px] desktop:h-[1656px]`}>
						<div className={`animate-fade-in grid grid-flow-row grid-cols-2 mx-auto  desktop:w-[1064px] desktop:h-[1529px] desktop:gap-x-[20px] desktop:gap-y-[52px]`}>
							{
								liveShares.map(
									(speaker, index: number) => (
										<ShareSpeakerCard {...speaker} key={`speaker-${index}`} />
									)
								)
							}
						</div>
						{children}
					</div>
				</>
			)
			: (<ClickBlock handleClick={handleClick} />)
	)
}