import React, { ReactNode, ComponentProps, ElementType } from 'react';

import baseStyles from './styles/base.module.scss'


interface SectionTitleProps {
	title: string
	sectionClassName?: string | undefined
	icon?: ReactNode
}

export default function SectionTitle({
	title,
	sectionClassName,
	icon
}: SectionTitleProps) {
	return (
		<div className={`${baseStyles.section} ${sectionClassName}`} >
			{icon}
			<div>{title}</div>
		</div>
	)
}
