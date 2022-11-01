import BlockStudioLogo from './images/BlockStudioLogo.svg'
import KdanLogo from './images/KdanLogo.svg'
import TitansoftLogo from './images/TitansoftLogo.svg'

export default function SponerInfo() {
	return (
		<div className={`w-full bg-[#3C221B] desktop:h-[328px] desktop:py-[54px]`}>
			<div className={`font-serif font-black mx-auto text-white desktop:w-[240px] desktop:h-[86px] desktop:leading-[86px] desktop:text-[60px]`}>贊助單位</div>
			<div className={`mx-auto flex flex-row items-center justify-between desktop:mt-[50px] desktop:w-[1148px] desktop:h-[83px]`}>
				<img alt={`Block studio`} src={BlockStudioLogo}  className={`bg-contain desktop:w-[344px] desktop:h-[69px]`} />
				<img alt={`Kdan`} src={KdanLogo}  className={`bg-contain desktop:w-[190px] desktop:h-[83px]`} />
				<img alt={`Titansoft`} src={TitansoftLogo} className={`bg-contain desktop:w-[354px] desktop:h-[67px]`} />
			</div>
		</div>
	)
}