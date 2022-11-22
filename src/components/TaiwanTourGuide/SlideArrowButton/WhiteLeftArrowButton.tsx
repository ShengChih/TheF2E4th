import React, { ComponentProps, ElementType } from 'react'
import withClassName from '@/HOCs/withClassName'
import withBackwardStyle from '@/HOCs/withBackwardStyle'
import ArrowButton from '@/components/TaiwanTourGuide/SlideArrowButton/ArrowButton'
import LeftArrow from './images/arrow_left_black.svg'

type WhiteLeftArrowButtonProps<T extends ElementType> = ComponentProps<T>

export default function WhiteLeftArrowButton<T extends ElementType>(
  props: WhiteLeftArrowButtonProps<T>,
) {
  const NewArrowButton = withClassName(
    withBackwardStyle(ArrowButton, {
      backgroundImage: `url(${LeftArrow})`,
    }),
    `bg-white`,
  )
  return <NewArrowButton {...props} />
}
