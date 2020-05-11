import Mock from 'mockjs'
const random = Mock.Random
const sortData = function() {
  return Mock.mock({
    'items|20': [{
      employeeNum: 'AO-CAS-52-001001-00' + '@integer(1, 6)',
      'employeeName|1': ['液压支架对接AO', '机头连接件安装AO', '机头液压支架对接AO', '调整测试AO', '检查AO', '交付测试AO'],
      version: 'A',
      'state|1': ['已完成', '进行中', '暂停', '已派工未执行', '计划未下达'],
      'processMolecule|1': ['0', '6', '10'],
      'processDenominator|1': ['0', '10', '15']
    }]
  })
}

const docData = function() {
  return Mock.mock({
    'model|20': [{
      type: 'AO-CAS-52-001001-00' + '@integer(1, 6)',
      'genre|1': ['问题评审', '不合格(II III)', '报废', '代料', '重量超差', '拒收单'],
      docNumber: '@pick(["YSH","BHG","BF","DL","ZLCC","FRR"])' + '-2020-05-001',
      'conclusion|1': ['提交不合格', '报废'],
      'status|1': ['完成', '审理中'],
      'isClose|1': ['N', 'Y']
    }]
  })
}

const documentData = function() {
  return Mock.mock({
    'stdarding|2': [{
      number: '@integer(1, 100)',
      type: 'AO-CAS-52-001001-00' + '@integer(1, 6)',
      'name|1': ['A', 'D'],
      docNumber: '@pick(["YSH","BHG","BF","DL","ZLCC","FRR"])' + '-2020-05-001',
      'status|1': ['完成', '执行中']
    }],
    'assembly|20': [{
      participat: '@pick(["YSH","BHG","BF","DL","ZLCC","FRR"])' + '-0908' + '@integer(89, 97)',
      'material|1': ['设备', '成件', '标准件', '材料', '零组件'],
      upper: '@pick(["YSH","BHG","BF","DL","ZLCC","FRR"])' + '-0908' + '@integer(89, 97)' + '-00' + '@integer(3, 8)',
      'type|1': ['AO', '成品串换', '零组件串换', '代料', '报废'],
      number: '@pick(["YSH","BHG","BF","DL","ZLCC","FRR"])' + '-0908' + '@integer(89, 97)' + '-00' + '@integer(3, 8)'
    }],
    'typeData|4': [{
      'count|1': 1,
      image: function() {
        if (this.count === 1) {
          return '/icons/o-ootb.png'
        } else if (this.count === 2) {
          return '/icons/o-ao.png'
        } else if (this.count === 3) {
          return '/icons/o-reChange.png'
        } else {
          return '/icons/c-allreplace.png'
        }
      },
      name: function() {
        if (this.count === 1) {
          return '报废'
        } else if (this.count === 2) {
          return '代料'
        } else if (this.count === 3) {
          return '成品串换'
        } else {
          return '零组件串换'
        }
      },
      number: '@integer(80, 99)'
    }]
  })
}

const pieData = function() {
  const list = []
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      const complete = random.integer(1, 100)
      list.push({
        value: complete,
        name: complete + '%'
      })
    } else if (i === 1) {
      list.push({
        value: 100,
        name: 100 - list[0].value + '%'
      })
    } else {
      return ''
    }
  }
  return list
}

const barschData = function() {
  const list1 = []
  const list2 = []
  const list3 = []
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      for (let i = 0; i < 6; i++) {
        list1.push(random.integer(1, 100))
      }
    } else if (i === 1) {
      for (let i = 0; i < 6; i++) {
        list2.push(random.integer(1, 100))
      }
    } else if (i === 2) {
      for (let i = 0; i < 6; i++) {
        list3.push(random.integer(1, 100))
      }
    }
  }
  return { bardata1: list1, bardata2: list2, bardata3: list3 }
}

export default [
  {
    url: '/cmm/entity/piedata',
    type: 'get',
    response: config => {
      const data = { sortData: sortData, pieData: pieData }
      return {
        status: 200,
        data: data,
        message: '查询成功'
      }
    }
  },
  {
    url: '/cmm/entity/bardata',
    type: 'get',
    response: config => {
      const data = { bardata: docData, barschdata: barschData }
      return {
        status: 200,
        data: data,
        message: '查询成功'
      }
    }
  },
  {
    url: '/cmm/entity/documentary',
    type: 'get',
    response: config => {
      const data = documentData
      return {
        status: 200,
        data: data,
        message: '查询成功'
      }
    }
  }
]
