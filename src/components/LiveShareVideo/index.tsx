import React, { useCallback, useState, MouseEvent, ReactNode } from 'react'
import MagicWand from '@components/MagicWand'
import SectionTitle from '@components/SectionTitle'
import { flatClassName } from '@utils/reduce'
import BlockStudioSpeaker from './images/Speaker1.gif'
import LeoSpeaker from './images/Speaker2.gif'
import DraggableSpeaker from './images/FakeSpeaker3.gif'
import CreativeSpeaker from './images/Speaker4.gif'
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
				backgroundImage: `url(${SpeakerImage})`
			}}
			className={flatClassName({
				common: `relative flex flex-col`,
				desktop: `xl:w-[522px] h-[738.5px]`,
				tablet: `md:w-[343.px] md:[485.26px]`,
				mobile: ``
			})}
		>
			<div className={flatClassName({
				common: `text-center font-serif font-black mx-auto ${SubjectStyle}`,
				tablet: `md:absolute`
			})}>{SubjectTitle}</div>
			<div
				onClick={go2Link}
				className={flatClassName({
					common: `relative mx-auto`,
					desktop: `xl:w-[341.48px] xl:h-[468.35px]`,
					tablet: ``,
					mobile: ``
				})}
			>
				<div
					style={{
						backgroundImage: `url(${PlayAction})`
					}}
					className={flatClassName({
						common: `bg-no-repeat bg-center absolute border-white bg-[#38241B]/[.6]`,
						desktop: `xl:w-[107.03px] xl:h-[107.03px] xl:border-4 xl:rounded-[97px] xl:left-[120px] xl:top-[180px]`,
						tablet: ``,
						mobile: ``
					})}
				></div>
				<div className={flatClassName({
						common: `font-roboto flex items-center justify-center absolute bg-[#951205] text-white`,
						desktop: `xl:text-[28px] xl:w-[104px] xl:h-[53px] xl:font-medium xl:left-[229px] xl:top-[25px] xl:leading-[67px]`,
						tablet: ``,
						mobile: ``
					})}>LIVE</div>
				<div
					style={{
						backgroundImage: `url(${NameBgImage})`
					}}
					className={flatClassName({
						common: `absolute flex items-center`,
						desktop: `xl:w-[259px] xl:h-[66px] xl:top-[428px] xl:left-[41px]`,
						tablet: `md:w-[170.19px] md:h-[43.37px]`,
						mobile: ``
					})}
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
		SubjectStyle: flatClassName({
			desktop: `xl:text-[57px] xl:leading-[62px] xl:mt-[47.68px] xl:mb-[45.32px] xl:w-[402.39px] xl:h-[62px]`,
			tablet: `md:text-[37px] md:leading-[36px] md:absolute md:inset-x-0 md:mx-auto md:top-[13.59px] md:w-[264.4px] md:h-[77.19px]`,
			mobile: ``
		}),
		SubjectTitle: `網站的動態趨勢`,
		SpeakerImage: BlockStudioSpeaker,
		SpeakerInfo: `李明-版塊設計創辦人兼總監`,
		SpeakerTitleStyle: `xl:text-[20px] xl:leading-[26px] xl:w-[200px] xl:h-[52px] xl:left-[35px]`,
		SpeakerTitle: '李明\n版塊設計創辦人兼總監',
		ActivityPeriodsStyle: flatClassName({
			desktop: `xl:text-[35px] xl:leading-[67px] xl:ml-[57px] xl:mt-[28.65px] xl:w-[402.39px] xl:h-[58.74px]`,
			tablet: `md:text-[24px] md:leading-[67px] md:w-[259px] md:h-[42px] md:top-[433px]`,
			mobile: ``
		}),
		ActivityInfo: `11/03(四)20:00 ~ 21:30`,
		VideoLink: `https://www.youtube.com/watch?v=9gzDFKTIFB4`
	},
	{
		SubjectStyle: flatClassName({
			desktop: `xl:text-[49px] xl:leading-[62px] xl:mt-[20.68px] xl:mb-[16.84px] xl:w-[402.39px] xl:h-[117.47px]`,
			tablet: `md:text-[30px] md:leading-[36px] `,
			mobile: ``
		}),
		SubjectTitle: `jQuery 也可以做到的互動效果`,
		SpeakerImage: LeoSpeaker,
		SpeakerInfo: `Leo-Angular Taiwan 傳教士`,
		SpeakerTitleStyle: `xl:text-[20px] xl:leading-[26px] xl:w-[217px] xl:h-[52px] xl:left-[27px]`,
		SpeakerTitle: 'Leo\nAngular Taiwan 傳教士',
		ActivityPeriodsStyle: `xl:text-[35px] xl:leading-[67px] xl:ml-[57px] xl:mt-[28.65px] xl:mb-[45.32px] xl:w-[402.39px] xl:h-[58.74px]`,
		ActivityInfo: `11/10(四)20:00 ~ 21:30`,
		VideoLink: `https://www.youtube.com/watch?v=ywPkqeXYVAU&ab_channel=%E5%85%AD%E8%A7%92%E5%AD%B8%E9%99%A2`
	},
	{
		SubjectStyle: `xl:text-[46px] xl:leading-[62px] xl:mt-[20.68px] xl:mb-[16.84px] xl:w-[402.39px] xl:h-[117.47px]`,
		SubjectTitle: `網頁可以拖拖拉拉draggable.js 介紹`,
		SpeakerImage: DraggableSpeaker,
		SpeakerInfo: `邱繼緯-前端工程師`,
		SpeakerTitleStyle: `xl:text-[20px] xl:leading-[26px] xl:w-[100px] xl:h-[52px] xl:left-[85px]`,
		SpeakerTitle: '邱繼緯\n前端工程師',
		ActivityPeriodsStyle: `xl:text-[35px] xl:leading-[67px] xl:ml-[57px] xl:mt-[28.65px] xl:w-[402.39px] xl:h-[58.74px]`,
		ActivityInfo: `11/17(四)20:00 ~ 21:30`,
	},
	{
		SubjectStyle: `xl:text-[44px] xl:leading-[62px] xl:mt-[20.68px] xl:mb-[16.84px] xl:w-[402.39px] xl:h-[117.47px]`,
		SubjectTitle: `互動式網頁設計工程師該具備哪些技能？`,
		SpeakerImage: CreativeSpeaker,
		SpeakerInfo: `吳哲宇-墨雨互動設計 創辦人`,
		SpeakerTitleStyle: `xl:text-[20px] xl:leading-[26px] xl:w-[185px] xl:h-[52px] xl:left-[43px]`,
		SpeakerTitle: '吳哲宇\n墨雨互動設計 創辦人',
		ActivityPeriodsStyle: `xl:text-[35px] xl:leading-[67px] xl:ml-[57px] xl:mt-[28.65px] xl:w-[402.39px] xl:h-[58.74px]`,
		ActivityInfo: `11/24(四)20:00 ~ 21:30`,
	}
]

type ClickBlockProps = {
	handleClick: (e: MouseEvent<HTMLDivElement>) => void
}

const ClickBlock = React.memo(({ handleClick }: ClickBlockProps) => (
	<div
		onClick={handleClick}
		className={`relative font-serif font-black mx-auto text-center text-[#3C221B] xl:leading-[103px] xl:text-[72px] xl:mt-[215px] xl:w-[504px] xl:h-[245px]`}
	>
		意想不到的好康
		<span className={`text-[#951205]`}>請點擊</span>
		<MagicWand className={`absolute top-0 left-0 xl:w-[200px] xl:h-[200px] xl:translate-y-[135px] xl:translate-x-[316px]`} />
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
					<SectionTitle className={`animate-fade-in items-center md:h-[114px] xl:h-[170px]`} title={`各界大神直播分享`} />
					<div className={`mx-auto flex items-center justify-center xl:w-[1280px] xl:h-[1656px]`}>
						<div className={`animate-fade-in grid grid-flow-row grid-cols-2 mx-auto  xl:w-[1064px] xl:h-[1529px] xl:gap-x-[20px] xl:gap-y-[52px]`}>
							{
								liveShares.map(
									(speaker, index: number) => (
										<ShareSpeakerCard {...speaker} key={`speaker-${index}`} />
									)
								)
							}
						</div>
					</div>
					{children}
				</>
			)
			: (<ClickBlock handleClick={handleClick} />)
	)
}