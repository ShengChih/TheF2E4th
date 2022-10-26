import { useState, useEffect, ComponentType, ReactNode } from 'react'
import useSlider from '@hooks/useSlider'
import BlackRightArrowButton from '@components/SlideArrowButton/BlackRightArrowButton'
import WhiteLeftArrowButton from '@components/SlideArrowButton/WhiteLeftArrowButton'

import mapIcon from './images/map.svg'
import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

type CityInfo = {
	name: string
	imageUrl: string
}

type WrappedContainerProps = {
	className?: string | undefined
	data: ReactNode[]
}

interface CitySliderProps {
	cities: CityInfo[]
	WrappedContainer: ComponentType<WrappedContainerProps>
}

type SliderState = {
	cities: ReactNode[]
}

const InitSliderState = {
	cities: [],
}

export default function withCitySilder({
	WrappedContainer,
	cities
}: CitySliderProps) {
	const {
		start,
		end,
		currentPage,
		maxPage,
		handleLeftClick,
		handleRightClick
	} = useSlider({
		totalRows: cities.length,
		maxRowsInContainer: 7
	})
	const [state, setState] = useState<SliderState>(InitSliderState)

	useEffect(() => {
		const newCities = cities.map(
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
		)

		setState({
			cities: newCities
		})
	}, [])

	const gridData = state.cities.slice(start, end)

	return () => (
		<>
			<WrappedContainer
				className={`${baseStyles.city_grid} ${pcStyles.city_grid}`}
				data={gridData}
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
