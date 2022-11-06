import { ComponentProps, MouseEvent } from 'react'
import HexSchoolLogo from './images/hex-logo.svg'

type HeaderProps = ComponentProps<"header"> & {
	gotoHexSchoolAnchor: (e: MouseEvent) => void
	gotoScheduleInfoAnchor: (e: MouseEvent) => void
}

export default function Header({ className, gotoHexSchoolAnchor, gotoScheduleInfoAnchor }: HeaderProps) {
	return (
		<header className={`inset-0 z-10 flex overflow-hidden	items-center justify-between bg-[#38241B] desktop:h-[62px] desktop:px-[40px] ${className}`}>
			<img src={HexSchoolLogo} className={`desktop:w-[145px] desktop:h-[35px] bg-no-repeat flex items-center`} />
			<nav className={`flex desktop:w-[386px] desktop:h-[42px] desktop:inset-y-[10px]`}>
				<ul className={`h-full flex items-center justify-between desktop:px-[8px] desktop:w-[196px]`}>
					<li onClick={gotoHexSchoolAnchor} className={`flex items-center text-white desktop:text-[18px] font-normal	font-sans desktop:w-[72px] h-full`}>關卡任務</li>
					<li onClick={gotoScheduleInfoAnchor} className={`flex items-center text-white desktop:text-[18px] font-normal	font-sans desktop:w-[72px] h-full`}>競賽說明</li>
				</ul>
				<button className={`flex justify-center items-center text-white font-medium font-sans desktop:ml-[7px] desktop:text-[20px] desktop:leading-[29px] desktop:w-[183px] desktop:h-[42px] bg-[#951205] rounded-[40px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>立即報名</button>
			</nav>
		</header>
	)
}