import React, { MouseEvent } from "react";
import Grid2x2 from '@components/Grid2x2'
import FestivalCard, { FestivalCardProps } from "@components/FestivalCard";
import withSectionTitle from "@HOCs/withSectionTitle";
import TriangleIcon from '@components/SectionTitle/images/Triangle.svg'
import CardImage1 from './images/card_1.png'
import CardImage2 from './images/card_2.png'
import CardImage3 from './images/card_3.png'
import CardImage4 from './images/card_4.png'

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

export default function PopularFestival() {
	const onClick = (e: MouseEvent<HTMLElement>) => {
		console.log(`onClick`)
	}
	const activities = [
		{
			title: '合歡山國際暗空公園-星空清境跨年活動',
			summary: '南投縣與各單位多年於合歡山舉辦清境高山跨年晚會活動，今年將活動主軸由傳統跨年晚會轉化成為台灣高山星空遊程之體驗活動，以剛通過美國IDA認證的華語區第一座國際暗空公園作為宣傳主題，在擁有東南的的..',
			location: '南投縣 仁愛鄉',
			mainImage: CardImage1
		},
		{
			title: '2021臺北燈節',
			summary: '俗稱「小過年」的元宵節是源遠流長的傳統民俗節慶，臺北市政府自民國86年（西元1997年）辦理「臺北燈節」以來，歷經逾20年的蘊育及特色養成，成為民眾春節期間不可或缺的參觀去處，不僅將新年的歡慶氣...',
			location: '臺北市 萬華區',
			mainImage: CardImage2
		},
		{
			title: '2021陽明山花季',
			summary: '南投縣與各單位多年於合歡山舉辦清境高山跨年晚會活動，今年將活動主軸由傳統跨年晚會轉化成為台灣高山星空遊程之體驗活動，以剛通過美國IDA認證的華語區第一座國際暗空公園作為宣傳主題，在擁有東南的的..',
			location: '臺北市 北投區',
			mainImage: CardImage3
		},
		{
			title: '2021 TIFA台灣國際藝術節',
			summary: 'TIFA台灣國際藝術節為台灣一年一度最重要的藝術節慶、亞洲最具亮點的藝文盛會。「T、I、F、A」以滿溢的藝術才華（Talent）、具創意啟發的內容（Inspiration）號召眾人共享這場藝術的...',
			location: '臺北市 中正區',
			mainImage: CardImage4
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