import React from "react";

import GridContainer from '@components/GridContainer'
import withCitySilder from '@HOCs/withCitySilder'
import withSectionTitle from "@HOCs/withSectionTitle"

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

import Taipei from "./images/Taipei.png"
import NewTaipei from "./images/NewTaipei.png"
import Taoyuan from "./images/Taoyuan.png"
import Hsinchu from "./images/Hsinchu.png"
import Taichung from "./images/Taichung.png"
import Nantou from "./images/Nantou.png"
import Chiayi from "./images/Chiayi.png"
import Tainan from "./images/Tainan.png"
import Kaohsiung from "./images/Kaohsiung.png"
import Pingtung from "./images/Pingtung.png"
import Yilan from "./images/Yilan.png"
import Hualien from "./images/Hualien.png"
import Taitung from "./images/Taitung.png"
import PenghuKinmenMatsu from "./images/Penghu_Kinmen_Matsu.png"

type CityInfo = {
	name: string
	imageUrl: string
}

export default function PopularCity() {
	const cities: CityInfo[] = [
		{
			name: "台北",
			imageUrl: Taipei
		},
		{
			name: "新北",
			imageUrl: NewTaipei
		},
		{
			name: "桃園",
			imageUrl: Taoyuan
		},
		{
			name: "新竹",
			imageUrl: Hsinchu
		},
		{
			name: "台中",
			imageUrl: Taichung
		},
		{
			name: "南投",
			imageUrl: Nantou
		},
		{
			name: "嘉義",
			imageUrl: Chiayi
		},
		{
			name: "台南",
			imageUrl: Tainan
		},
		{
			name: "高雄",
			imageUrl: Kaohsiung
		},
		{
			name: "屏東",
			imageUrl: Pingtung
		},
		{
			name: "宜蘭",
			imageUrl: Yilan
		},
		{
			name: "花蓮",
			imageUrl: Hualien
		},
		{
			name: "台東",
			imageUrl: Taitung
		},
		{
			name: "澎湖、金門、馬祖",
			imageUrl: PenghuKinmenMatsu
		},
	]

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
