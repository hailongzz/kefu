import axios from 'axios'
import utils from './utils'
// 设置全局axios默认值
// axios.defaults.timeout = 30000; //30s的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//获取验签
let  timeStamp = Date.parse (new Date ()) / 1000;
  function getSign(){
    let util =   utils.gainPhone({
      appKey: '7863228592',
      timestamp: timeStamp,
      accessToken:sessionStorage.getItem('accessToken'),
      accountID:sessionStorage.getItem('accountID'),
      })
  return util
  }
  //添加头部
  let headers = {
    appKey: '7863228592',
    timestamp: timeStamp,
    accessToken:sessionStorage.getItem('accessToken'),
    accountID:sessionStorage.getItem('accountID'),
    sign: getSign()
  }
// 创建axios实例
const service = axios.create({
  headers:headers,
  // baseURL: process.env.BASE_API, // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  timeout: 10000
})

// 响应拦截
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 状态码
    const { ERRORCODE } = dataAxios
    // 根据 ERRORCODE 进行判断
    if (ERRORCODE === undefined) {
      // 如果没有 ERRORCODE 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      // 有 ERRORCODE 代表这是一个后端接口 可以进行进一步的判断
      switch (ERRORCODE) {
        case 0:
          // [ 示例 ] ERRORCODE === 0 代表没有错误
          return dataAxios.RESULT
        case '0':
          // [ 示例 ] ERRORCODE === '0' 代表没有错误
          return dataAxios.RESULT
        case 302:
          // 如果后台返回302，需要跳转到首页，让用户登录
          window.location.href = dataAxios.URL
          // 需要重新登录
          break
        default:
          // 不是正确的 ERRORCODE
          if (process.env.NODE_ENV === 'development') {
            console.log('>>>>>> Error >>>>>>')
            console.log(dataAxios, 11111)
          }
          return Promise.reject(dataAxios)
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址不存在: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    console.log(error.message)
    return Promise.reject(error)
  }
)

export default (url = '', data = {}, type = 'get') => {
  if (type.toLowerCase() === 'get') {
    return new Promise((resolve, reject) => {
      service
        .get(url, { params: data })
        .then(resp => {
          resolve(resp)
          // console.log(resp)
          // if (resp.data.ERRORCODE === 302) {
          //   window.location.href = resp.data.URL
          // } else {
          // resolve(resp.data)
          // }
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put') {
    return new Promise((resolve, reject) => {
      service
        .post(url, data)
        .then(resp => {
          resolve(resp)
        })
        .catch(e => {
          resolve({ status: 'error', errCode: e.ERRORCODE, msg: e.RESULT.msg })
        })
    })
  }
}