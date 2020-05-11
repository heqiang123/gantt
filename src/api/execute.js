import request from '@/utils/request'

export function getRequirement(data) {
  return request({
    url: '/cmm/execute/requirement',
    method: 'get',
    params: { data }
  })
}
export function dealQuestion(data) {
  return request({
    url: '/cmm/execute/dealQuestion',
    method: 'get',
    params: { data }
  })
}
export function preliminary(data) {
  return request({
    url: '/cmm/execute/preliminary',
    method: 'get',
    params: { data }
  })
}
