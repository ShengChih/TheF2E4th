import React from 'react'

import BaseArrowButton from './BaseArrowButton'
import RightArrow from './images/arrow_right_white.svg'

interface BlackRightArrowButtonProps {
	classNames?: string
}

export default function BlackRightArrowButton({ classNames }: BlackRightArrowButtonProps) {
	return <BaseArrowButton imageUrl={RightArrow} classNames={classNames} />
}
