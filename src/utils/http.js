/**
 * @Description: axios封装
 * @author lyk
 * @date 2019/6/4
 */
import axios from 'axios'
import { getToken } from '../utils/auth'
import { showMessageError } from '../utils/util'
import store from '@/store'
import router from '../router'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Cache-Control'] = 'no-cache'
axios.defaults.timeout = 7200000
axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = getToken()
      if (!getToken()) {
        delete config.headers['authorization']
      }
    }
    return config
  },
  error => {
    Promise.resolve(error)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 0 || (response.data.type && response.data.type !== '')) {
        return Promise.resolve(response)
      } else {
        if (response.data.code === 401) {
          showMessageError(response.data.items)
        } else if (response.data.code === 3401) {
          showMessageError('登陆超时，请重新登录')
          store.dispatch('user/logout').then(() => {
            router.push(`/login?redirect=${this.$route.fullPath}`)
          }
          )
        } else {
          response.data.message && showMessageError(response.data.message)
        }
        return Promise.reject(response)
      }
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          showMessageError('请求要求身份验证。')
          break
        case 404:
          showMessageError('服务器找不到请求的网页。')
          break
        case 500:
          showMessageError('服务器遇到错误，无法完成请求。')
          break
        default:
      }
      return Promise.reject(error.response)
    }
  }
)

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      // params: Object.assign({ monmentDataTime: Date.parse(new Date()) }, params)
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

function patch(url, params) {
  return new Promise((resolve, reject) => {
    axios.patch(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

function del(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

function downloadFile(url, type = 'get') {
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: url, // 请求地址
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

export { get, post, put, del, patch, downloadFile }
