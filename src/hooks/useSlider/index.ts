import { useState, useEffect } from 'react'

interface SliderProps {
	totalRows: number
	maxRowsInContainer: number
}

type SliderState = {
	maxPage: number
	currentPage: number
}

const InitSliderState = {
	maxPage: 0,
	currentPage: 0,
}

const [prev, next] = [-1, 1]

export default function useSlider({ 
	totalRows,
	maxRowsInContainer
}: SliderProps) {
	const [state, setState] = useState<SliderState>(InitSliderState)

	useEffect(() => {
		setState({
			maxPage: Math.ceil(totalRows / maxRowsInContainer),
			currentPage: 1,
		})
	}, [])

	const maxPage = state.maxPage
	const currentPage = state.currentPage
	const start = (currentPage - 1) * maxRowsInContainer
	const end = (
		(start + maxRowsInContainer) > totalRows
		? totalRows
		: (start + maxRowsInContainer)
	)

	const wrappedClick = (val: number) => {
		return () => {
			setState({
				maxPage: state.maxPage,
				currentPage: state.currentPage + val,
			})
		}
	}

	const handleRightClick = wrappedClick(next)
	const handleLeftClick = wrappedClick(prev)

	return {
		start, end, currentPage, maxPage, handleLeftClick, handleRightClick
	}
}
