import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.timeout = 10000
axios.interceptors.response.use(response => {
  return response
}, (err) => {
  // 返回状态码不为200时候的错误处理
  Message.error(err.toString())
  return Promise.reject(err)
})
const repo = 'zpfzpf123/images' // 填你的仓库 repo
const cutToken = 'ghp_lUbD67XeagTCo' // 填你的 Token
const tailToken = 'kcXfLOOXA01XYysbz0hGN73'
const uploader = async(content, files) => {
  const path = `${files.name}`
  // const path = `${content.name}`
  const imageUrl = 'https://api.github.com/repos/' + repo + '/contents/' + path
  const body = { message: 'upload', content }
  const headers = {
    Authorization: `token ${cutToken}${tailToken}`,
    // 'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/vnd.github.v3+json'
  }
  const res = await axios.put(imageUrl, body, { headers })
  // 直接取得返回的图片地址
  // return res?.content?.download_url
  return `https://fastly.jsdelivr.net/gh/${repo}@main/${path}`
}
export default {
  uploader}
