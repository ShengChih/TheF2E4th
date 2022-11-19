import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectHistory } from '@features/gnsign/histories/selector'
import { UPLOAD_FILE } from '@features/gnsign/files/sagaActions'
import { FileInfo } from "@features/gnsign/histories/type"
import { flatClassName } from "@utils/reduce"
import Tree from './images/tree.png'

type GroupYearHistroy = {
	[key:number|string]: FileInfo[]
}

const SignHistory = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const histories: FileInfo[] = useAppSelector(selectHistory)
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
							common: `flex flex-no-wrap bg-white justify-between`,
							mobile: `sm:rounded-[13px] sm:pl-[12px] shadow-[1px_4px_6px_rgba(0,0,0,0.11)]`
						})}
						key={`${year}-${index}`}
					>
						<div
							className={flatClassName({
								common: `flex flex-no-wrap items-center`,
								mobile: `sm:w-[259px] sm:h-[64px] sm:gap-x-[12px]`
							})}
						>
							<p className={flatClassName({
								common: `font-roboto text-gnsign-black flex justify-center text-center`,
								mobile: `sm:w-[43px] sm:h-[19px] sm:text-[16px] sm:leading-[19px]`
							})}>{mtime.getMonth()}/{mtime.getDate()}</p>
							<p className={flatClassName({
								common: `bg-clip-text bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh text-fill-transparent font-normal text-ellipsis overflow-hidden whitespace-nowrap`,
								mobile: `sm:text-[16px] sm:leading-[23px]`
							})}>{filename}</p>
						</div>
						<div
							onClick={signDocument}
							data-row-id={`${year}-${index}`}
							className={flatClassName({
								common: `flex items-center justify-center`,
								mobile: `sm:w-[56px] sm:h-[64px]`
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
					common: `w-full flex items-center text-gnsign-black font-roboto`,
					mobile: `sm:h-[42px] sm:text-[16px] sm:leading-[19px] sm:pl-[16px]`
				})}>{year}</p>
				<div className={flatClassName({
					common: `flex flex-col `,
					mobile: `sm:px-[16px] sm:gap-y-[10px]`
				})}>{histories}</div>
			</div>)
		}

		return historyJsx
	}

	return (
		<div className={flatClassName({
			common: `w-screen h-screen bg-gnsign-background flex flex-col items-center relative`,
		})}>

			<div className={flatClassName({
				common: `w-full bg-gnsign-green flex flex-no-wrap justify-between items-center`,
				mobile: `sm:h-[56px] sm:p-[16px]`,
				tablet: `md:h-[56px] md:p-[16px]`,
			})}>
				<div
					onClick={goPrevPage}
					className={flatClassName({
						common: ``,
						mobile: `sm:w-[24px] sm:h-[24px]`,
						tablet: `md:w-[24px] md:h-[24px]`,
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
				})}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.8858 17.2543 14.5974 16.0417 15.8561C16.0073 15.8825 15.9743 15.9114 15.9428 15.9429C15.9113 15.9744 15.8824 16.0074 15.856 16.0417C14.5974 17.2543 12.8858 18 11 18C7.13401 18 4 14.866 4 11ZM16.6176 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.0781 18.0319 16.6177L21.707 20.2929C22.0975 20.6834 22.0975 21.3166 21.707 21.7071C21.3165 22.0976 20.6833 22.0976 20.2928 21.7071L16.6176 18.0319Z" fill="white"/>
					</svg>
				</div>
			</div>
			
			{
				groupHistory && (
					<div className={flatClassName({
						common: `font-sans w-full h-full flex flex-col `,
						mobile: `sm:gap-y-[24px]`,
						tablet: `md:gap-y-[24px]`
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
						tablet: `md:translate-y-[188px] md:gap-y-[33px]`
					})}>
						<img className={flatClassName({
							mobile: `sm:w-[95px] sm:h-[200px] `,
							tablet: `md:w-[95px] md:h-[200px] `
						})} src={Tree} />

						<p className={flatClassName({
							common: `font-sans font-normal text-gnsign-black`,
							mobile: `sm:text-[18px] sm:leading-[26px]`
						})}>尚無任何記錄</p>
					</div>
				)
			}
		</div>
	)
}

export default SignHistory