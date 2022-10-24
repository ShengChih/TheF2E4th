import React, { useState, useEffect, ComponentType, useCallback } from 'react'
import BlackRightArrowButton from '@components/SlideArrowButton/BlackRightArrowButton'
import WhiteLeftArrowButton from '@components/SlideArrowButton/WhiteLeftArrowButton'

interface CitySliderProps<P = any> {
	WrappedContainer: ComponentType<P>
	containerProps: P
	cities: CityInfo[]
}

type CityInfo = {
	name: string
	imageUrl: string
}

type SlideState = {
	cities: CityInfo[]
	maxPage: number
	currentPage: number
}

const InitSlideState = {
	cities: [],
	maxPage: 0,
	currentPage: 0,
}

export default function withCitySilder({
	WrappedContainer,
	containerProps,
	cities
}: CitySliderProps) {
	const [state, setState] = useState<SlideState>(InitSlideState)

	useEffect(() => {
		setState({
			cities: cities,
			maxPage: Math.ceil(cities.length / 7),
			currentPage: 1,
		})
	}, [])

	const start = (state.currentPage - 1) * 7
	const end = (start + 7) > state.cities.length ? state.cities.length : (start + 7)
	const gridData = state.cities.map(
		(city: CityInfo) => (<div>{city.name}</div>)
	).slice(start, end)

	const wrappedClick = (val: number) => {
		return () => {
			setState({
				...state,
				currentPage: state.currentPage + val,
			})
		}
	}

	const handleRightClick = wrappedClick(1)
	const handleLeftClick = wrappedClick(-1)

	return () => (
		<>
			<WrappedContainer
				{...containerProps}
				data={gridData}
			/>
			<div className="slide_control">
				{
					state.currentPage > 1
						? <WhiteLeftArrowButton containerProps={{
							className: 'slide_left',
							onClick: handleLeftClick
						}} />
						: ''
				}
				{
					state.currentPage < state.maxPage
						? <BlackRightArrowButton
							containerProps={{
								className: 'slide_right',
								onClick: handleRightClick
							}} />
						: ''
				}
			</div>
		</>
	)
}
