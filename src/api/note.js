import { getRequest, postRequest,delRequest } from '@/request/axios'

export default {
  getNote: (params) => {
    return getRequest('note', params)
  },
  postNote: (params) => {
    return postRequest('note', params)
  },
  delNote: (params) => {
    return delRequest(`note/${params}`)
  }
}
