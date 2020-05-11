import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    AONum: '@integer(1000, 9999)', // AO 号
    stance: '@sentence(10, 20)', // 站位
    display_time: '@datetime', // 要求结束时间
    start_time: '@datetime', // 开始时间
    end_time: '@datetime', // 结束时间
    pageviews: '@integer(300, 5000)' // 配置单号
  }]
})

export default [
  {
    url: '/cmm/mating/logs',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        status: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
