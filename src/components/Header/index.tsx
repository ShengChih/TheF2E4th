import { memo, ComponentProps, MouseEvent } from 'react'
import HexSchoolLogo from './images/hex-logo.svg'
import { flatClassName } from '@utils/reduce'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'

type HeaderProps = ComponentProps<"header"> & {
	gotoHexSchoolAnchor?: (e: MouseEvent) => void
	gotoScheduleInfoAnchor?: (e: MouseEvent) => void
}

const Header = ({
	className,
	gotoHexSchoolAnchor,
	gotoScheduleInfoAnchor
}: HeaderProps) => {
	let [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)
	return (
		<header className={flatClassName({
			common: `z-10 translate-x-0 translate-y-0 w-screen fixed flex overflow-hidden	items-center justify-between bg-[#38241B] h-[62px] px-[40px] ${className ?? ''}`,
			mobile: `sm:h-[60px] sm:px-[16px]`
		})}>
			{
				isMobile
					? (
						<div className={flatClassName({
							mobile: `sm:w-[50px] sm:h-[50px] sm:grid sm:gap-y-[3px] sm:justify-items-center sm:items-center sm:py-[11.5px]`
						})}>
							<div className={flatClassName({
								mobile: `sm:rounded sm:w-[39px] sm:border-[2.5px] sm:bg-white sm:border-white sm:h-[0px]`
							})}></div>
							<div className={flatClassName({
								mobile: `sm:rounded sm:w-[39px] sm:border-[2.5px] sm:bg-white sm:border-white sm:h-[0px]`
							})}></div>
							<div className={flatClassName({
								mobile: `sm:rounded sm:w-[39px] sm:border-[2.5px] sm:bg-white sm:border-white sm:h-[0px]`
							})}></div>
						</div>
					)
					: (
						<img src={HexSchoolLogo} className={flatClassName({
							common: `bg-no-repeat flex items-center w-[145px] h-[35px]`,
						})} />
					)
			}
			
			<nav className={flatClassName({
				common: `flex w-[386px] h-[42px] inset-y-[10px]`,
				mobile: `sm:w-[130px] sm:h-[40.25px] sm:inset-y-[9.87px]`
			})}>
				{
					isMobile || !gotoHexSchoolAnchor || !gotoScheduleInfoAnchor
						? ''
						: (
							<ul className={flatClassName({
								common: `h-full flex items-center justify-between px-[8px] w-[196px]`,
							})}>
								<li
									className={flatClassName({
										common: `flex items-center text-white text-[18px] font-normal	font-sans w-[72px] h-full`,
									})}
									onClick={gotoHexSchoolAnchor}
								>關卡任務</li>
								<li
									className={flatClassName({
										common: `flex items-center text-white text-[18px] font-normal	font-sans w-[72px] h-full`,
									})}
									onClick={gotoScheduleInfoAnchor}
								>競賽說明</li>
							</ul>
						)
				}
				<button className={flatClassName({
					common: `flex justify-center items-center text-[20px] text-white font-medium font-sans w-[183px] h-[42px] bg-[#951205] rounded-[40px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]`,
					desktop: `xl:ml-[7px]`,
					tablet: `md:ml-[7px]`,
					mobile: `sm:h-[40.25px]`
				})}>立即報名</button>
			</nav>
		</header>
	)
}

export default memo(Header)