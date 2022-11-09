import {
	MouseEvent, ReactNode, useRef, RefObject,
	forwardRef, ForwardRefRenderFunction, useImperativeHandle
} from 'react'
import CardBackground from './images/card_background.svg'

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
			style={{
				backgroundImage: `url(${CardBackground})`
			}}
			className={`relative bg-no-repeat bg-center ${className ?? ''}`}
		>
			<div className={`font-sans font-bold absolute text-white xl:w-[684.78px] xl:h-[64px] xl:left-[40px] xl:top-[19px] xl:leading-[64px] xl:text-[44px]`}>{title}</div>
			<div className={`font-serif font-black absolute text-[#38241B] xl:w-[592px] xl:h-[63px] xl:left-[506px] xl:top-[142px] xl:leading-[63px] xl:text-[44px]`}>{subtitle}</div>
			<div className={`font-sans font-medium absolute text-[#38241B] xl:w-[592px] xl:h-[70px] xl:left-[506px] xl:top-[219px] xl:leading-[35px] xl:text-[24px]`}>{content}</div>
			<div
				className={`border-[#38241B] border-solid border-[3px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-[#38241B] fount-sans font-normal flex items-center justify-center absolute xl:w-[184px] xl:h-[70px] xl:left-[508px] xl:top-[369px] xl:rounded-[40px] xl:text-[28px]`}
				onClick={forwardTips}
			>關卡攻略</div>
			<div
				className={`drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#951205] text-white fount-sans font-normal flex items-center justify-center absolute xl:w-[183px] xl:h-[70px] xl:left-[712px] xl:top-[369px] xl:rounded-[40px] xl:text-[28px]`}
				onClick={forwardContribute}
			>投稿</div>
			{EnterpriseLogo}
			{TaskLogo}
		</div>
	)
}

export default forwardRef(TaskCardComponent)