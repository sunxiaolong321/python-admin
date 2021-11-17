import axios from 'axios'
import {
    ElMessage
} from 'element-plus'
axios.defaults.baseURL = '/api'
axios.defaults.headers['x-Requrested-With'] = 'XMLRequest'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false
axios.defaults.timeout = 10000

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        return res.data
    }

    if (res.status != '200' & res.status != '0') {
        if (res.data.message) {
            ElMessage.error(res.data.message)
        }
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios