import Mock from 'mockjs'
// 装配计划gantt编制
const planGantt = Mock.mock({
  'items|6': [{
    stand: '31站位',
    text: 'AO-CASD1',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    personName: 'name',
    AONum: '@integer(1000, 9999)', // AO 号
    stance: '@sentence(10, 20)', // 站位
    display_time: '@datetime', // 要求结束时间
    start_date: '@datetime', // 开始时间
    end_date: '@datetime' // 结束时间
  }]
})

export default [
  {
    url: '/cmm/mating/gantt',
    type: 'get',
    response: config => {
      const data = planGantt
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
