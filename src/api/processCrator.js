import request from '@/utils/request'

export function getProcessCrator(data) {
  return request({
    url: '/cmm/mating/processCrator',
    method: 'get',
    params: { data }
  })
}
