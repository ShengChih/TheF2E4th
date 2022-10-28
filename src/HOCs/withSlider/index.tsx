import {
	ComponentType,
	ComponentProps,
	ElementType,
	ReactNode,
	MouseEvent
} from 'react'

import useSlider from '@hooks/useSlider'

import baseStyles from './styles/base.module.scss'

type ComponentAnyProps<T extends ElementType> = ComponentProps<T>
type ButtonComponentProps = {
	onClick: (e: MouseEvent<HTMLElement>) => void
}

interface SliderProps<T extends ElementType> {
	WrappedContainer: ComponentType<ComponentAnyProps<T>>
	LeftButton: ComponentType<ButtonComponentProps>
	RightButton: ComponentType<ButtonComponentProps>
	totalRows: number
	maxRowsInContainer: number
}

export default function withSlider<T extends ElementType>({
	WrappedContainer,
	LeftButton,
	RightButton,
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
			{
				currentPage > 1
					? <LeftButton onClick = { handleLeftClick } />
					: ''
			}
			{
				currentPage < maxPage
					? <RightButton onClick={handleRightClick} />
					: ''
			}
		</>
	)

	return {
		SliderContainer,
		sliceFunc
	}
}
