import React from "react";
import SectionTitle from "@components/SectionTitle"

import GridContainer from '@components/GridContainer'
import withCitySilder from '@HOC/withCitySilder'

import "./styles/base.scss"
import "./styles/pc.scss"

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
			className: "city_grid"
		},
		cities: cities
	})

	return (
		<div className="city_suggestion city_suggestion--pc">
			<SectionTitle className={"city_title"} title={'熱門城市'} imageUrl={''} />
			<CitySliderShow />
		</div>
	)
}
