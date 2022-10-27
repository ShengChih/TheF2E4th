import { ComponentProps, MouseEvent } from 'react'

import withSlider from '@HOCs/withSlider'

import NoImage from './images/NoImage.svg'
import Close from './images/close.svg'

import mapIcon from './images/map.svg'
import timeIcon from './images/time.svg'
import ticketIcon from './images/ticket.svg'
import telIcon from './images/tel.svg'
import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

export interface FestivalDetailModalProps {
	isDisplay: boolean
	images?: string[]
	title: string
	description?: string
	period?: string
	price?: string
	location?: string
	contact?: string
	onCloseModal?: (e: MouseEvent<HTMLDivElement>) => void | undefined
}

export const InitState: FestivalDetailModalProps = {
	isDisplay: false,
	images: [],
	title: '',
	description: '',
	period: '',
	price: '',
	location: '',
	contact: '',
	onCloseModal: undefined
}

export default function FestivalDetailModal({
	isDisplay,
	images,
	title,
	description,
	period,
	price,
	location,
	contact,
	onCloseModal
}: FestivalDetailModalProps) {
	const ImageContainer = (props: ComponentProps<"img">) => (
		<img {...props} />
	)

	const newImages = images && images.length > 0 ? images : [NoImage]
	const { SliderContainer: ImageSlider, sliceFunc } = withSlider({
		WrappedContainer: ImageContainer,
		totalRows: images?.length ?? 0,
		maxRowsInContainer: 1
	})

	const invisibleClassName = isDisplay ? '' : 'hidden'

	return (
		<div className={`${baseStyles.fullmask} ${pcStyles.fullmask} ${invisibleClassName}`}>
			<div className={`${baseStyles.container} ${pcStyles.container}`}>
				<div
					style={{
						backgroundImage: `url(${Close})`
					}}
					className={`${baseStyles.close} ${pcStyles.close}`}
					onClick={onCloseModal}
				></div>
				<ImageSlider className={`${baseStyles.image} ${pcStyles.image}`} src={sliceFunc(newImages)} />
				<div className={`${baseStyles.title} ${pcStyles.title}`}>{title}</div>
				<div className={`${baseStyles.description} ${pcStyles.description}`}>{description}</div>
				<div className={`${baseStyles.period_price} ${pcStyles.period_price}`}>
					<div className={`${baseStyles.period} ${pcStyles.period}`}>
						<div
							style={{
								backgroundImage: `url(${timeIcon})`
							}}
							className={`${baseStyles.period_icon} ${pcStyles.period_icon}`}></div>
						<div className={`${baseStyles.period_text} ${pcStyles.period_text}`}>{period}</div>
					</div>
					<div className={`${baseStyles.price} ${pcStyles.price}`}>
						<div
							style={{
								backgroundImage: `url(${ticketIcon})`
							}}
							className={`${baseStyles.price_icon} ${pcStyles.price_icon}`}></div>
						<div className={`${baseStyles.price_text} ${pcStyles.price_text}`}>{price}</div>
					</div>
				</div>
				<div className={`${baseStyles.location_contact} ${pcStyles.location_contact}`}>
					<div className={`${baseStyles.location} ${pcStyles.location}`}>
						<div
							style={{
								backgroundImage: `url(${mapIcon})`
							}}
							className={`${baseStyles.location_icon} ${pcStyles.location_icon}`}></div>
						<div className={`${baseStyles.location_text} ${pcStyles.location_text}`}>{location}</div>
					</div>
					<div className={`${baseStyles.contact} ${pcStyles.contact}`}>
						<div
							style={{
								backgroundImage: `url(${telIcon})`
							}}
							className={`${baseStyles.contact_icon} ${pcStyles.contact_icon}`}></div>
						<div className={`${baseStyles.contact_text} ${pcStyles.contact_text}`}>{contact}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
