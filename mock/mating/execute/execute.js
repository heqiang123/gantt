// 开工条件检查
import Mock from 'mockjs'
const operacondata = function() {
  return Mock.mock({
    'items|17': [{
      'stockName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      name: 'D' + '@integer(2731, 3351)' + 'T' + '@integer(21005201, 52020101)',
      grade: '',
      norm: '',
      conditions: '',
      demandNum: '@integer(1)',
      lackNum: '@integer(0, 1)'
    }],
    'model|5': [{
      'name|1': ['电动螺丝刀', '吸气式起子头', '卡尺', '推车', '专用夹具'],
      'type|1': ['工具', '工装'],
      demandNum: '@integer(1, 10)',
      useNum: '@integer(1, 6)',
      lackNum: '@integer(0, 2)'
    }],
    'standing|4': [{
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
        }
      },
      state: function() {
        if (this.count === 1) {
          return '正常'
        } else if (this.count === 2) {
          return '正常'
        } else if (this.count === 3) {
          return '异常'
        } else if (this.count === 4) {
          return '异常'
        }
      },
      isUse: function() {
        if (this.count === 1) {
          return '可用'
        } else if (this.count === 2) {
          return '可用'
        } else if (this.count === 3) {
          return '不可用'
        } else if (this.count === 4) {
          return '不可用'
        }
      }
    }]
  })
}

export default [
  {
    url: '/cmm/mating/execute',
    type: 'get',
    response: config => {
      const data = operacondata
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
