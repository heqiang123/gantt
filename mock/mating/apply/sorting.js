import Mock from 'mockjs'
const random = Mock.Random
// 工作订单编制
const planData = function() {
  const deliver = random.date()
  return Mock.mock({
    'model|20': [{
      'prepareState|1': ['符合', '部分', '不符合'],
      'problemState|1': ['未闭环', '正常'],
      'num|+1': 1,
      time: '@date',
      ptime: '@date',
      time1: '@date',
      ptime1: '@date',
      taskName: function() {
        return 'AO-CAS-31-001001-00' + this.num
      },
      planStartTime: function() {
        return '2020' + this.time.substring(deliver.indexOf('-'))
      },
      planEndTime: function() {
        return '2020' + this.ptime.substring(deliver.indexOf('-'))
      },
      activeStart: function() {
        return '2020' + this.time1.substring(deliver.indexOf('-'))
      },
      activeEnd: function() {
        return '2020' + this.ptime1.substring(deliver.indexOf('-'))
      },
      deliverNum: '@integer(1, 19)'
    }]
  })
}

export default [
  {
    url: '/cmm/mating/sorting',
    type: 'get',
    response: config => {
      const data = planData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
