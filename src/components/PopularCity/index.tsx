import React from "react";
import SectionTitle from "@components/SectionTitle"

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
	return (
		<div className="city_suggestion city_suggestion--pc">
			<SectionTitle className={"city_title"} title={'熱門城市'} imageUrl={''} />
			<section className="popular_city">
				<div><div>01</div></div>
				<div><div>02</div></div>
				<div><div>03</div></div>
				<div><div>04</div></div>
				<div><div>05</div></div>
				<div><div>06</div></div>
				<div><div>07</div></div>
			</section>
		</div>
	)
}
