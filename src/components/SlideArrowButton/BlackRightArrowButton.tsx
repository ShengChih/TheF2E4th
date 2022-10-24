import { ComponentProps, ElementType } from 'react'

import ArrowButton from '@components/SlideArrowButton/ArrowButton'
import RightArrow from './images/arrow_right_white.svg'

type BlackRightArrowButtonProps<T extends ElementType> = ComponentProps<T>

export default function BlackRightArrowButton<T extends ElementType>(props: BlackRightArrowButtonProps<T>) {
	return <ArrowButton imageUrl={RightArrow} {...props} />
}
