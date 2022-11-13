import { deviceWidth } from '@utils/config'
import { flatClassName } from '@utils/reduce'
import useCheckScreen from '@hooks/useCheckScreen'
import LoadingPage from "@components/LoadingPage"
import MagicWand from '@components/MagicWand'

import LoadingBg from './images/loading_bg.jpg'

const F2E4thWeek1LoadingPage = () => {
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	return (
		<LoadingPage
			className={`w-screen h-screen fixed z-10`}
			loadingImg={<MagicWand className={flatClassName({
				common: `absolute inset-x-0 mx-auto w-[200px] h-[200px] translate-y-[138px]`,
			})} />}
			content={`${isDesktop ? '努力加載中...' : ''}`}
			extraInfo={(isDesktop ? ['網站中收集', <span className={`text-[#951205]`}>五顆</span>, '散落的柏蒂豆，即可獲得驚喜唷。'] : '')}
			mediaImages={[
				{
					minWidth: 375,
					imageSrc: LoadingBg
				},
				{
					minWidth: 768,
					imageSrc: LoadingBg
				},
				{
					minWidth: 1280,
					imageSrc: LoadingBg
				}
			]}
			imageElementProps={{
				src: LoadingBg,
				className: 'w-screen h-screen object-cover',
				srcSet: `${LoadingBg} 375w, ${LoadingBg} 768w, ${LoadingBg} 1280w`,
				sizes: `100vw`
			}}
			pictureElementProps={{
				className: `absolute`
			}}
		/>
	)
}

export default F2E4thWeek1LoadingPage