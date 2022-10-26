import { MouseEvent } from 'react'
import NoImage from './images/NoImage.svg'

export interface FestivalCardProps {
	mainImage?: string | undefined
	title: string
	summary: string
	location: string
	onClickActivityDetail?: (e: MouseEvent<HTMLElement>) => void
}

export default function FestivalCard({
	mainImage,
	title,
	summary,
	location,
	onClickActivityDetail
}: FestivalCardProps) {
	return (
		<div className="w-full h-full">
			<img alt={title} src={mainImage ? mainImage : NoImage} />
			<div>{title}</div>
			<div>{summary}</div>
			<div>{location}</div>
			<div onClick={onClickActivityDetail}>活動詳情</div>
		</div>
	)
}
