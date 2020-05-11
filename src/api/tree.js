import request from '@/utils/request'

export function getTree(data) {
  return request({
    url: '/cmm/tree/part',
    method: 'get',
    params: { data }
  })
}

export function getmlutiTree(data) {
  return request({
    url: '/cmm/tree/mlutiPart',
    method: 'get',
    params: { data }
  })
}

