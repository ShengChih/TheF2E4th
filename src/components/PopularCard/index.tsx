import LocationIcon from './images/location.svg'
import NoImage from './images/NoImage.svg'

import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

export interface PopularCardProps {
	mainImage?: string | undefined
	title: string
	location: string
}

export default function PopularCard({
	mainImage,
	title,
	location,
}: PopularCardProps) {
	return (
		<div className={`${baseStyles.popular_card} ${pcStyles.popular_card}`}>
			<img className={`${baseStyles.main_image} ${pcStyles.main_image}`}
				alt={title} src={mainImage ? mainImage : NoImage}
			/>
			<div className={`${baseStyles.title} ${pcStyles.title}`}>{title}</div>
			<div className={`${baseStyles.location} ${pcStyles.location}`}>
				<div
					style={{
						backgroundImage: `url(${LocationIcon})`
					}}
					className={`${baseStyles.location_icon} ${pcStyles.location_icon}`}></div>
				<div className={`${baseStyles.location_text} ${pcStyles.location_text}`}>{location}</div>
			</div>
		</div>
	)
}
