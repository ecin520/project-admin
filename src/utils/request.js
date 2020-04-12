import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from './auth'
import router from '../router'


const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 18000
})

service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = getToken()
  }
  return config
}, error => {
  Message({ message: error, type: 'error' })
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  const resp = response.data
  if (resp.code !== 200) {
    Message({message: resp.message, type: 'error'})
    if (resp.code === 403) {
      store.dispatch('logout')
      router.push({path: '/login'});
    }
  } else if (resp.code === 200 || response.code === 200) {
    return resp
  }
}, error => {
  Message({ message: error, type: 'error' })
  return Promise.reject(error)
})

export default service