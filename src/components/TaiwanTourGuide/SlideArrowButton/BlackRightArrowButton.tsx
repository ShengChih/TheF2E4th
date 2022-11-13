import { ComponentProps, ElementType } from 'react'
import withBackwardStyle from '@HOCs/withBackwardStyle'
import withClassName from '@HOCs/withClassName'
import ArrowButton from '@components/TaiwanTourGuide/SlideArrowButton/ArrowButton'
import RightArrow from './images/arrow_right_white.svg'

type BlackRightArrowButtonProps<T extends ElementType> = ComponentProps<T>

export default function BlackRightArrowButton<T extends ElementType>(props: BlackRightArrowButtonProps<T>) {
	const NewArrowButton = withClassName(
		withBackwardStyle(ArrowButton, {
			backgroundImage: `url(${RightArrow})`,
		}),
		`bg-[#0D0B0C]`
	)
	return <NewArrowButton {...props} />
}
