// 现场派工管理
import Mock from 'mockjs'

const requirementData = function() {
  return Mock.mock({
    'items|13': [{
      title: 'AO-CAS-52-001001-00' + '@integer(1, 6)',
      date: '@datetime',
      state: '已下达'
    }],
    'model|7': [{
      taskNum: '0200' + '@integer(1, 7)',
      number: '@integer(5, 35)',
      'name|1': ['组件压装', '选对', '装配', '检验'],
      planStartTime: '@datetime',
      planEndTime: '@datetime',
      front: '@integer(5, 30)',
      'state|1': ['已指派', '待指派'],
      sourse: '@cName'
    }]
  })
}

export default [
  {
    url: '/cmm/execute/requirement',
    type: 'get',
    response: config => {
      const data = requirementData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
