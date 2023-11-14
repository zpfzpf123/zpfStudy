import axios from 'axios'
import { Message } from 'element-ui'
// 统一请求路径前缀
const baseApi = 'http://localhost:3000/'

// 超时设定
axios.defaults.timeout = 1000

axios.interceptors.request.use(config => {
  return config
}, err => {
  // Message.error('请求超时')
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  return response.data
}, (err) => {
  // 返回状态码不为200时候的错误处理
  // Message.error(err.toString())
  return Promise.reject(err)
})

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${baseApi}${url}`,
    params: params
  })
}

export const delRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${baseApi}${url}`,
    params: params
  })
}
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${baseApi}${url}`,
    data: params
  })
}

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${baseApi}${url}`,
    data: params
  })
}
