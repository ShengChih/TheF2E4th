import ArrowButton from '@components/SlideArrowButton/ArrowButton'
import LeftArrow from './images/arrow_left_black.svg'

interface WhiteLeftArrowButtonProps<P = any> {
	containerProps: P
}

export default function WhiteLeftArrowButton({ containerProps }: WhiteLeftArrowButtonProps) {
	return <ArrowButton imageUrl={LeftArrow} containerProps={containerProps} />
}
