// 装配管理-续
import Mock from 'mockjs'
const allocaData = function() {
  return Mock.mock({
    'model|6': [{
      type: 'AO-ICI D3340T00000051-31-901' + '@integer(1, 6)',
      'name|1': ['左航行灯和左防撞灯的拆卸', '左航行灯和左防撞灯的复装', '右翼尖灯罩连接更改', '右航行灯和右防撞灯的拆卸', '右航行灯和右防撞灯的复装', 'W1021线束新增导线敷设及固定'],
      version: 'A' + '@integer(1, 6)',
      stand: '31' + '@integer(1, 6)',
      'timeConnect|+1': 1,
      'timeAfterConnet|+1': 7,
      'datConnect|+1': '@integer(10, 25)',
      planStart: function() {
        return '2020-0' + this.timeConnect + '-' + this.datConnect
      },
      planEnd: function() {
        if (this.timeAfterConnet > 9) {
          return '2020-' + this.timeAfterConnet + '-' + this.datConnect
        } else {
          return '2020-0' + this.timeAfterConnet + '-' + this.datConnect
        }
      },
      requireTime: function() {
        const monthDate = this.timeAfterConnet + 1
        const dayDate = this.datConnect + 1
        if (this.timeAfterConnet > 9) {
          return '2020-' + this.timeAfterConnet + '-' + dayDate
        } else if (this.timeAfterConnet === 9) {
          return '2020-' + monthDate + '-' + this.datConnect
        } else {
          return '2020-0' + monthDate + '-' + this.datConnect
        }
      },
      deliverNum: 'PS-20200124-00' + '@integer(1, 6)',
      requireDeliver: function() {
        const monthDate = this.timeAfterConnet + 1
        const dayDate = this.datConnect + 2
        if (this.timeAfterConnet > 9) {
          return '2020-' + this.timeAfterConnet + '-' + dayDate
        } else if (this.timeAfterConnet === 9) {
          return '2020-' + monthDate + '-' + dayDate
        } else {
          return '2020-0' + monthDate + '-' + dayDate
        }
      },
      applyTime: function() {
        const dayDate = this.datConnect - 1
        return '2020-0' + this.timeConnect + '-' + dayDate
      },
      'manner|1': ['齐套', '部分齐套'],
      model: 'AG600',
      'batche|+1': 1,
      Batches: function() {
        return '00' + this.batche
      },
      'order|+1': 2001,
      'state|1': ['已占用', '已分配', '全部分配', '全部占用']
    }]
  })
}

export default [
  {
    url: '/cmm/mating/alloca',
    type: 'get',
    response: config => {
      const data = allocaData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
