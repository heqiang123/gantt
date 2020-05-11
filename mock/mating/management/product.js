import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@sentence(10, 15)', // 库存名称
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    materialNum: '@integer(1000, 9999)', // 物料号
    materialName: '@sentence(10, 15)', // 物料名称
    demandNum: '@integer(1000, 9999)', // 需求数量
    supplier: '@sentence(10, 15)', // 供应商
    brand: '@sentence(10, 15)', // 牌号
    specifications: '@sentence(10, 15)', // 规格
    conditions: '@sentence(10, 15)', // 技术条件
    source: '@sentence(10, 15)', // 需求来源
    stance: '@sentence(10, 15)', // 站位
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
