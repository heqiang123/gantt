// 现场派工管理
import Mock from 'mockjs'

const requirementData = function() {
  return Mock.mock({
    'items|13': [{
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
      code: '',
      sortie: '002-200' + '@integer(1, 6)',
      AO: 'AO-CAS-31-001001-00' + '@integer(1, 6)',
      step: '05 工装工具装夹',
      'unit|1': ['31', '41', '51', '52', '53', '54'],
      'level|1': ['一级响应', '二级响应', '三级响应'],
      'creatPerson|1': ['制造部   王鑫'],
      'person|1': ['工艺部   王一'],
      remark: '三坐标仪设备出现故障，导致现场工序装配停止，因此需要提供帮助'
    }]
  })
}

export default [
  {
    url: '/cmm/execute/dealQuestion',
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
