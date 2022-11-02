import { ReactNode } from 'react'

interface SchedulePointProps {
	CardStyle: string
	title: string
	RectangleStyle: string
	PeriodStyle: string
	ActivityPeriods: ReactNode | ReactNode[]
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
			<div className={`relative font-sans text-[#38241B] desktop:leading-[43px] desktop:text-[30px] desktop:top-[-63px]`}>{title}</div>
			<div className={`rotate-45 bg-[#3C221B] desktop:w-[48.53px] desktop:h-[48.53px] ${RectangleStyle}`}></div>
			<div className={`relative whitespace-pre-line	font-sans text-[#38241B] ${PeriodStyle} desktop:leading-[35px] desktop:text-[24px] desktop:top-[32.37px]`}>{ActivityPeriods}</div>
		</div>
	)
}

const ProgressPoints = [
	{
		CardStyle: `desktop:w-[323px]`,
		title: `開始報名`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:leading-[35px] desktop:text-[24px] desktop:top-[32.37px]`,
		ActivityPeriods: '10/13(四) 早上 11:00\n至 11/6(日) 晚上 23:59'
	},
	{
		CardStyle: `desktop:w-[323px]`,
		title: `開賽`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:leading-[35px] desktop:text-[24px] desktop:top-[32.37px]`,
		ActivityPeriods: 'UI組、團體組開賽 10/31\n前端組開賽 11 /7',
	},
	{
		CardStyle: `desktop:w-[323px]`,
		title: `投稿作品`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:leading-[35px] desktop:text-[24px] desktop:top-[32.37px]`,
		ActivityPeriods: '10/31(一) 中午 12:00\n至11/28(一) 中午 12:00',
	},
	{
		CardStyle: `desktop:w-[323px]`,
		title: `線上直播`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:leading-[35px] desktop:text-[24px] desktop:top-[48.37px]`,
		ActivityPeriods: ['11/3 至 11/24(每週四)'],
	}
]

const FinalPoints = [
	{
		CardStyle: `desktop:w-[317px]`,
		title: `初選`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:leading-[35px] desktop:text-[24px] desktop:top-[48.37px]`,
		ActivityPeriods: '12/05(五)',
	},
	{
		CardStyle: `desktop:w-[317px]`,
		title: `決選`,
		RectangleStyle: ``,
		PeriodStyle: `desktop:leading-[35px] desktop:text-[24px] desktop:top-[48.37px]`,
		ActivityPeriods:`12/05(五)`,
	}				
]

export default function ScheduleInfo() {
	return (
		<section className={`w-full desktop:h-[1040px]`}>
			<div className={`flex items-center justify-center bg-[#3C221B] font-serif font-black text-white desktop:h-[170px] desktop:text-[60px] desktop:leading-[86px]`}>賽程時間</div>
			<div className={`relative`}>
				<div className={`absolute left-[151px] border-[5px] border-solid border-[#3C221B] desktop:left-[151px] desktop:top-[63px] desktop:w-[957px]`}></div>
				<div className={`flex mx-auto w-max desktop:mt-[155px]`}>
					{
						ProgressPoints.map((point, index:number ) => <SchedulePoint key={`progress-${index}`} {...point} />)
					}
				</div>
			</div>
			<div className={`relative`}>
				<div className={`absolute left-[151px] border-[5px] border-solid border-[#3C221B] desktop:left-[466px] desktop:top-[63px] desktop:w-[328px]`}></div>
				<div className={`flex mx-auto w-max desktop:mt-[155px]`}>
					{
						FinalPoints.map((point, index: number) => <SchedulePoint key={`final-${index}`} {...point} />)
					}
				</div>
			</div>
			<div className={`font-sans text-[#3C221B] desktop:text-[28px] mx-auto desktop:w-[1198px] desktop:h-[89px] desktop:mt-[127.37px]`}>
				初選：將由六角學院前端、UI 評審進行第一波篩選，並於 12/5（五）公布初選佳作名單。<br />
				決選：由三大企業針對該企業主題進行入圍獎最後篩選，並於 12/23（五）公布企業得獎名單。
			</div>
		</section>
	)
}