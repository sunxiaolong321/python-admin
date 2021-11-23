import axios from 'axios'
import {
  ElMessage
} from 'element-plus'

axios.defaults.baseURL = '/api'
axios.defaults.headers['x-Requrested-With'] = 'XMLRequest'
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = false
axios.defaults.timeout = 1000


axios.interceptors.response.use((res) => {
    if (typeof res.data !== 'object') {
      ElMessage.error('服务端异常！')
      return Promise.reject(res)
    }
    if (res.status != 200) {
      if (res.status) ElMessage.error(res.data.message)
      if (res.status == 419) {
        router.push({
          path: '/'
        })
      }
      return Promise.reject(res.data)
    }

    return res.data
  },
  (error) => {
    ElMessage.error('服务端异常！')
    return Promise.reject(error)
  })

export default axios