import { ComponentType, ReactNode } from 'react'
import useSlider from '@hooks/useSlider'
import BlackRightArrowButton from '@components/SlideArrowButton/BlackRightArrowButton'
import WhiteLeftArrowButton from '@components/SlideArrowButton/WhiteLeftArrowButton'

import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

type WrappedContainerProps = {
	className?: string | undefined
	data: ReactNode[]
}

interface SliderProps {
	WrappedContainer: ComponentType<WrappedContainerProps>
	totalRows: number
	maxRowsInContainer: number
}

export default function withSlider({
	WrappedContainer,
	totalRows,
	maxRowsInContainer
}: SliderProps) {
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

	return (props: WrappedContainerProps) => (
		<>
			<WrappedContainer
				{...props} data={props.data.slice(start, end)}
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
}
