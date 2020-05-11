import request from '@/utils/request'

export function getGantt(data) {
  return request({
    url: '/cmm/ganttData/view',
    method: 'get',
    params: { data }
  })
}

export function getType(data) {
  return request({
    url: '/cmm/ganttData/part',
    method: 'post',
    data
  })
}
