// 装配管理-管理
import Mock from 'mockjs'
const manageData = function() {
  return Mock.mock({
    'model|6': [{
      'count|+1': 1,
      type: 'AO-ICI D3340T00000051-31-901' + '@integer(1, 6)',
      stand: '31',
      setBox: function() {
        if (this.count === 1) {
          return '是'
        } else if (this.count === 2) {
          return '否'
        } else if (this.count === 3) {
          return '否'
        } else if (this.count === 4) {
          return '是'
        } else if (this.count === 5) {
          return '否'
        } else if (this.count === 6) {
          return '是'
        }
      },
      setBoxgz: function() {
        if (this.count === 1) {
          return '是'
        } else if (this.count === 2) {
          return '否'
        } else if (this.count === 3) {
          return '是'
        } else if (this.count === 4) {
          return '是'
        } else if (this.count === 5) {
          return '否'
        } else if (this.count === 6) {
          return '是'
        }
      },
      time: '@datetime',
      planStart: '2020-0' + '@integer(1, 9)-' + '@integer(11, 25)',
      planEnd: '2020-' + '@integer(10, 12)-' + '@integer(11, 25)',
      requireTime: function() {
        return '2020-12-31'
      },
      number: 'PT-20200124-00' + '@integer(1, 6)'
    }],
    'standing|30': [{
      number: 'D3351T2100520' + '@integer(0, 17)',
      'stockName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      'marialName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      supplier: '@integer(182)',
      grade: '',
      norm: '',
      conditions: '',
      demandNum: 2,
      absortNum: function() {
        return this.demandNum - 1
      },
      'demandOrigin|1': ['BOM', '代料']
    }],
    'standing1|17': [{
      number: 'D3351T2100520' + '@integer(0, 17)',
      'stockName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      'marialName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      supplier: '@integer(182)',
      grade: '',
      norm: '',
      conditions: '',
      demandNum: 2,
      absortNum: function() {
        return this.demandNum - 1
      },
      'demandOrigin|1': ['BOM', '代料']
    }],
    'standing2|13': [{
      number: 'D3351T2100520' + '@integer(0, 17)',
      'stockName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      'marialName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      supplier: '@integer(182)',
      grade: '',
      norm: '',
      conditions: '',
      demandNum: 2,
      absortNum: function() {
        return this.demandNum - 1
      },
      'demandOrigin|1': ['BOM', '代料']
    }],
    'standing3|25': [{
      number: 'D3351T2100520' + '@integer(0, 17)',
      'stockName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      'marialName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      supplier: '@integer(182)',
      grade: '',
      norm: '',
      conditions: '',
      demandNum: 2,
      absortNum: function() {
        return this.demandNum - 1
      },
      'demandOrigin|1': ['BOM', '代料']
    }],
    'standinggz|6': [{
      number: 'D3351T2100520' + '@integer(0, 17)',
      'stockName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      'marialName|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件'],
      supplier: '@integer(182)',
      grade: '',
      norm: '',
      conditions: '',
      demandNum: 2,
      absortNum: function() {
        return this.demandNum - 1
      },
      'demandOrigin|1': ['BOM', '代料']
    }],
    'longest|7': [{
      'id|+1': 1,
      count: '@integer(1, 20)',
      'prepareState|1': ['齐套'],
      'problemState|1': ['齐套'],
      AONum: 'AO-ICI D3340T00000051-31-901' + '@integer(1, 6)',
      text: 'AO-' + '@string("upper", 4)-' + '@integer(1, 100)',
      start_date: function() {
        if (this.id === 1) {
          return '2020-3-1'
        } else if (this.id === 2) {
          return '2020-3-5'
        } else if (this.id === 3) {
          return '2020-3-9'
        } else if (this.id === 4) {
          return '2020-3-13'
        } else if (this.id === 5) {
          return '2020-3-18'
        } else if (this.id === 6) {
          return '2020-3-23'
        } else if (this.id === 7) {
          return '2020-3-27'
        } else {
          return '2020-3-' + this.count
        }
      },
      personName: '@cname',
      duration: function() {
        if (this.id === 1) {
          return 4
        } else if (this.id === 2) {
          return 4
        } else if (this.id === 3) {
          return 4
        } else if (this.id === 4) {
          return 5
        } else if (this.id === 5) {
          return 5
        } else if (this.id === 6) {
          return 4
        } else if (this.id === 7) {
          return 5
        } else {
          return 10
        }
      },
      color: function() {
        if (this.id < 8) {
          return 'rgba(230,165,107,1)'
        } else {
          return 'rgba(107,168,230,1)'
        }
      },
      // 'color|1': ['rgba(230,165,107,1)', 'rgba(107,168,230,1)'],
      progress: '@integer(0.6)',
      time: '@date',
      ptime: '@date',
      time1: '@date',
      ptime1: '@date',
      correlation: function() {
        if (this.id < 8) {
          return true
        }
      },
      planStartTime: function() {
        if (this.id === 1) {
          return '2020-03-01'
        } else if (this.id === 2) {
          return '2020-03-05'
        } else if (this.id === 3) {
          return '2020-03-09'
        } else if (this.id === 4) {
          return '2020-03-13'
        } else if (this.id === 5) {
          return '2020-03-18'
        } else if (this.id === 6) {
          return '2020-03-23'
        } else if (this.id === 7) {
          return '2020-03-27'
        } else {
          return '2020-03-15'
        }
      },
      planEndTime: function() {
        if (this.id === 1) {
          return '2020-03-04'
        } else if (this.id === 2) {
          return '2020-03-08'
        } else if (this.id === 3) {
          return '2020-03-12'
        } else if (this.id === 4) {
          return '2020-03-17'
        } else if (this.id === 5) {
          return '2020-03-22'
        } else if (this.id === 6) {
          return '2020-03-26'
        } else if (this.id === 7) {
          return '2020-03-31'
        } else {
          return '2020-03-25'
        }
      },
      activeStart: function() {
        if (this.id === 1) {
          return '2020-03-01'
        } else if (this.id === 2) {
          return '2020-03-05'
        } else if (this.id === 3) {
          return '2020-03-09'
        } else if (this.id === 4) {
          return '2020-03-13'
        } else if (this.id === 5) {
          return '2020-03-18'
        } else if (this.id === 6) {
          return '2020-03-23'
        } else if (this.id === 7) {
          return '2020-03-27'
        } else {
          return '2020-03-15'
        }
      },
      activeEnd: function() {
        if (this.id === 1) {
          return '2020-03-04'
        } else if (this.id === 2) {
          return '2020-03-08'
        } else if (this.id === 3) {
          return '2020-03-12'
        } else if (this.id === 4) {
          return '2020-03-17'
        } else if (this.id === 5) {
          return '2020-03-22'
        } else if (this.id === 6) {
          return '2020-03-26'
        } else if (this.id === 7) {
          return '2020-03-31'
        } else {
          return '2020-03-25'
        }
      },
      deliverNum: function() {
        if (this.id === 1) {
          return ''
        } else if (this.id === 2) {
          return 1
        } else if (this.id === 3) {
          return 2
        } else if (this.id === 4) {
          return 3
        } else if (this.id === 5) {
          return 4
        } else if (this.id === 6) {
          return 5
        } else if (this.id === 7) {
          return 6
        } else {
          return ''
        }
      }
    }]
  })
}

export default [
  {
    url: '/cmm/mating/mange',
    type: 'get',
    response: config => {
      const data = manageData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
