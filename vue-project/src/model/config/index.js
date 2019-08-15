import axios from 'axios'
// axios 拦截器（中间件）
// 请求拦截器： 给请求增加通用配置，例如在头信息中增加token
axios.interceptors.request.use((config) => {
  return config
})

// 响应拦截器： 对处理服务端响应的数据进行通用处理
axios.interceptors.response.use((res) => {
  // 1. 对响应数据进行处理
  // 2. 对返回的状态码做统一的处理
  if (res.data.code === -1000) {
    return
  }
  return res.data
})

export default axios
