import ArrowButton from '@components/SlideArrowButton/ArrowButton'
import RightArrow from './images/arrow_right_white.svg'

interface BlackRightArrowButtonProps<P = any> {
	containerProps: P
}

export default function BlackRightArrowButton({ containerProps }: BlackRightArrowButtonProps) {
	return <ArrowButton imageUrl={RightArrow} containerProps={containerProps} />
}
