import axios from 'axios'
import { Loading, Message } from 'element-ui'

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
  const loadingInstance = Loading.service({ fullscreen: true, text: '正在上传...' }) // 启动全屏加载提示
  try {
    const imageUrl = 'https://api.github.com/repos/' + repo + '/contents/' + files + '.png'
    const body = { message: 'upload', content }
    const headers = {
      Authorization: `token ${cutToken}${tailToken}`,
      Accept: 'application/vnd.github.v3+json'
    }
    await axios.put(imageUrl, body, { headers })
    // 如果上传成功，关闭加载提示并返回文件名
    Message.success('上传github成功！！回显由于网络延迟，显示不出来或显示较缓慢属于正常现象')
    return files + '.png'
  } catch (error) {
    // 如果上传失败，关闭加载提示并显示错误信息
    Message.error('上传失败: ' + error.toString())
    return null
  } finally {
    loadingInstance.close()
  }
}
export default {
  uploader
}
