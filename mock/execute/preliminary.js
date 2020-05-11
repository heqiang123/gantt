// 现场派工管理
import Mock from 'mockjs'

const requirementData = function() {
  return Mock.mock({
    'items|10': [{
      title: '2020.04.15-GY0' + '@integer(1, 9)',
      'startdate|1': ['2020.4.15 12:40:52', '2020.4.13 12:40:52', '2020.4.10 12:40:52'],
      'enddate|1': ['2020.5.3 12:40:52', '2020.5.5 12:40:52', '2020.5.7 12:40:52'],
      'reason|1': [
        '工艺变更导致生产异常',
        '现场所需物料未到位',
        '现场设备故障，加工受阻',
        '现场设备停止运行',
        '现场工序无法继续',
        '现场质量不合',
        '现场所需物料未到'
      ],
      state: '待接收',
      'code|1': 'QT-M' + '@integer(1, 20)',
      'examer|1': ['王益', '张说'],
      sortie: '002-200' + '@integer(1, 6)',
      AO: 'AO-CAS-31-001001-00' + '@integer(1, 6)',
      step: '05 工装工具装夹',
      'unit|1': ['31', '41', '51', '52', '53', '54'],
      'level|1': ['一级响应', '二级响应', '三级响应'],
      'qlevel': '@integer(1, 6)' + '级',
      'creatPerson|1': ['制造部   王鑫'],
      'person|1': ['王一'],
      'qObj|1': [
        {
          t: '设备故障',
          d: '蔡司测量设备故障'
        },
        {
          t: '工艺变更',
          d: '05工步工艺更改'
        },
        {
          t: '缺料',
          d: '0990物料缺失'
        },
        {
          t: '人员不足',
          d: '装配组人员请假'
        },
        {
          t: '环境问题',
          d: '当前温度调节不足'
        }
      ],
      'qtype|1': ['设备故障', '工艺变更', '缺料', '人员不足', '环境问题'],
      'description|1': ['蔡司测量设备故障', '05工步工艺更改', '0990物料缺失', '装配组人员请假', '当前温度调节不足'],
      'result|1': ['已处理', '待提交'],
      dan: '2392939929' + '@integer(1, 20)',
      remark: '三坐标仪设备出现故障，导致现场工序装配停止，因此需要提供帮助'
    }]
  })
}

export default [
  {
    url: '/cmm/execute/preliminary',
    type: 'get',
    response: config => {
      const data = requirementData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
