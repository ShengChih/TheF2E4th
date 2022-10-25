import { useState, useEffect, ComponentType } from 'react'
import BlackRightArrowButton from '@components/SlideArrowButton/BlackRightArrowButton'
import WhiteLeftArrowButton from '@components/SlideArrowButton/WhiteLeftArrowButton'

import mapIcon from './images/map.svg'
import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'


interface CitySliderProps<P = {}> {
	cities: CityInfo[]
	WrappedContainer: ComponentType<P>
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

export default function withCitySilder<P = {}>({
	WrappedContainer,
	cities
}: CitySliderProps<P>) {
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
		(city: CityInfo) => (
			<div
				style={{
					backgroundImage: `url(${city.imageUrl})`,
				}}
				className={`${baseStyles.city_container}`}
			>
				<div className={`${baseStyles.city_mask}`}></div>
				<img
					alt={city.name}
					src={`${mapIcon}`}
					className={`${baseStyles.city_map_icon} ${pcStyles.city_map_icon}`
				} />
				<div className={`${baseStyles.city_name} ${pcStyles.city_name}`}>{city.name}</div>
			</div>
		)
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
				className={`${pcStyles.city_grid}`}
				data={gridData}
			/>
			<div className={`${baseStyles.slide_control} ${pcStyles.slide_control}`}>
				{
					state.currentPage > 1
						? <WhiteLeftArrowButton
							className={`${baseStyles.slide_left} ${pcStyles.slide_left}`}
							onClick = { handleLeftClick }
						/>
						: ''
				}
				{
					state.currentPage < state.maxPage
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
