import React from 'react'

import './styles/base.scss'
import './styles/pc.scss'
import './styles/tablet.scss'
import './styles/mobile.scss'

interface BaseArrowButtonProps {
	imageUrl: string
	classNames?: string
}
	
export default function BaseArrowButton({ imageUrl, classNames }:BaseArrowButtonProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${imageUrl})`
			}}
			className={`arrow_button arrow_button--pc ${classNames}`}
		/>
	)
}
