import SectionTitle from '@components/SectionTitle'

import BlockStudioLogo from './images/BlockStudioLogo.svg'
import KdanLogo from './images/KdanLogo.svg'
import TitansoftLogo from './images/TitansoftLogo.svg'

export default function SponerInfo() {
	return (
		<div className={`w-full desktop:h-[219px]`}>
			<SectionTitle className={`desktop:h-[86px] desktop:mb-[50px]`}  title={`贊助單位`} />
			<div className={`mx-auto flex flex-row items-center justify-between desktop:w-[1148px] desktop:h-[83px]`}>
				<img alt={`Block studio`} src={BlockStudioLogo}  className={`bg-contain desktop:w-[344px] desktop:h-[69px]`} />
				<img alt={`Kdan`} src={KdanLogo}  className={`bg-contain desktop:w-[190px] desktop:h-[83px]`} />
				<img alt={`Titansoft`} src={TitansoftLogo} className={`bg-contain desktop:w-[354px] desktop:h-[67px]`} />
			</div>
		</div>
	)
}