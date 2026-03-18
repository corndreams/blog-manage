import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  //baseURL: 'https://server.corndreams.top',
  timeout: 10000,
})

let authToken = ''
export function setAuthToken(t: string) {
  authToken = t || ''
}

http.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers || {}
    ;(config.headers as any).token = authToken
  }
  return config
})

http.interceptors.response.use((res) => res, (err) => Promise.reject(err))

export default http