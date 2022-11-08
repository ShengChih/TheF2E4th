import { ReactNode, ComponentProps } from 'react'
import SectionTitle from '@components/SectionTitle'

interface SchedulePointProps {
	CardStyle: string
	title: string
	RectangleStyle: string
	PeriodStyle: string
	ActivityPeriods: string[]
}

function SchedulePoint({
	CardStyle,
	title,
	RectangleStyle,
	PeriodStyle,
	ActivityPeriods
}: SchedulePointProps) {
	return (
		<div className={`relative flex items-center flex-col ${CardStyle}`}>
			<div className={`relative font-sans text-[#38241B] desktop:leading-[43px] desktop:text-[30px]`}>{title}</div>
			<div className={`flex items-center justify-center desktop:mt-[20px] desktop:w-[68.37px] desktop:h-[68.37px]`}>
				<div className={`rotate-45 bg-[#3C221B] desktop:w-[48.53px] desktop:h-[48.53px] ${RectangleStyle}`}></div>
			</div>
			<div className={`relative grid font-sans font-normal text-[#38241B] desktop:leading-[35px] desktop:text-[24px] ${PeriodStyle}`}>
				{
					ActivityPeriods.map((text: string, index: number) => {
						return <div key={`${index}`}>{text}</div>
					})
				}
			</div>
		</div>
	)
}

const ProgressPoints = [
	{
		CardStyle: `desktop:w-[320px]`,
		title: `開始報名`,
		RectangleStyle: ``,
		PeriodStyle: `content-between desktop:mt-[32.37px] desktop:h-[82px] `,
		ActivityPeriods: ['10/13(四) 早上 11:00', '至 11/6(日) 晚上 23:59'],
		starttime: +new Date("2022-10-13T11:00:00.000+08:00"),
		endtime: +new Date("2022-11-06T23:59:59.000+08:00")
	},
	{
		CardStyle: `desktop:w-[320px]`,
		title: `開賽`,
		RectangleStyle: ``,
		PeriodStyle: `content-between desktop:mt-[32.37px] desktop:h-[82px]`,
		ActivityPeriods: ['UI組、團體組開賽 10/31', '前端組開賽 11 /7'],
		starttime: +new Date("2022-10-31T00:00:00.000+08:00"),
		endtime: +new Date("2022-11-07T23:59:59.000+08:00")
	},
	{
		CardStyle: `desktop:w-[320px]`,
		title: `投稿作品`,
		RectangleStyle: ``,
		PeriodStyle: `content-between desktop:mt-[32.37px] desktop:h-[82px]`,
		ActivityPeriods: ['10/31(一) 中午 12:00', '至11/28(一) 中午 12:00'],
		starttime: +new Date("2022-10-31T12:00:00.000+08:00"),
		endtime: +new Date("2022-11-28T12:00:00.000+08:00")
	},
	{
		CardStyle: `desktop:w-[320px]`,
		title: `線上直播`,
		RectangleStyle: ``,
		PeriodStyle: `content-center desktop:mt-[48.37px] desktop:h-[35px]`,
		ActivityPeriods: ['11/3 至 11/24(每週四)'],
		starttime: +new Date("2022-11-03T00:00:00.000+08:00"),
		endtime: +new Date("2022-11-24T23:59:59.000+08:00")
	}
]

const FinalPoints = [
	{
		CardStyle: `desktop:w-[320px]`,
		title: `初選`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:mt-[48.37px]`,
		ActivityPeriods: ['12/05(五)'],
		starttime: +new Date("2022-12-05T00:00:00.000+08:00"),
		endtime: +new Date("2022-12-05T23:59:59.000+08:00")
	},
	{
		CardStyle: `desktop:w-[320px]`,
		title: `決選`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:mt-[48.37px]`,
		ActivityPeriods: ['12/05(五)'],
		starttime: +new Date("2022-12-05T00:00:00.000+08:00"),
		endtime: +new Date("2022-12-05T23:59:59.000+08:00")
	}				
]

type ScheduleInfoProps = Pick<ComponentProps<"div">, "children">

export default function ScheduleInfo({ children }: ScheduleInfoProps) {
	return (
		<>
			<SectionTitle className={`items-center desktop:h-[170px]`} title={`賽程時間`} />
			<div className={`relative flex items-center justify-center h-[870px]`}>
				<div className={`relative w-[1280px] h-[686px]`}>
					<div className={`relative flex desktop:w-[1280px]  desktop:h-[246px]`}>
						<div className={`absolute inset-x-0 flex items-center mx-auto desktop:mt-[63px] desktop:w-[960px] desktop:h-[68.37px]`}>
							<div className={`absolute inset-x-0 mx-auto border-[5px] border-solid border-[#951205]`}></div>
						</div>
						{
							ProgressPoints.map(
								({ starttime, endtime, RectangleStyle, ...point }, index: number) => {
									const now = + new Date()
									const rectangleStyle = RectangleStyle + (
										now >= starttime
										? `bg-[#951205]`
										: ``
									)
									return (
										<SchedulePoint
											key={`progress-${index}`}
											RectangleStyle={rectangleStyle}
											{ ...point }
										/>
									)
								}
							)
						}
					</div>
					<div className={`relative mx-auto flex desktop:w-[640px] desktop:mt-[92px] desktop:h-[215px]`}>
						<div className={`absolute inset-x-0 flex items-center mx-auto desktop:mt-[63px] desktop:w-[320px] desktop:h-[68.37px]`}>
							<div className={`absolute inset-x-0 mx-auto border-[5px] border-solid ${+new Date() >= +new Date("2022-12-05T00:00:00.000+08:00") ? 'border-[#951205]':'border-[#3C221B]'}`}></div>
						</div>
						{
							FinalPoints.map(({ starttime, endtime, RectangleStyle, ...point }, index: number) => {
								const now = + new Date()
								const rectangleStyle = RectangleStyle + (
									now >= starttime
									? `bg-[#951205]`
									: ``
								)
								return (
									<SchedulePoint
										key={`final-${index}`}
										RectangleStyle={rectangleStyle}
										{...point}
									/>
								)
							})
						}
					</div>
					<div className={`font-sans mx-auto whitespace-pre-line text-[#3C221B] desktop:text-[28px]  desktop:w-[1198px] desktop:h-[89px] desktop:mt-[44px]`}>
						{
							"初選：將由六角學院前端、UI 評審進行第一波篩選，並於 12/5（五）公布初選佳作名單。\n\
							決選：由三大企業針對該企業主題進行入圍獎最後篩選，並於 12/23（五）公布企業得獎名單。"
						}
					</div>
					{ children }
				</div>
			</div>
		</>
	)
}