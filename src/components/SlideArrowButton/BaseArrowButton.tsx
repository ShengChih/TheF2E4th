import React, { MouseEvent, CSSProperties } from 'react'

import styles from './styles/base.module.scss'

interface BaseArrowButtonProps {
	style: CSSProperties
	className?: string
	onClick?: (e: MouseEvent<HTMLDivElement>) => void
}
	
export default function BaseArrowButton({ style, className, onClick }:BaseArrowButtonProps) {
	return (
		<div
			style={{
				...style
			}}
			className={`${styles.arrow_button} ${className}`}
			onClick={onClick}
		/>
	)
}
