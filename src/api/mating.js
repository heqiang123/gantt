import request from '@/utils/request'

export function getMatingLogs(data) {
  return request({
    url: '/cmm/mating/logs',
    method: 'get',
    params: { data }
  })
}

export function getPlan(data) {
  return request({
    url: '/cmm/mating/plan',
    method: 'get',
    params: { data }
  })
}

export function getGantt(data) {
  return request({
    url: '/cmm/mating/gantt',
    method: 'get',
    params: { data }
  })
}

export function getManage(data) {
  return request({
    url: '/cmm/mating/mange',
    method: 'get',
    params: { data }
  })
}

export function getAlloca(data) {
  return request({
    url: '/cmm/mating/alloca',
    method: 'get',
    params: { data }
  })
}

export function getAllocaTion(data) {
  return request({
    url: '/cmm/mating/allocation',
    method: 'get',
    params: { data }
  })
}

export function getPlanProduction(data) {
  return request({
    url: '/cmm/mating/productionplan',
    method: 'get',
    params: { data }
  })
}

export function getProduction(data) {
  return request({
    url: '/cmm/mating/production',
    method: 'get',
    params: { data }
  })
}

export function getOperacondata(data) {
  return request({
    url: '/cmm/mating/execute',
    method: 'get',
    params: { data }
  })
}

export function getsorting(data) {
  return request({
    url: '/cmm/mating/sorting',
    method: 'get',
    params: { data }
  })
}

export function getsimulation(data) {
  return request({
    url: '/cmm/mating/simulation',
    method: 'get',
    params: { data }
  })
}
