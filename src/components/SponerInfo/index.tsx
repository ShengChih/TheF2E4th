import SectionTitle from '@components/SectionTitle'

import BlockStudioLogo from './images/BlockStudioLogo.svg'
import KdanLogo from './images/KdanLogo.svg'
import TitansoftLogo from './images/TitansoftLogo.svg'

export default function SponerInfo() {
	return (
		<div className={`w-full xl:h-[219px]`}>
			<SectionTitle className={`xl:h-[86px] xl:mb-[50px]`}  title={`贊助單位`} />
			<div className={`mx-auto flex flex-row items-center justify-between xl:w-[1148px] xl:h-[83px]`}>
				<img alt={`Block studio`} src={BlockStudioLogo}  className={`bg-contain xl:w-[344px] xl:h-[69px]`} />
				<img alt={`Kdan`} src={KdanLogo}  className={`bg-contain xl:w-[190px] xl:h-[83px]`} />
				<img alt={`Titansoft`} src={TitansoftLogo} className={`bg-contain xl:w-[354px] xl:h-[67px]`} />
			</div>
		</div>
	)
}