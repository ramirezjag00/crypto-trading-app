import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { BASE_URL } from '@constants/config'

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: 10000,
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

const request = <T>(
  method: 'POST' | 'GET' | 'PUT',
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    instance
      .request<T>({
        method,
        url,
        ...config,
      })
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((error: AxiosError<T>) => {
        if (error && error.response) {
          reject(error.response.data)
        } else {
          reject(error)
        }
      })
  })
}

const get = <T, K = unknown>(
  url: string,
  params?: K,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request('GET', url, {
    ...config,
    params,
  })
}

const post = <T, K = unknown>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<K> => {
  const requestConfig = {
    ...config,
    data,
  }
  return request<K>('POST', url, requestConfig)
}

const put = <T, K = unknown>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<K> => {
  const requestConfig = {
    ...config,
    data,
  }
  return request<K>('PUT', url, requestConfig)
}

export { get, post, put }
