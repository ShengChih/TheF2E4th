import React, { ReactNode } from 'react';

import './styles/base.scss'
import './styles/pc.scss'

interface SectionTitileProps {
	className: string
	title: string | ReactNode
	imageUrl: string | ReactNode
}

export default function SectionTitile({
	className,
	title,
	imageUrl
}: SectionTitileProps) {
	return (
		<div
			className={className}
		>
			<div className="icon icon--pc"></div>
			<div children={title}></div>
		</div>
	)
}
