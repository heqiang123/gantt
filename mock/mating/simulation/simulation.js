// 多及配套数据
import Mock from 'mockjs'
const simulation = function() {
  return Mock.mock({
    'model|17': [{
      'count|+1': 1,
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
      show: true,
      AG600: {
        val1: 15,
        'cut|+1': 1,
        val2: function() {
          if (this.cut === 1) {
            return 15
          } else if (this.cut === 2) {
            return 0
          } else if (this.cut === 3) {
            return 15
          } else if (this.cut === 4) {
            return 6
          } else if (this.cut === 5) {
            return 15
          } else if (this.cut === 6) {
            return 0
          } else if (this.cut === 7) {
            return 15
          } else if (this.cut === 8) {
            return 6
          } else if (this.cut === 9) {
            return 15
          } else if (this.cut === 10) {
            return 0
          } else if (this.cut === 11) {
            return 15
          } else if (this.cut === 12) {
            return 6
          } else if (this.cut === 13) {
            return 15
          } else if (this.cut === 14) {
            return 0
          } else if (this.cut === 15) {
            return 15
          } else if (this.cut === 16) {
            return 6
          } else {
            return 15
          }
        }
      },
      AG700: {
        val1: 15,
        'cut|+1': 1,
        val2: function() {
          if (this.cut === 1) {
            return 8
          } else if (this.cut === 2) {
            return 0
          } else if (this.cut === 3) {
            return 15
          } else if (this.cut === 4) {
            return 0
          } else if (this.cut === 5) {
            return 8
          } else if (this.cut === 6) {
            return 0
          } else if (this.cut === 7) {
            return 15
          } else if (this.cut === 8) {
            return 0
          } else if (this.cut === 9) {
            return 8
          } else if (this.cut === 10) {
            return 0
          } else if (this.cut === 11) {
            return 15
          } else if (this.cut === 12) {
            return 0
          } else if (this.cut === 13) {
            return 8
          } else if (this.cut === 14) {
            return 0
          } else if (this.cut === 15) {
            return 15
          } else if (this.cut === 16) {
            return 0
          } else {
            return 15
          }
        }
      },
      AG800: {
        val1: 15,
        'cut|+1': 1,
        val2: function() {
          if (this.cut === 1) {
            return 15
          } else if (this.cut === 2) {
            return 0
          } else if (this.cut === 3) {
            return 15
          } else if (this.cut === 4) {
            return 0
          } else if (this.cut === 5) {
            return 15
          } else if (this.cut === 6) {
            return 0
          } else if (this.cut === 7) {
            return 15
          } else if (this.cut === 8) {
            return 0
          } else if (this.cut === 9) {
            return 15
          } else if (this.cut === 10) {
            return 0
          } else if (this.cut === 11) {
            return 15
          } else if (this.cut === 12) {
            return 0
          } else if (this.cut === 13) {
            return 15
          } else if (this.cut === 14) {
            return 0
          } else if (this.cut === 15) {
            return 15
          } else if (this.cut === 16) {
            return 0
          } else {
            return 15
          }
        }
      },
      AO: 'AO-ICI D3340T00000051-31-901' + '@integer(1, 6)',
      'name|1': ['右后舱门外应急撤离灯衬板', '左后舱门外应急撤离灯衬板', '左前舱门外应急撤离灯衬板', '右前舱门外应急撤离灯衬板', '升降舵34号拉杆组件',
        '升降舵35号拉杆组件', '升降舵26号拉杆组件', '升降舵28号拉杆组件', '支座组件', '摇臂组件']
    }]
  })
}

export default [
  {
    url: '/cmm/mating/simulation',
    type: 'get',
    response: config => {
      const data = simulation
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
