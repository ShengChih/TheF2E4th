import {
	MouseEvent, ReactNode, useRef, RefObject,
	forwardRef, ForwardRefRenderFunction, useImperativeHandle
} from 'react'
import CardBackground from './images/card_background.svg'

interface TaskCardProps {
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
			className={`relative bg-no-repeat bg-center desktop:w-[1200px] desktop:h-[528px]`}
		>
			<div className={`font-sans font-bold absolute text-white desktop:w-[684.78px] desktop:h-[64px] desktop:left-[40px] desktop:top-[19px] desktop:leading-[64px] desktop:text-[44px]`}>{title}</div>
			<div className={`font-serif font-black absolute text-[#38241B] desktop:w-[592px] desktop:h-[63px] desktop:left-[506px] desktop:top-[142px] desktop:leading-[63px] desktop:text-[44px]`}>{subtitle}</div>
			<div className={`font-sans font-medium absolute text-[#38241B] desktop:w-[592px] desktop:h-[70px] desktop:left-[506px] desktop:top-[219px] desktop:leading-[35px] desktop:text-[24px]`}>{content}</div>
			<div
				className={`border-[#38241B] border-solid border-[3px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-[#38241B] fount-sans font-normal flex items-center justify-center absolute desktop:w-[184px] desktop:h-[70px] desktop:left-[508px] desktop:top-[369px] desktop:rounded-[40px] desktop:text-[28px]`}
				onClick={forwardTips}
			>關卡攻略</div>
			<div
				className={`drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#951205] text-white fount-sans font-normal flex items-center justify-center absolute desktop:w-[183px] desktop:h-[70px] desktop:left-[712px] desktop:top-[369px] desktop:rounded-[40px] desktop:text-[28px]`}
				onClick={forwardContribute}
			>投稿</div>
			{EnterpriseLogo}
			{TaskLogo}
		</div>
	)
}

export default forwardRef(TaskCardComponent)