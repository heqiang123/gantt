import request from '@/utils/request'

export function getPieData(data) {
  return request({
    url: '/cmm/entity/piedata',
    method: 'get',
    params: { data }
  })
}

export function getBarData(data) {
  return request({
    url: '/cmm/entity/bardata',
    method: 'get',
    params: { data }
  })
}

export function getDocumentary(data) {
  return request({
    url: '/cmm/entity/documentary',
    method: 'get',
    params: { data }
  })
}
