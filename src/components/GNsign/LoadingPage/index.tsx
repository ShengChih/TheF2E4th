import { memo } from 'react'
import { flatClassName } from '@utils/reduce'
import Lottie from 'lottie-react'
import LoadingPage from '@components/shared/LoadingPage'

import MB_Loading from './images/mobile/loading.png'
import PC_LeaveBottomLeft from './images/desktop/leave_bottom_left.png'
import PC_LeaveRightTop from './images/desktop/leave_right_top.png'
import PC_GrassLeft from './images/desktop/grass_left.png'
import PC_Logo from '@pages/GNSign/Landing/images/desktop/logo.png'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'
import LoadingAnimation from './lotties/GNsign_loading.json'


export * from './constants'
export * from './type.d'

const GNsignLoadingPage = memo(({ isLoading, text }: { isLoading: boolean, text: string }) => {
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	return (<>
		<LoadingPage
			loadingImg={<div className={flatClassName({
				common: `absolute w-[132px] h-[132px]`,
				mobile: `sm:translate-y-[176px]`,
				tablet: `md:translate-y-[176px]`,
				desktop: `xl:translate-y-[176px]`,
			})}><Lottie animationData={LoadingAnimation} loop={true} /></div>}
			content={<p className={flatClassName({
				common: `absolute`,
				mobile: `sm:translate-y-[308px]`,
				tablet: `md:translate-y-[308px]`,
				desktop: `xl:translate-y-[308px]`,
			})}>{text}</p>}
			className={flatClassName({
				common: `w-screen h-screen bg-gnsign-background absolute inset-0 flex justify-center ${isLoading ? '':'hidden'}`,
			})}
		/>

		{
			isDesktop ? (<div className={isLoading ? '':'hidden'}>
				<img className={`absolute w-fit h-fit xl:left-[40px] xl:top-[28px]`} src={PC_Logo} />
				<img className={flatClassName({
					desktop: `xl:w-[122px] xl:h-[255px] absolute top-0 right-0`
				})} src={PC_LeaveRightTop} />
				<img className={flatClassName({
					desktop: `xl:w-[243px] xl:h-[62px] absolute bottom-[159px] left-0`
				})} src={PC_GrassLeft} />
				<img className={flatClassName({
					desktop: `xl:w-[150px] xl:h-[305px] absolute bottom-0 left-0`
				})} src={PC_LeaveBottomLeft} />
			</div>): ''
		}
	</>)
})

export default GNsignLoadingPage