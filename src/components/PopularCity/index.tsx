import React from "react";
import SectionTitle from "@components/SectionTitle"

import GridContainer from '@components/GridContainer'
import withCitySilder from '@HOC/withCitySilder'

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

type CityInfo = {
	name: string
	imageUrl: string
}

interface PopularCity {
	cities: CityInfo[]
}

export default function PopularCity({ cities }: PopularCity) {
	const CitySliderShow = withCitySilder({
		WrappedContainer: GridContainer,
		containerProps: {
			className: `${pcStyles.city_grid}`
		},
		sliderContainerClassName: `${pcStyles.slide_control}`,
		leftButtonClassName: `${pcStyles.slide_left}`,
		rightButtonClassName: `${pcStyles.slide_right}`,
		cities: cities
	})

	return (
		<div className={`${baseStyles.city_suggestion} ${pcStyles.city_suggestion}`}>
			<SectionTitle className={`${baseStyles.city_title} ${pcStyles.city_title}`} title={'熱門城市'} imageUrl={''} />
			<CitySliderShow />
		</div>
	)
}
