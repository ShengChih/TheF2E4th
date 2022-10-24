import withAll from '@HOC/withAll'
import BaseArrowButton from '@components/SlideArrowButton/BaseArrowButton'
import pcStyles from './styles/pc.module.scss'

interface ArrowButtonProps<P = any> {
	imageUrl: string
	containerProps: P
}

export default function ArrowButton({ imageUrl, containerProps }: ArrowButtonProps) {
	return withAll({
		WrappedComponent: BaseArrowButton,
		componentProps: {
			...containerProps,
			style: {
				backgroundImage: `url(${imageUrl})`,
				...containerProps?.style
			},
			className: `${pcStyles.arrow_button} ${containerProps?.className}`
		}
	})
}
