import { ComponentProps, ElementType } from 'react'
import withAll from '@HOC/withAll'
import BaseArrowButton from '@components/SlideArrowButton/BaseArrowButton'
import pcStyles from './styles/pc.module.scss'

export default function ArrowButton<T extends ElementType>(props: ComponentProps<T>) {
	return withAll({
		WrappedComponent: BaseArrowButton,
		componentProps: {
			...props,
			className: `${pcStyles.arrow_button} ${props?.className}`
		}
	})
}
