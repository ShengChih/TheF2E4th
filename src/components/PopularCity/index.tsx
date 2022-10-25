import React from "react";

import GridContainer from '@components/GridContainer'
import withCitySilder from '@HOCs/withCitySilder'
import withSectionTitle from "@HOCs/withSectionTitle"

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

	const CitySection = withSectionTitle({
		WrappedContainer: CitySliderShow,
		title: '熱門城市'
	})

	return (
		<div className={`${baseStyles.city_suggestion} ${pcStyles.city_suggestion}`}>
			<CitySection />
		</div>
	)
}
