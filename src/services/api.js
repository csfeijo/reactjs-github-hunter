import axios from 'axios'
import configureMock from './configureMock'

const baseURL = 'https://api.github.com/'
const mockRequests = false


const api = axios.create({
  baseURL
})

if (mockRequests) {
  configureMock(api)
}

export default api