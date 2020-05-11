// 装配管理-续1
import Mock from 'mockjs'
const blogData = function() {
  return Mock.mock({
    'model|17': [{
      number: 'D3351T2100520' + '@integer(0, 17)',
      'name|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      grade: '',
      norm: '',
      conditions: '',
      demandNum: '@integer(1, 2， 3)',
      'unit|1': ['片', '套', '个'],
      distribution: function() {
        if (Number(this.demandNum) === 3) {
          return Number(this.demandNum) - 1
        } else if (Number(this.demandNum) === 2) {
          return Number(this.demandNum) - 1
        } else {
          return this.demandNum
        }
      },
      'demandOrigin|1': ['BOM', '代料'],
      'state|1': ['已占用', '已分配']
    }],
    'standing|6': [{
      number: 'D3351T2100520' + '@integer(0, 6)',
      'name|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      stockNum: '',
      stock: '00' + '@integer(1, 6)',
      stockName: '',
      stockPosition: '00' + '@integer(1, 6)',
      qualityNum: '',
      stockCount: '@integer(1, 2)',
      useCount: '@integer(1, 2)',
      deandCount: '@integer(0, 1)'
    }]
  })
}

export default [
  {
    url: '/cmm/mating/allocation',
    type: 'get',
    response: config => {
      const data = blogData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
