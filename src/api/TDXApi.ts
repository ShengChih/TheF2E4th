import { AxiosRequestConfig } from 'axios'
import HttpClient from "./HttpClient"
import qs from 'qs'

type BooleanStr = 'true' | 'false'

type HealthQuery = {
	health?: BooleanStr
}

type FormatStr = 'JSON' | 'XML'
type ODataQuery = {
	$select?: string
	$filter?: string
	$orderby?: string
	$top?: string
	$skip?: string
	$format?: FormatStr
}

export type CityStr = 'Taipei' |
	'NewTaipei' |
	'Taoyuan' |
	'Taichung' |
	'Tainan' |
	'Kaohsiung' |
	'Keelung' |
	'Hsinchu' |
	'HsinchuCounty' |
	'MiaoliCounty' |
	'ChanghuaCounty' |
	'NantouCounty' |
	'YunlinCounty' |
	'ChiayiCounty' |
	'Chiayi' |
	'PingtungCounty' |
	'YilanCounty' |
	'HualienCounty' |
	'TaitungCounty' |
	'KinmenCounty' |
	'PenghuCounty' |
	'LienchiangCounty'

export type CityChtStr = '台北市' |
	'新北市' |
	'桃園市' |
	'台中市' |
	'台南市' |
	'高雄市' |
	'基隆市' |
	'新竹市' |
	'新竹縣' |
	'苗栗縣' |
	'彰化縣' |
	'南投縣' |
	'雲林縣' |
	'嘉義縣' |
	'嘉義市' |
	'屏東縣' |
	'宜蘭縣' |
	'花蓮縣' |
	'台東縣' |
	'金門縣' |
	'澎湖縣' |
	'連江縣'

export type CityInfoGet = {
	City?: CityStr
} & ODataQuery & HealthQuery

export default class TDXApi extends HttpClient {
	private static classInstance?: TDXApi
	private client_id: string = ''
	private client_secret: string = ''
	private accessToken: string = ''


	public constructor() {
		super('https://tdx.transportdata.tw/')

		this._initializeHeaders()
	}

	public static getInstance() {
		if (!this.classInstance) {
      this.classInstance = new TDXApi();
    }

		return this.classInstance
	}

	private _initializeHeaders = () => { 
		this.instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
		this.instance.defaults.headers.common['Content-Type'] = 'application/json'
	}

	protected _handleRequest = (config: AxiosRequestConfig) => {
		return {
			...config,
			headers: {
				...config.headers,
				'Authorization': `Bearer ${this.accessToken}`
			}
		}
	}

	public setClientInfo = (client_id: string, client_secret: string) => {
		this.client_id = client_id
		this.client_secret = client_secret
	}

	public setAccessToken = (accessToken: string) => {
		this.accessToken = accessToken
		this._initializeRequestIntercepter()
	}

	public auth = () => {
		return this.instance.post(
			'/auth/realms/TDXConnect/protocol/openid-connect/token',
			{
				grant_type:"client_credentials",
        client_id: this.client_id,
        client_secret: this.client_secret
			},
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		)
	}

	public getCities = (params: ODataQuery) => {
		const $format = params.hasOwnProperty('$format')
			? {}
			: {
				$format: 'JSON'
			}

		const url = '/api/basic/v2/Basic/City'.concat(qs.stringify({
			...params,
			...$format
		}, { addQueryPrefix: true }))

		return this.instance.get(url)
	}

	protected getTourismApi = (apiPart: string) => {
		return (params: CityInfoGet) => {
			const { City, ...others } = params
			const $format = others.hasOwnProperty('$format')
				? {}
				: {
					$format: 'JSON'
				}
			const url = `/api/basic/v2/Tourism/${apiPart}`.concat(
				(!!City && typeof City === 'string' ? `/${City}` : '')
			).concat(qs.stringify({
				...others,
				...$format
			}, { addQueryPrefix: true }))

			return this.instance.get(url)
		}
	}

	public getScenicSpot = (params: CityInfoGet) => {
		return this.getTourismApi('ScenicSpot')(params)
	}

	public getRestaurant = (params: CityInfoGet) => {
		return this.getTourismApi('Restaurant')(params)
	}

	public getHotel = (params: CityInfoGet) => {
		return this.getTourismApi('Hotel')(params)
	}

	public getActivity = (params: CityInfoGet) => {
		return this.getTourismApi('Activity')(params)
	}
}