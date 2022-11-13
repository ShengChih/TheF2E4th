import React, { MouseEvent, CSSProperties } from 'react'
import baseStyles from './styles/base.module.scss'

interface ArrowButtonProps {
	style: CSSProperties
	className?: string
	onClick?: (e: MouseEvent<HTMLDivElement>) => void
}
	
export default function ArrowButton(props: ArrowButtonProps) {
	return (
		<div
			{...props}
			className={`${baseStyles.arrow_button} ${props?.className}`}
		/>
	)
}
