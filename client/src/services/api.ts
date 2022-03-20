import Axios from 'axios'
import { BASE_URL } from '../globals'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: any) => Promise.reject(error)
)

export default Client
