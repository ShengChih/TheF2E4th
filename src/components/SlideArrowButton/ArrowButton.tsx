import { ComponentProps, ElementType } from 'react'
import withAll from '@HOC/withAll'
import BaseArrowButton from '@components/SlideArrowButton/BaseArrowButton'
import pcStyles from './styles/pc.module.scss'

type ArrowButtonProps<T extends ElementType> = ComponentProps<T> & {
	imageUrl: string
}

export default function ArrowButton<T extends ElementType>({ imageUrl, ...props}: ArrowButtonProps<T>) {
	return withAll({
		WrappedComponent: BaseArrowButton,
		componentProps: {
			...props,
			style: {
				backgroundImage: `url(${imageUrl})`,
				...props?.style
			},
			className: `${pcStyles.arrow_button} ${props?.className}`
		}
	})
}
