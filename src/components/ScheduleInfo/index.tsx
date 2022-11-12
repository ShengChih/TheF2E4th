import {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle,
	ComponentProps,
	useRef,
} from 'react'
import SectionTitle from '@components/SectionTitle'
import { deviceWidth } from '@utils/config'
import { flatClassName } from '@utils/reduce'
import useCheckScreen from '@hooks/useCheckScreen'

interface SchedulePointProps {
	CardStyle: string
	title: string
	RectangleStyle: string
	PeriodStyle: string
	ActivityPeriods: string[]
}

const SchedulePoint = ({
	CardStyle,
	title,
	RectangleStyle,
	PeriodStyle,
	ActivityPeriods
}: SchedulePointProps) => {
	return (
		<div
			className={flatClassName({
				common: `relative flex items-center flex-col ${CardStyle}`,

			})}
		>
			<div className={flatClassName({
				common: `relative font-sans text-[#38241B] leading-[43px] text-[30px]`,
				desktop: ``
			})}>{title}</div>
			<div className={flatClassName({
				common: `flex items-center justify-center mt-[20px] w-[68.37px] h-[68.37px]`
			})}>
				<div className={flatClassName({
					common: `rotate-45 w-[48.53px] h-[48.53px] ${RectangleStyle}`
				})}></div>
			</div>
			<div className={flatClassName({
				common: `relative grid font-sans font-normal text-[#38241B] leading-[35px] text-[24px] ${PeriodStyle}`
			})}>
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
		CardStyle: flatClassName({
			common: `w-[320px]`
		}),
		title: `開始報名`,
		RectangleStyle: ``,
		PeriodStyle: flatClassName({
			common: `content-between mt-[32.37px] h-[82px] `
		}),
		ActivityPeriods: ['10/13(四) 早上 11:00', '至 11/6(日) 晚上 23:59'],
		starttime: +new Date("2022-10-13T11:00:00.000+08:00"),
		endtime: +new Date("2022-11-06T23:59:59.000+08:00")
	},
	{
		CardStyle: flatClassName({
			common: `w-[320px]`
		}),
		title: `開賽`,
		RectangleStyle: ``,
		PeriodStyle: flatClassName({
			common: `content-between mt-[32.37px] h-[82px] `
		}),
		ActivityPeriods: ['UI組、團體組開賽 10/31', '前端組開賽 11 /7'],
		starttime: +new Date("2022-10-31T00:00:00.000+08:00"),
		endtime: +new Date("2022-11-07T23:59:59.000+08:00")
	},
	{
		CardStyle: flatClassName({
			common: `w-[320px]`
		}),
		title: `投稿作品`,
		RectangleStyle: ``,
		PeriodStyle: flatClassName({
			common: `content-between mt-[32.37px] h-[82px] `
		}),
		ActivityPeriods: ['10/31(一) 中午 12:00', '至11/28(一) 中午 12:00'],
		starttime: +new Date("2022-10-31T12:00:00.000+08:00"),
		endtime: +new Date("2022-11-28T12:00:00.000+08:00")
	},
	{
		CardStyle: flatClassName({
			common: `w-[320px]`
		}),
		title: `線上直播`,
		RectangleStyle: ``,
		PeriodStyle: flatClassName({
			common: `content-between mt-[48.37px] h-[35px]`
		}),
		ActivityPeriods: ['11/3 至 11/24(每週四)'],
		starttime: +new Date("2022-11-03T00:00:00.000+08:00"),
		endtime: +new Date("2022-11-24T23:59:59.000+08:00")
	}
]

const FinalPoints = [
	{
		CardStyle: flatClassName({
			common: `w-[320px]`
		}),
		title: `初選`,
		RectangleStyle: ``,
		PeriodStyle: flatClassName({
			common: ``,
			desktop: `xl:mt-[48.37px]`,
			tablet: `md:mt-[48.37px] md:h-[35px]`,
		}),
		ActivityPeriods: ['12/05(五)'],
		starttime: +new Date("2022-12-05T00:00:00.000+08:00"),
		endtime: +new Date("2022-12-05T23:59:59.000+08:00")
	},
	{
		CardStyle: flatClassName({
			common: `w-[320px]`
		}),
		title: `決選`,
		RectangleStyle: ``,
		PeriodStyle: flatClassName({
			common: ``,
			desktop: `xl:mt-[48.37px]`,
			tablet: `md:mt-[48.37px] md:h-[35px]`,
		}),
		ActivityPeriods: ['12/05(五)'],
		starttime: +new Date("2022-12-05T00:00:00.000+08:00"),
		endtime: +new Date("2022-12-05T23:59:59.000+08:00")
	}				
]

type ScheduleInfoProps = Pick<ComponentProps<"div">, "children">
type ScheduleInfoHandle = {
	movePointAnimation: (tl: gsap.core.Timeline) => gsap.core.Timeline
}

const ScheduleInfo:ForwardRefRenderFunction<ScheduleInfoHandle, ScheduleInfoProps> = ({ children }, forwardref) => {
	const tabletAnimationContainer = useRef<HTMLDivElement>(null)
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	const movement = isTablet ? 375 : 1200
	useImperativeHandle(forwardref, () => {
		return {
			movePointAnimation: (tl: gsap.core.Timeline) => {
				return tl.to(tabletAnimationContainer.current, {
					x: () => `${- movement - window.innerWidth}`,
				})
			}
		}
	}, [])

	return (
		<>
			<SectionTitle className={flatClassName({
				common: `animate-fade-in items-center`,
				desktop: `xl:h-[170px]`,
				tablet: `md:h-[114px]`,
				mobile: `sm:h-[114px]`
			})} title={`賽程時間`} />
			<div className={flatClassName({
				common: `relative`,
				desktop: `xl:flex xl:items-center xl:justify-center xl:h-[870px]`,
				tablet: `md:h-[617px]`,
				mobile: `sm:h-[360px]`
			})}>
				<div className={flatClassName({
					common: `relative `,
					desktop: `xl:w-[1280px] xl:h-[686px]`,
					tablet: `md:h-[487px]`,
					mobile: `sm:h-[360px] sm:flex sm:items-center`
				})}>
					<div
						className={flatClassName({
							tablet: `md:flex md:flex-nowrap md:my-[66px] md:w-[1667px] md:h-[246px]`,
							mobile: `sm:flex sm:flex-nowrap sm:w-[1667px] sm:h-[246px]`
						})}
						ref={tabletAnimationContainer}
					>
						<div className={flatClassName({
							common: `relative flex w-[1280px]  h-[246px]`,
							desktop: ``,
							tablet: ``,
						})}>
							<div className={flatClassName({
								common: `absolute inset-x-0 flex items-center mx-auto`,
								desktop: `mt-[63px] w-[960px] h-[68.37px]`,
								tablet: ``,
								mobile: ``,
							})}>
								<div className={flatClassName({
									common: `absolute inset-x-0 mx-auto border-[5px] border-solid border-[#951205]`,
									desktop: ``,
									tablet: ``,
									mobile: ``
								})}></div>
							</div>
							{
								ProgressPoints.map(
									({ starttime, endtime, RectangleStyle, ...point }, index: number) => {
										const now = + new Date()
										const rectangleStyle = RectangleStyle + (
											now >= starttime
											? `bg-[#951205]`
											: `bg-[#3C221B]`
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
						<div className={flatClassName({
							common: `relative mx-auto flex`,
							desktop: `xl:w-[640px] xl:mt-[92px] xl:h-[215px]`,
							tablet: ``,
							mobile: ``
						})}>
							<div className={flatClassName({
								common: `absolute inset-x-0 flex items-center mx-auto mt-[63px] w-[320px] h-[68.37px]`,
								desktop: ``,
								tablet: ``,
								mobile: ``,
							})}>
								<div className={flatClassName({
									common: `absolute inset-x-0 mx-auto border-[5px] border-solid ${+new Date() >= +new Date("2022-12-05T00:00:00.000+08:00") ? 'border-[#951205]' : 'border-[#3C221B]'}`,
									tablet: `md:w-[320px]`,
									mobile: `sm:w-[320px]`,
								})}></div>
							</div>
							{
								FinalPoints.map(({ starttime, endtime, RectangleStyle, ...point }, index: number) => {
									const now = + new Date()
									const rectangleStyle = RectangleStyle + (
										now >= starttime
										? `bg-[#951205]`
										: `bg-[#3C221B]`
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
					</div>
					{
						isMobile
							? ''
							: (
								<div className={flatClassName({
									common: `font-sans mx-auto whitespace-pre-line text-[#3C221B] `,
									desktop: `text-[28px]  xl:w-[1198px] xl:h-[89px] xl:mt-[44px]`,
									tablet: `md:w-[736px] md:h-[175px] md:mb-[64px]`,
								})}>
									{
										"初選：將由六角學院前端、UI 評審進行第一波篩選，並於 12/5（五）公布初選佳作名單。\n\
										決選：由三大企業針對該企業主題進行入圍獎最後篩選，並於 12/23（五）公布企業得獎名單。"
									}
								</div>
							)
					}
					{ children }
				</div>
			</div>
		</>
	)
}

export default forwardRef(ScheduleInfo)