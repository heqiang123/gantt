// 工艺配置数据
import Mock from 'mockjs'
const processData = function() {
  return Mock.mock({
    'model|5': [{
      'count|+1': 1,
      name: function() {
        if (this.count === 1) {
          return '钻孔设备A'
        } else if (this.count === 2) {
          return '钻孔设备B'
        } else if (this.count === 3) {
          return '钻孔设备C'
        } else if (this.count === 4) {
          return '钻孔设备D'
        } else if (this.count === 5) {
          return '钻孔设备E'
        }
      },
      number: function() {
        if (this.count === 1) {
          return '180101'
        } else if (this.count === 2) {
          return '180102'
        } else if (this.count === 3) {
          return '180103'
        } else if (this.count === 4) {
          return '180104'
        } else if (this.count === 5) {
          return '180105'
        }
      },
      'type|1': ['工具', '工装'],
      AO: 'AO-ICI D3340T00000051-31-901' + '@integer(1, 6)',
      'AOname|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件']
    }]
  })
}

export default [
  {
    url: '/cmm/mating/processCrator',
    type: 'get',
    response: config => {
      const data = processData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
