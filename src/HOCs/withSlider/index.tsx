import { ComponentType, ComponentProps, ElementType, ReactNode } from 'react'

import useSlider from '@hooks/useSlider'
import BlackRightArrowButton from '@components/SlideArrowButton/BlackRightArrowButton'
import WhiteLeftArrowButton from '@components/SlideArrowButton/WhiteLeftArrowButton'

import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

type ComponentAnyProps<T extends ElementType> = ComponentProps<T>

interface SliderProps<T extends ElementType> {
	WrappedContainer: ComponentType<ComponentAnyProps<T>>
	totalRows: number
	maxRowsInContainer: number
}

export default function withSlider<T extends ElementType>({
	WrappedContainer,
	totalRows,
	maxRowsInContainer
}: SliderProps<T>) {
	const {
		start,
		end,
		currentPage,
		maxPage,
		handleLeftClick,
		handleRightClick
	} = useSlider({
		totalRows: totalRows,
		maxRowsInContainer: maxRowsInContainer
	})

	const sliceFunc = (data: ReactNode[]) => data.slice(start, end)

	const SliderContainer = (props: ComponentAnyProps<T>) => (
		<>
			<WrappedContainer
				{...props}
			/>
			<div className={`${baseStyles.slide_control} ${pcStyles.slide_control}`}>
				{
					currentPage > 1
						? <WhiteLeftArrowButton
							className={`${baseStyles.slide_left} ${pcStyles.slide_left}`}
							onClick = { handleLeftClick }
						/>
						: ''
				}
				{
					currentPage < maxPage
						? <BlackRightArrowButton
								className={`${baseStyles.slide_right} ${pcStyles.slide_right}`}
								onClick={handleRightClick}
							/>
						: ''
				}
			</div>
		</>
	)

	return {
		SliderContainer,
		sliceFunc
	}
}
