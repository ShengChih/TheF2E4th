import { memo } from 'react'
import { flatClassName } from '@utils/reduce'
import LoadingPage from '@components/shared/LoadingPage'

import MB_Loading from './images/mobile/loading.png'
import PC_LeaveBottomLeft from './images/desktop/leave_bottom_left.png'
import PC_LeaveRightTop from './images/desktop/leave_right_top.png'
import PC_GrassLeft from './images/desktop/grass_left.png'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'

export * from './constants'
export * from './type.d'

const GNsignLoadingPage = memo(({ isLoading, text }: { isLoading: boolean, text: string }) => {
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	return (<>
		<LoadingPage
			loadingImg={<img src={MB_Loading} className={flatClassName({
				common: `absolute`,
				mobile: `sm:translate-y-[176px]`,
				tablet: `md:translate-y-[176px]`,
			})} />}
			content={<p className={flatClassName({
				common: `absolute`,
				mobile: `sm:translate-y-[308px]`,
				tablet: `md:translate-y-[308px]`,
			})}>{text}</p>}
			className={flatClassName({
				common: `w-screen h-screen bg-gnsign-background absolute inset-0 flex justify-center ${isLoading ? '':'hidden'}`,
			})}
		/>
		{
			isDesktop ? (<div className={isLoading ? '':'hidden'}>
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