import React, { ReactNode, ComponentType, ComponentProps, ElementType } from 'react';

import baseStyles from './styles/base.module.scss'


interface SectionTitleProps<T extends ElementType> {
	title: string
	sectionClassName?: string | undefined
	iconProps?: ComponentProps<T>
}

export default function SectionTitle<T extends ElementType>({
	title,
	sectionClassName,
	iconProps
}: SectionTitleProps<T>) {
	return (
		<div
			className={`${baseStyles.section} ${sectionClassName}`}
		>
			<div {...iconProps}></div>
			<div>{title}</div>
		</div>
	)
}
