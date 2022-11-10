import HexSchoolLogo from './images/HexSchool.svg'
import { flatClassName } from '@utils/reduce'
import useCheckScreen from '@hooks/useCheckScreen'
import { deviceWidth } from '@utils/config'
import MultipleImageSources from '@components/ResponsiveImageContainer/MultipleImageSources'


export default function HostInfo() {
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	return (
		<>
			<div className={flatClassName({
					common: `mx-auto`,
					desktop: `xl:mt-[86px] xl:w-[590px] xl:h-[146.83px]`,
					tablet: `md:w-[319.51px] md:h-[79.51px] md:top-[169px] md:absolute`,
					mobile: ``
				})}
			>
				<MultipleImageSources
					aliasName={"hexschool_wording"}
					mediaImages={[
						{
							minWidth: 1280,
							imageSrc: HexSchoolLogo
						},
						{
							minWidth: 768,
							imageSrc: HexSchoolLogo
						}
					]}
					imageElementProps={{
						src: HexSchoolLogo,
						className: 'w-full h-full object-contain',
						srcSet: `${HexSchoolLogo} 750w, ${HexSchoolLogo} 1200w`,
						sizes: `(min-width: 768px) 343px, (min-width: 1280px) 1200px`
					}}
				/>
			</div>
			<div className={flatClassName({
				common: `mx-auto text-center font-medium font-sans text-[#38241B]`,
				desktop: `xl:leading-[62.26px] xl:text-[43px] xl:mt-[42.17px] xl:w-[996px] xl:h-[62px] xl:tracking-[25px]`,
				tablet: `md:absolute md:top-[271px] md:flex md:justify-center md:mt-[22.49px] md:w-[315px] md:h-[98px] md:leading-[49px] md:text-[34px] md:whitespace-pre-line md:tracking-[18px]`,
				mobile: ``
			})}>{isDesktop ? '年度最強合作，三大關卡來襲' : '年度最強合作\n三大關卡來襲'}</div>
			{
				isDesktop
					? (
						<>
							<div className={`border-[#38241B] xl:w-[1200px] xl:border-2 xl:mt-[40px]`}></div>
							<div className={`border-[#38241B] xl:w-[1200px] xl:border-2 xl:mt-[9px]`}></div>
						</>
					): ''
			}
			
		</>
	)
}