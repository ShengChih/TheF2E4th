
import GridContainer from '@components/GridContainer'
import Rectangle from '@components/SectionIcon/Rectangle'
import PopularCard, { PopularCardProps } from '@components/PopularCard'
import withSectionTitle from '@HOCs/withSectionTitle'

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"
import NoImage from './images/NoImage.svg'

export default function PopularFood() {
	const foods = [
		{
			title: '正濱漁港懷舊碼頭',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '雲林 / 馬蹄蛤生態休閒園區(獲選參加2010台灣美食展...',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '雲林 / 馬蹄蛤生態休閒園區(獲選參加2010台灣美食展...',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '正濱漁港懷舊碼頭',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '雲林 / 馬蹄蛤生態休閒園區(獲選參加2010台灣美食展...',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '正濱漁港懷舊碼頭',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '正濱漁港懷舊碼頭',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '雲林 / 馬蹄蛤生態休閒園區(獲選參加2010台灣美食展...',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '正濱漁港懷舊碼頭',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
		{
			title: '正濱漁港懷舊碼頭',
			imageUrl: NoImage,
			location: '基隆市中正區'
		},
	]
	const newFoods = foods.map((food: PopularCardProps, index: number) =>
		<PopularCard {...food} />
	)
	const FoodSection = withSectionTitle({
		WrappedContainer: GridContainer,
		title: '熱門餐飲',
		icon: <Rectangle className={`${baseStyles.food_section_icon}`} />
	})

	return (
		<div className={`${baseStyles.food_suggestion} ${pcStyles.food_suggestion}`}>
			<FoodSection
				className={`${baseStyles.food_grid} ${pcStyles.food_grid}`}
				data={newFoods}
			/>
		</div>
	)
}
