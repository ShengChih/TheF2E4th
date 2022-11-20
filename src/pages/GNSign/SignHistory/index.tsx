import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectHistory } from '@features/gnsign/histories/selector'
import { UPLOAD_FILE } from '@features/gnsign/files/sagaActions'
import { FileInfo } from "@features/gnsign/histories/type"
import { flatClassName } from "@utils/reduce"
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'
import Tree from './images/tree.png'
import PC_Logo from '@pages/GNSign/Landing/images/desktop/logo.png'
import PC_LeaveBottomLeft from '@components/GNsign/LoadingPage/images/desktop/leave_bottom_left.png'
import PC_LeaveRightTop from '@components/GNsign/LoadingPage/images/desktop/leave_right_top.png'
import PC_GrassLeft from '@components/GNsign/LoadingPage/images/desktop/grass_left.png'

type GroupYearHistroy = {
	[key:number|string]: FileInfo[]
}

const SignHistory = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const histories: FileInfo[] = useAppSelector(selectHistory)
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)
	const hasHistory = histories.length > 0

	const groupByYear: GroupYearHistroy = histories.reduce((ret, current: FileInfo) => {
		const { mtime } = current
		const year: number = mtime.getFullYear()
		if (year in ret) {
			ret[year].push(current)
		} else {
			ret[year] = [current]
		}
		return ret
	}, {} as GroupYearHistroy)

	const groupHistory: GroupYearHistroy = Object.keys(groupByYear)
		.reduce((ret: GroupYearHistroy, year: string) => {
			const yearInt = parseInt(year)
			ret[yearInt] = groupByYear[yearInt]
			return ret
		}, {} as GroupYearHistroy)

	const signDocument = (e: MouseEvent) => {
		const key = e.currentTarget!.getAttribute('data-row-id') ?? ''

		if (!key) {
			return
		}

		const [year, rowIndex] = key.split('-').map((val: string) => parseInt(val))

		dispatch({
			type: UPLOAD_FILE,
			payload: {
				...groupHistory[year][rowIndex]
			}
		})
		navigate("/gnsign/signdoc", { replace: true })
	}

	const goPrevPage = (e: MouseEvent) => {
		navigate("/gnsign", { replace: true })
	}

	const sliceTopHistory = (topNum: number) => {
		const years = Object.keys(groupHistory).sort().reverse()
		const historyJsx = []
		let count = 0

		for (let year of years) {
			if (count >= topNum) {
				break
			}

			const yearHistory = groupHistory[year]
			const histories = []
	
			for (let index in yearHistory) {
				const { fileId, url, filename, mtime } = yearHistory[index]
				histories.push((
					<div
						className={flatClassName({
							common: `flex flex-no-wrap bg-white justify-between shadow-[1px_4px_6px_rgba(0,0,0,0.11)]`,
							mobile: `sm:rounded-[13px] sm:pl-[12px]`,
							tablet: `md:rounded-[13px] md:pl-[12px]`,
							desktop: `xl:rounded-[13px] xl:pl-[12px]`,
						})}
						key={`${year}-${index}`}
					>
						<div
							className={flatClassName({
								common: `flex flex-no-wrap items-center`,
								mobile: `sm:w-[259px] sm:h-[64px] sm:gap-x-[12px]`,
								tablet: `md:w-[652px] md:h-[64px] md:gap-x-[12px]`,
								desktop: `xl:w-[620px] xl:h-[64px] xl:gap-x-[12px]`,
							})}
						>
							<p className={flatClassName({
								common: `font-roboto text-gnsign-black flex justify-center text-center`,
								mobile: `sm:w-[43px] sm:h-[19px] sm:text-[16px] sm:leading-[19px]`,
								tablet: `md:w-[43px] md:h-[19px] md:text-[16px] md:leading-[19px]`,
								desktop: `xl:w-[43px] xl:h-[19px] xl:text-[16px] xl:leading-[19px]`,
							})}>{mtime.getMonth()}/{mtime.getDate()}</p>
							<p className={flatClassName({
								common: `bg-clip-text bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh text-fill-transparent font-normal text-ellipsis overflow-hidden whitespace-nowrap`,
								mobile: `sm:text-[16px] sm:leading-[23px]`,
								tablet: `md:text-[16px] md:leading-[23px]`,
								desktop: `xl:text-[16px] xl:leading-[23px]`,
							})}>{filename}</p>
						</div>
						<div
							onClick={signDocument}
							data-row-id={`${year}-${index}`}
							className={flatClassName({
								common: `flex items-center justify-center`,
								mobile: `sm:w-[56px] sm:h-[64px]`,
								tablet: `md:w-[56px] md:h-[64px]`,
								desktop: `xl:w-[56px] xl:h-[64px]`
							})}
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 6L15 12L9 18" stroke="#B7B7B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
					</div>
				))
	
				count++
				if (count >= topNum) {
					break
				}
			}

			historyJsx.push(<div key={`history-${year}`}>
				<p className={flatClassName({
					common: `w-full flex items-center text-gnsign-black font-roboto font-bold`,
					mobile: `sm:h-[42px] sm:text-[16px] sm:leading-[19px] sm:pl-[16px]`,
					tablet: `md:h-[42px] md:text-[16px] md:leading-[19px] md:pl-[16px]`,
					desktop: `xl:h-[42px] xl:text-[16px] xl:leading-[19px] xl:pl-[16px]`,
				})}>{year}</p>
				<div className={flatClassName({
					common: `flex flex-col `,
					mobile: `sm:px-[16px] sm:gap-y-[10px]`,
					tablet: `md:px-[16px] md:gap-y-[10px]`,
					desktop: `xl:gap-y-[10px]`,
				})}>{histories}</div>
			</div>)
		}

		return historyJsx
	}

	return (
		<div className={flatClassName({
			common: `w-screen h-screen bg-gnsign-background flex flex-col items-center relative`,
		})}>

			{
				Object.keys(groupHistory).length === 0 && isDesktop
				? ''
				: (
					<div className={flatClassName({
						common: `w-full bg-gnsign-green flex flex-no-wrap justify-between items-center`,
						mobile: `sm:h-[56px] sm:p-[16px]`,
						tablet: `md:h-[56px] md:p-[16px]`,
						desktop: `xl:h-[56px] xl:p-[16px]`,
					})}>
						<div
							onClick={goPrevPage}
							className={flatClassName({
								common: ``,
								mobile: `sm:w-[24px] sm:h-[24px]`,
								tablet: `md:w-[24px] md:h-[24px]`,
								desktop: `xl:w-[24px] xl:h-[24px]`,
							})}
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16 20L8 12L16 4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
						<div className={flatClassName({
							common: ``,
							mobile: `sm:w-[24px] sm:h-[24px]`,
							tablet: `md:w-[24px] md:h-[24px]`,
							desktop: `xl:w-[24px] xl:h-[24px]`,
						})}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.8858 17.2543 14.5974 16.0417 15.8561C16.0073 15.8825 15.9743 15.9114 15.9428 15.9429C15.9113 15.9744 15.8824 16.0074 15.856 16.0417C14.5974 17.2543 12.8858 18 11 18C7.13401 18 4 14.866 4 11ZM16.6176 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.0781 18.0319 16.6177L21.707 20.2929C22.0975 20.6834 22.0975 21.3166 21.707 21.7071C21.3165 22.0976 20.6833 22.0976 20.2928 21.7071L16.6176 18.0319Z" fill="white"/>
							</svg>
						</div>
					</div>
				)
			}
			
			{
				groupHistory && (
					<div className={flatClassName({
						common: `font-sans  h-full flex flex-col `,
						mobile: `sm:w-full sm:gap-y-[24px]`,
						tablet: `md:w-full md:gap-y-[24px]`,
						desktop: `xl:w-[620px] xl:gap-y-[24px] xl:mt-[36px]`
					})}>
						<div className={flatClassName({
							common: ``,
						})}>{sliceTopHistory(6)}</div>
					</div>
				)
			}
			{
				!hasHistory && (
					<div className={flatClassName({
						common: `absolute flex flex-col items-center`,
						mobile: `sm:translate-y-[168px] sm:gap-y-[33px]`,
						tablet: `md:translate-y-[188px] md:gap-y-[33px]`,
						desktop: `xl:translate-y-[168px] xl:gap-y-[33px]`,
					})}>
						<img className={flatClassName({
							mobile: `sm:w-[95px] sm:h-[200px] `,
							tablet: `md:w-[95px] md:h-[200px] `,
							desktop: `xl:w-[95px] xl:h-[200px] `,
						})} src={Tree} />

						<p className={flatClassName({
							common: `font-sans font-normal text-gnsign-black`,
							mobile: `sm:text-[18px] sm:leading-[26px]`,
							tablet: `md:text-[18px] md:leading-[26px]`,
							desktop: `xl:text-[18px] xl:leading-[26px]`
						})}>尚無任何記錄</p>
					</div>
				)
			}
			{
				Object.keys(groupHistory).length === 0 && isDesktop ? (<>
					<img className={`absolute w-fit h-fit xl:left-[40px] xl:top-[28px]`} src={PC_Logo} />
					<img className={flatClassName({
						desktop: `xl:w-[122px] xl:h-[255px] absolute top-0 right-0`
					})} src={PC_LeaveRightTop} />
					<img className={flatClassName({
						desktop: `xl:w-[243px] xl:h-[62px] absolute bottom-[159px] left-0`
					})} src={PC_GrassLeft} />
					<img className={flatClassName({
						desktop: `xl:w-[150px] xl:h-[305px] absolute bottom-0 left-0`
					})} src={PC_LeaveBottomLeft} />
				</>): ''
			}
		</div>
	)
}

export default SignHistory