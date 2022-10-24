import { useState, useEffect, ComponentType, ComponentPropsWithRef, ElementType } from 'react'
import BlackRightArrowButton from '@components/SlideArrowButton/BlackRightArrowButton'
import WhiteLeftArrowButton from '@components/SlideArrowButton/WhiteLeftArrowButton'

import baseStyles from './styles/base.module.scss'


interface CitySliderProps<T extends ElementType, P = any> {
	cities: CityInfo[]
	WrappedContainer: ComponentType<P>
	containerProps: ComponentPropsWithRef<T>
	sliderContainerClassName?: string
	leftButtonClassName?: string
	rightButtonClassName?: string
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

export default function withCitySilder<T extends ElementType, P = any>({
	WrappedContainer,
	containerProps,
	sliderContainerClassName,
	leftButtonClassName,
	rightButtonClassName,
	cities
}: CitySliderProps<T, P>) {
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
				{
					...containerProps
				}
				data={gridData}
			/>
			<div className={`${baseStyles.slide_control} ${sliderContainerClassName}`}>
				{
					state.currentPage > 1
						? <WhiteLeftArrowButton
							className={`${baseStyles.slide_left} ${leftButtonClassName}`}
							onClick = { handleLeftClick }
						/>
						: ''
				}
				{
					state.currentPage < state.maxPage
						? <BlackRightArrowButton
								className={`${baseStyles.slide_right} ${rightButtonClassName}`}
								onClick={handleRightClick}
							/>
						: ''
				}
			</div>
		</>
	)
}
