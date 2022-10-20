import React from 'react'

import BaseArrowButton from './BaseArrowButton'
import LeftArrow from './images/arrow_left_black.svg'

interface WhiteLeftArrowButtonProps {
	classNames?: string
}

export default function WhiteLeftArrowButton({ classNames }: WhiteLeftArrowButtonProps) {
	return <BaseArrowButton imageUrl={LeftArrow} classNames={classNames} />
}
