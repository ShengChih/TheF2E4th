import React, { MouseEvent, useEffect } from "react";

import TDXApi, { CityInfoGet } from '@api/TDXApi'

import BlackRightArrowButton from '@components/SlideArrowButton/BlackRightArrowButton'
import WhiteLeftArrowButton from '@components/SlideArrowButton/WhiteLeftArrowButton'
import GridContainer from '@components/GridContainer'
import Triangle from "@components/SectionIcon/Triangle";
import withClassName from '@HOCs/withClassName'
import withSlider from '@HOCs/withSlider'
import withSectionTitle from "@HOCs/withSectionTitle"

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

import mapIcon from './images/map.svg'
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

// type CityType = CityStr | CityStr[]
type CityApiParamType = CityInfoGet // Omit<CityInfoGet, 'City'> & { City: CityType }

type CityInfo = {
	name: string
	imageUrl: string,
	apiParams: CityApiParamType
}

const api = TDXApi.getInstance()

export default function PopularCity() {
	useEffect(() => {
		const AllCityName = `All City`
			
		if (!!!localStorage.getItem(AllCityName)) {
			api.getCities({}).then(({ data }) => {
				localStorage.setItem(AllCityName, JSON.stringify(data))
			})
		}
	}, [])
	
	const cities: CityInfo[] = [
		{
			name: "台北",
			imageUrl: Taipei,
			apiParams: {
				City: 'Taipei',
				$top: '10',
			}
		},
		{
			name: "新北",
			imageUrl: NewTaipei,
			apiParams: {
				City: 'NewTaipei',
				$top: '10',
			}
		},
		{
			name: "桃園",
			imageUrl: Taoyuan,
			apiParams: {
				City: 'Taoyuan',
				$top: '10',
			}
		},
		{
			name: "新竹、苗栗",
			imageUrl: Hsinchu,
			apiParams: {
				City: 'Hsinchu',
				$top: '10',
			}
		},
		{
			name: "台中",
			imageUrl: Taichung,
			apiParams: {
				City: 'Taichung',
				$top: '10',
			}
		},
		{
			name: "南投",
			imageUrl: Nantou,
			apiParams: {
				City: 'NantouCounty',
				$top: '10',
			}
		},
		{
			name: "嘉義",
			imageUrl: Chiayi,
			apiParams: {
				City: 'Chiayi',
				$top: '10',
			}
		},
		{
			name: "台南",
			imageUrl: Tainan,
			apiParams: {
				City: 'Tainan',
				$top: '10',
			}
		},
		{
			name: "高雄",
			imageUrl: Kaohsiung,
			apiParams: {
				City: 'Kaohsiung',
				$top: '10',
			}
		},
		{
			name: "屏東",
			imageUrl: Pingtung,
			apiParams: {
				City: 'PingtungCounty',
				$top: '10',
			}
		},
		{
			name: "宜蘭",
			imageUrl: Yilan,
			apiParams: {
				City: 'YilanCounty',
				$top: '10',
			}
		},
		{
			name: "花蓮",
			imageUrl: Hualien,
			apiParams: {
				City: 'HualienCounty',
				$top: '10',
			}
		},
		{
			name: "台東",
			imageUrl: Taitung,
			apiParams: {
				City: 'TaitungCounty',
				$top: '10',
			}
		},
		{
			name: "澎湖、金門、馬祖",
			imageUrl: PenghuKinmenMatsu,
			apiParams: {
				City: 'PenghuCounty',
				$top: '10',
			}
		},
	]

	const LeftButton = withClassName(
		WhiteLeftArrowButton,
		`${baseStyles.slide_button} ${pcStyles.slide_left}`
	)
	const RightButton = withClassName(
		BlackRightArrowButton,
		`${baseStyles.slide_button} ${pcStyles.slide_right}`
	)

	const linkCityInfo = (apiParams: CityApiParamType) => {
		return (e: MouseEvent<HTMLElement>) => {
			// for testing api
			const CityName = (apiParams.City ?? '')
			const ActivityName = `${CityName} Activity`
			const RestaurantName = `${CityName} Restaurant`
			
			if (!!!localStorage.getItem(ActivityName)) {
				api.getActivity(apiParams)
					.then(({ data }) => {
						localStorage.setItem(`${ActivityName}`, JSON.stringify(data))
					})
			}

			if (!!!localStorage.getItem(RestaurantName)) {
				api.getRestaurant(apiParams)
					.then(({ data }) => {
						localStorage.setItem(`${RestaurantName}`, JSON.stringify(data))
					})
			}
		}
	}

	const data = cities.map(
			(city: CityInfo) => (
				<div
					style={{
						backgroundImage: `url(${city.imageUrl})`,
					}}
					className={`${baseStyles.city_container}`}
					onClick={linkCityInfo(city.apiParams)}
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

	const { SliderContainer: CitySliderShow, sliceFunc } = withSlider({
		WrappedContainer: GridContainer,
		LeftButton: LeftButton,
		RightButton: RightButton,
		totalRows: cities.length,
		maxRowsInContainer: 7
	})

	const CitySection = withSectionTitle({
		WrappedContainer: CitySliderShow,
		title: '熱門城市',
		icon: <Triangle className={`${baseStyles.city_section_icon}`} />
	})

	return (
		<div className={`${baseStyles.city_suggestion} ${pcStyles.city_suggestion}`}>
			<CitySection
				className={`${baseStyles.city_grid} ${pcStyles.city_grid}`}
				data={sliceFunc(data)}
			/>
		</div>
	)
}
