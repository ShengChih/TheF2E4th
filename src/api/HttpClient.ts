import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

//declare module 'axios' {
//  interface AxiosResponse<T = any> extends Promise<T> { }
//}

abstract class HttpClient {
  protected readonly instance: AxiosInstance

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })

    this._initializeResponseIntercepter()
  }

  protected _initializeRequestIntercepter = () => {
    this.instance.interceptors.request.use(this._handleRequest, this._handleError)
  }

  private _initializeResponseIntercepter = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError)
  }

  protected _handleRequest = (config: AxiosRequestConfig) => config

  private _handleResponse = (response: AxiosResponse) => response

  protected _handleError = (error: unknown) => Promise.reject(error)
}

export default HttpClient

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)
