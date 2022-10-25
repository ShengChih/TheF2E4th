import React from "react";

import withSectionTitle from "@HOCs/withSectionTitle";
import TriangleIcon from '@components/SectionTitle/images/Triangle.svg'

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

export default function PopularFestival() {
	const FestivalSection = withSectionTitle({
		WrappedContainer: div,
		title: '熱門活動',
		iconUrl: TriangleIcon
	})

	return (
		<div className={`${baseStyles.city_suggestion} ${pcStyles.city_suggestion}`}>
			<FestivalSection />
		</div>
	)
}