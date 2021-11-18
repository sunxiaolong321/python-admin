import axios from 'axios'
import {
    ElMessage
} from 'element-plus'
axios.defaults.baseURL = '/api'
axios.defaults.headers['x-Requrested-With'] = 'XMLRequest'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false
axios.defaults.timeout = 1000

axios.interceptors.response.use((res) => {
    if (typeof res.data !== 'object') {
      ElMessage.error('服务端异常！')
      return Promise.reject(res)
    }
    if (res.data.resultCode != 200) {
      if (res.data.message) ElMessage.error(res.data.message)
      if (res.data.resultCode == 419) {
        router.push({ path: '/' })
      }
      
      return Promise.reject(res.data)
    }
  
    return res.data.data
  },
  (error) => {
    ElMessage.error('服务端异常！')
    return Promise.reject(error)
  })

export default axios