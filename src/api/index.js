import axios from 'axios'
import {ElMesssage} from 'element-plus'

axios.defaults.baseURL = 'http://localhost:8000/api/'

axios.defaults.headers['x-Requrested-With'] = 'XMLRequest'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        return res.data
    }

    if (res.data.ResultCode != '200') {
        if (res.data.message) ElMesssage.error(res.data.message)
        return Promise.reject(res.data)
    }
    return res.data.data
})

export default axios