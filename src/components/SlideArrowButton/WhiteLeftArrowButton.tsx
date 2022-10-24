import { ComponentProps, ElementType } from 'react'

import ArrowButton from '@components/SlideArrowButton/ArrowButton'
import LeftArrow from './images/arrow_left_black.svg'
import buttonStyles from './styles/button.module.scss'

type WhiteLeftArrowButtonProps<T extends ElementType> = ComponentProps<T>

export default function WhiteLeftArrowButton<T extends ElementType>(props: WhiteLeftArrowButtonProps<T>) {
	const newProps = {
		...props,
		style: {
			...props.style,
			backgroundImage: `url(${LeftArrow})`,
		},
		className: `bg-white ${props?.className}`
	}
	return <ArrowButton {...newProps} />
}
