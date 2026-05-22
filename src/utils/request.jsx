import axios from 'axios'
import { getLocalStorage } from './LocalStorage.jsx'
import { removeLocalStorage } from './LocalStorage.jsx'
import { Navigate } from 'react-router-dom'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 7000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
  const token = getLocalStorage('token')
  //判断本地是否有token，如果有则将token注入请求头中
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么



  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    removeLocalStorage('token')
    return <Navigate to="/login" />
  }
  return Promise.reject(error)
})

export { http }
