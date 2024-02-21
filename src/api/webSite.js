import { getRequest, postRequest,patchRequest } from '@/request/axios'

export default {
  getWebSite: (url) => {
    return getRequest(`${url}`)
  },
  addWebSite: (url, params) => {
    return patchRequest(`${url}/0/urlList`, params)
  }
  // delNote: (params) => {
  //   return delRequest(`note/${params}`)
  // },
  // putNote: (url1, params) => {
  //   return putRequest(`note`, url1, params)
  // }
}
