import { getRequest, postRequest, delRequest, putRequest } from '@/request/axios'

export default {
  getNote: (params) => {
    return getRequest('note', params)
  },
  postNote: (params) => {
    return postRequest('note', params)
  },
  delNote: (params) => {
    return delRequest(`note/${params}`)
  },
  putNote: (url1, params) => {
    return putRequest(`note`, url1, params)
  }
}
