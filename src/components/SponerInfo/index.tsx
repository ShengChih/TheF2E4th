import SectionTitle from '@components/SectionTitle'
import { flatClassName } from '@utils/reduce'

import BlockStudioLogo from './images/BlockStudioLogo.svg'
import KdanLogo from './images/KdanLogo.svg'
import TitansoftLogo from './images/TitansoftLogo.svg'

export default function SponerInfo() {
	return (
		<div className={flatClassName({
			common: `w-full`,
			desktop: `xl:h-[219px]`,
			tablet: `md:h-[398px]`,
			mobile: ``
		})}>
			<SectionTitle className={flatClassName({
				common: `mb-[50px]`,
				desktop: `xl:h-[86px]`,
				tablet: `md:h-[43px]`,
				mobile: ``
			})}  title={`贊助單位`} />
			<div className={flatClassName({
				common: `mx-auto flex  items-center justify-between `,
				desktop: `xl:w-[1148px] xl:h-[83px] xl:flex-row`,
				tablet: `md:w-[303px] md:h-[305px] md:flex-col`,
				mobile: ``
			})}>
				<img className={flatClassName({
					common: `bg-contain xl:w-[344px] xl:h-[69px]`,
					desktop: `xl:w-[1148px] xl:h-[83px]`,
					tablet: ``,
					mobile: ``
				})} alt={`Block studio`} src={BlockStudioLogo} />
				<img className={flatClassName({
					common: `bg-contain `,
					desktop: `xl:w-[190px] xl:h-[83px]`,
					tablet: ``,
					mobile: ``
				})} alt={`Kdan`} src={KdanLogo}  />
				<img className={flatClassName({
					common: `bg-contain`,
					desktop: ` xl:w-[354px] xl:h-[67px]`,
					tablet: ``,
					mobile: ``
				})} alt={`Titansoft`} src={TitansoftLogo}  />
			</div>
		</div>
	)
}