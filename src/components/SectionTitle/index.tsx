import React, { ReactNode, ComponentType, ComponentProps, ElementType } from 'react';

import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'


interface SectionTitleProps {
	title: string
	sectionClassName?: string | undefined
	iconClassName?: string | undefined
}

export default function SectionTitle({
	title,
	sectionClassName,
	iconClassName
}: SectionTitleProps) {
	return (
		<div
			className={`${baseStyles.section} ${sectionClassName}`}
		>
			<div className={`${iconClassName}`}></div>
			<div>{title}</div>
		</div>
	)
}
