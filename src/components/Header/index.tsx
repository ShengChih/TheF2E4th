import { ComponentProps, MouseEvent } from 'react'
import HexSchoolLogo from './images/hex-logo.svg'

type HeaderProps = ComponentProps<"header"> & {
	gotoHexSchoolAnchor: (e: MouseEvent) => void
	gotoScheduleInfoAnchor: (e: MouseEvent) => void
}

export default function Header({ className, gotoHexSchoolAnchor, gotoScheduleInfoAnchor }: HeaderProps) {
	return (
		<header className={`z-10 translate-x-0 translate-y-0 w-screen fixed flex overflow-hidden	items-center justify-between bg-[#38241B] h-[62px] px-[40px] ${className}`}>
			<img src={HexSchoolLogo} className={`bg-no-repeat flex items-center w-[145px] h-[35px]`} />
			<nav className={`flex w-[386px] h-[42px] inset-y-[10px]`}>
				<ul className={`h-full flex items-center justify-between px-[8px] w-[196px]`}>
					<li onClick={gotoHexSchoolAnchor} className={`flex items-center text-white text-[18px] font-normal	font-sans w-[72px] h-full`}>關卡任務</li>
					<li onClick={gotoScheduleInfoAnchor} className={`flex items-center text-white text-[18px] font-normal	font-sans w-[72px] h-full`}>競賽說明</li>
				</ul>
				<button className={`flex justify-center items-center text-white font-medium font-sans ml-[7px] text-[20px] w-[183px] h-[42px] bg-[#951205] rounded-[40px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>立即報名</button>
			</nav>
		</header>
	)
}