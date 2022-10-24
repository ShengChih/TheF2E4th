import { ComponentProps, ElementType } from 'react'

import ArrowButton from '@components/SlideArrowButton/ArrowButton'
import LeftArrow from './images/arrow_left_black.svg'
import buttonStyles from './styles/button.module.scss'

type WhiteLeftArrowButtonProps<T extends ElementType> = ComponentProps<T>

export default function WhiteLeftArrowButton<T extends ElementType>(props: WhiteLeftArrowButtonProps<T>) {
	return <ArrowButton imageUrl={LeftArrow} {...props} />
}
