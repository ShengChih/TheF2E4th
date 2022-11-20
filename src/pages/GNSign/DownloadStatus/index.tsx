import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Lottie from 'lottie-react'


import { flatClassName } from "@utils/reduce"
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'
import PC_Logo from '@pages/GNSign/Landing/images/desktop/logo.png'
import Success from './lotties/ok.json'
import Error from './lotties/wrong.json'


const DownloadStatus = () => {
	let [searchParams, _] = useSearchParams()
	let status = searchParams.get("status") ?? '';
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	const Icon = (status: string) => {
		return status === 'success' ? (<>
			<div className={flatClassName({
				common: `relative`,
				mobile: `sm:w-[140px] sm:h-[140px] sm:translate-y-[166px]`,
				tablet: `md:w-[140px] md:h-[140px] md:translate-y-[166px]`,
				desktop: `xl:w-[140px] xl:h-[140px] xl:translate-y-[166px]`,
			})}>
				<Lottie animationData={Success} loop={2} />
			</div>
			<p className={flatClassName({
				common: `absolute font-sans font-normal text-gnsign-black`,
				mobile: `sm:text-[22px] sm:text-[32px] sm:translate-y-[334px]`,
				tablet: `md:text-[22px] md:text-[32px] md:translate-y-[334px]`,
				desktop: `xl:text-[22px] xl:text-[32px] xl:translate-y-[334px]`,
			})}>下載成功</p>
		</>
		): (
			<>
			<div className={flatClassName({
				common: `relative`,
				mobile: `sm:w-[155.24px] sm:h-[140.57px] sm:translate-y-[166px]`,
				tablet: `md:w-[155.24px] md:h-[140.57px] md:translate-y-[166px]`,
				desktop: `xl:w-[155.24px] xl:h-[140.57px] xl:translate-y-[166px]`,
			})}>
				<Lottie animationData={Error} loop={2} />
			</div>
			<p className={flatClassName({
				common: `absolute font-sans font-normal text-gnsign-black`,
				mobile: `sm:text-[22px] sm:text-[32px] sm:translate-y-[334px]`,
				tablet: `md:text-[22px] md:text-[32px] md:translate-y-[334px]`,
				desktop: `xl:text-[22px] xl:text-[32px] xl:translate-y-[334px]`
			})}
			>下載失敗，請稍候再試</p>
			</>
		)
	}

	const navigate = useNavigate()
	const goLanding = (e: MouseEvent) => {
		navigate('/gnsign', { replace: true })
	}

	return (
		<div className={flatClassName({
			common: `relative w-screen h-screen flex flex-wrap justify-center bg-gnsign-background`
		})}>
			{
				isDesktop ? (
					<img className={`absolute w-fit h-fit xl:left-[40px] xl:top-[28px]`} src={PC_Logo} />
				) : ''
			}
			{ Icon(status) }
			<button
				onClick={goLanding}
				className={flatClassName({
				common: `absolute text-white font-sans font-normal  flex items-center justify-center bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh`,
				mobile: `sm:translate-y-[579px] sm:text-[18px] sm:leading-[26px] sm:w-[260px] sm:h-[56px] sm:rounded-[16px]`,
				tablet: `md:translate-y-[435px] md:text-[18px] md:leading-[26px] md:w-[260px] md:h-[56px] md:rounded-[16px]`,
				desktop: `xl:translate-y-[435px] xl:text-[18px] xl:leading-[26px] xl:w-[260px] xl:h-[56px] xl:rounded-[16px]`
			})}>回首頁</button>
		</div>
	)
}

export default DownloadStatus