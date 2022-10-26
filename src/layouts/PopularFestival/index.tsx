import React, { MouseEvent } from "react";
import Grid2x2 from '@components/Grid2x2'
import FestivalCard, { FestivalCardProps } from "@components/FestivalCard";
import withSectionTitle from "@HOCs/withSectionTitle";
import TriangleIcon from '@components/SectionTitle/images/Triangle.svg'

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

export default function PopularFestival() {
	const onClick = (e: MouseEvent<HTMLElement>) => {
		console.log(`onClick`)
	}
	const activities = [
		{
			title: '123',
			summary: '123',
			location: 'Tainan',
		},
		{
			title: '123',
			summary: '123',
			location: 'Tainan',
		},
		{
			title: '123',
			summary: '123',
			location: 'Tainan',
		},
		{
			title: '123',
			summary: '123',
			location: 'Tainan',
		},
	].map((activity: FestivalCardProps) =>
		<FestivalCard {...activity} onClickActivityDetail={onClick} />
	)

	const FestivalSection = withSectionTitle({
		WrappedContainer: Grid2x2,
		title: '熱門活動',
		iconUrl: TriangleIcon
	})

	return (
		<div className={`${baseStyles.festival_suggestion} ${pcStyles.festival_suggestion}`}>
			<FestivalSection
				className={`${baseStyles.festival_grid} ${pcStyles.festival_grid}`}
				data={activities}
			/>
		</div>
	)
}