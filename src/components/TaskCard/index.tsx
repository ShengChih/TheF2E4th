import { MouseEvent, ReactNode } from 'react'
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

export default function TaskCard({
	title,
	subtitle,
	content,
	EnterpriseLogo,
	TaskLogo,
	forwardTips,
	forwardContribute
}: TaskCardProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${CardBackground})`
			}}
			className={`bg-no-repeat bg-center desktop:w-[1200px] desktop:h-[528px]`}
		></div>
	)
}