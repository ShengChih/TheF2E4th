import { MouseEvent } from 'react'

import LocationIcon from './images/location.svg'
import NoImage from './images/NoImage.svg'

import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

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
		<div className={`${baseStyles.festival_card} ${pcStyles.festival_card}`}>
			<img className={`${pcStyles.main_image}`}
				alt={title} src={mainImage ? mainImage : NoImage}
			/>
			<div className={`${pcStyles.description}`}>
				<div className={`${pcStyles.title}`}>{title}</div>
				<div className={`${baseStyles.summary} ${pcStyles.summary}`}>{summary}</div>
				<div className={`${baseStyles.action} ${pcStyles.action}`}>
					<div className={`${baseStyles.location} ${pcStyles.location}`}>
						<div
							style={{
								backgroundImage: `url(${LocationIcon})`
							}}
							className={`${baseStyles.location_icon} ${pcStyles.location_icon}`}></div>
						<div className={`${baseStyles.location_text} ${pcStyles.location_text}`}>{location}</div>
					</div>
					<div className={`${baseStyles.detail_button} ${pcStyles.detail_button}`} onClick={onClickActivityDetail}>活動詳情</div>
				</div>
			</div>
		</div>
	)
}
