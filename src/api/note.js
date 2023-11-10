import { getRequest, postRequest } from '@/request/axios'

export default {
  getNote: (params) => {
    return getRequest('note',params)
  },
  postNote: (params) => {
    return postRequest('note', params)
  }
}
