import {
	MouseEvent, ReactNode, useRef, RefObject,
	forwardRef, ForwardRefRenderFunction, useImperativeHandle
} from 'react'
import MultipleImageSources from '@components/ResponsiveImageContainer/MultipleImageSources'
import TabletBackground from './images/tablet/card_background.png'
import MobileBackground from './images/mobile/card_background.png'
import PcCardBackground from './images/card_background.svg'
import { flatClassName } from '@utils/reduce'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen' 


interface TaskCardProps {
	className?: string
	title?: string
	subtitle?: string
	content?: string
	EnterpriseLogo?: ReactNode | ReactNode[]
	TaskLogo?: ReactNode | ReactNode[]
	forwardTips?: (e: MouseEvent<HTMLElement>) => void
	forwardContribute?: (e: MouseEvent<HTMLElement>) => void
}

type TaskCardHandle = {
	getRef: () => RefObject<HTMLDivElement>
}

const TaskCardComponent: ForwardRefRenderFunction<TaskCardHandle, TaskCardProps> = ({
	className,
	title,
	subtitle,
	content,
	EnterpriseLogo,
	TaskLogo,
	forwardTips,
	forwardContribute
}, forwardref) => {
	const TaskCardRef = useRef<HTMLDivElement>(null)
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	useImperativeHandle(forwardref, () => {
		return {
			getRef: () => {
				return TaskCardRef ?? {}
			}
		}
	}, [])

	return (
		<div
			ref={TaskCardRef}
			className={flatClassName({
				common: `relative ${className ?? ''}`,
				desktop: ``,
				tablet: `md:flex md:flex-wrap md:justify-center`,
				mobile: `sm:flex sm:flex-wrap sm:justify-center`
			})}
		>
			<MultipleImageSources
				aliasName={"card_background"}
				mediaImages={[
					{
						minWidth: 1280,
						imageSrc: PcCardBackground
					},
					{
						minWidth: 768,
						imageSrc: TabletBackground
					},
					{
						minWidth: 375,
						imageSrc: MobileBackground
					},
				]}
				imageElementProps={{
					src: PcCardBackground,
					className: 'w-full h-full object-contain',
					srcSet: `${MobileBackground} 375w, ${TabletBackground} 750w, ${PcCardBackground} 1200w`,
					sizes: `(min-width: 375px) 343px, (min-width: 1280px) 1200px`
				}}
			/>
			{
				isDesktop
					? (
						<div className={flatClassName({
							common: `font-sans font-bold  text-white`,
							desktop: `xl:absolute xl:w-[684.78px] xl:h-[64px] xl:left-[40px] xl:top-[19px] xl:leading-[64px] xl:text-[44px] `,
						})}>{title}</div>
					): ''
			}
			<div className={flatClassName({
				common: `font-serif font-black text-[#38241B] leading-[63px] text-[44px] absolute`,
				desktop: `xl:w-[592px] xl:h-[63px] xl:left-[506px] xl:top-[142px] `,
				tablet: `md:w-[266px] md:h-[126px] md:top-[118px]`,
				mobile: `sm:w-[266px] sm:h-[126px] sm:top-[118px]`
			})}>{subtitle}</div>
			<div className={flatClassName({
				common: `font-sans font-medium absolute text-[#38241B] leading-[35px] text-[24px]`,
				desktop: `xl:absolute xl:w-[592px] xl:h-[70px] xl:left-[506px] xl:top-[219px] `,
				tablet: `md:w-[280px] md:h-[105px] md:top-[256px]`,
				mobile: `sm:w-[280px] sm:h-[105px] sm:top-[256px]`,
			})}>{content}</div>
			<div
				className={flatClassName({
					common: `border-[#38241B] border-solid border-[3px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-[#38241B] font-sans font-normal flex items-center justify-center absolute rounded-[40px]`,
					desktop: `xl:w-[184px] xl:h-[70px] xl:left-[508px] xl:top-[369px] xl:rounded-[40px] xl:text-[28px]`,
					tablet: `md:w-[129px] md:h-[52.71px] md:left-[32px] md:top-[437px] md:text-[18px]`,
					mobile: `sm:w-[129px] sm:h-[52.71px] sm:left-[32px] sm:top-[437px] sm:text-[18px]`,
				})}
				onClick={forwardTips}
			>關卡攻略</div>
			<div
				className={flatClassName({
					common: `drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#951205] text-white font-sans font-normal flex items-center justify-center absolute rounded-[40px]`,
					desktop: `xl:w-[183px] xl:h-[70px] xl:left-[712px] xl:top-[369px] xl:text-[28px]`,
					tablet: `md:w-[129px] md:h-[52.71px] md:left-[171px] md:top-[437px] md:text-[18px]`,
					mobile: `sm:w-[129px] sm:h-[52.71px] sm:left-[171px] sm:top-[437px] sm:text-[18px]`,
				})}
				onClick={forwardContribute}
			>投稿</div>
			{EnterpriseLogo}
			{
				isDesktop
					? TaskLogo
					: ''
			}
		</div>
	)
}

export default forwardRef(TaskCardComponent)