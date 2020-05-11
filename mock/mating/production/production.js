// 生产订单编制
// import Mock from 'mockjs'
// const random = Mock.Random
// const planData = function() {
//   const batch = random.integer(1, 5)
//   const manufacture = random.integer(2000, 2005)
//   const deliver = random.date()
//   return Mock.mock({
//     'model|10': [{
//       'id|+1': 1,
//       type: 'AG600',
//       'batching|+1': batch,
//       batches: function() {
//         if (String(this.batching).length > 1) {
//           return '0' + this.batching
//         } else {
//           return '00' + this.batching
//         }
//       },
//       time: '@date',
//       preTime: '@date',
//       'manufacturing|+1': manufacture,
//       deliverTime: function() {
//         return '2020' + this.time.substring(deliver.indexOf('-'))
//       },
//       name: '中国商用飞机有限责任公司',
//       preparationTime: function() {
//         return '2020' + this.preTime.substring(deliver.indexOf('-'))
//       },
//       'preparationPerson|1': ['编辑', '审批中', '已下达']
//     }],
//     'items|6': [{
//       'standerd|+1': 51,
//       time: '@date',
//       preTime: '@date',
//       startime: '@date',
//       startTime: function() {
//         return '2020' + this.time.substring(deliver.indexOf('-'))
//       },
//       endTime: function() {
//         return '2020' + this.preTime.substring(deliver.indexOf('-'))
//       },
//       'timeOut|1': ['是', '否'],
//       planStartTime: function() {
//         return '2020' + this.startime.substring(deliver.indexOf('-'))
//       },
//       planEndTime: function() {
//         return this.deliverTime
//       },
//       state: '已生成',
//       AONum: '@integer(62, 300)',
//       show: true
//     }]
//   })
// }

const planData = {
  model: [
    {
      id: 'JHAG6002021-02-1001',
      type: 'AG600',
      batches: '001',
      manufacturing: '2001',
      deliverTime: '2020-08-10',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-02-10',
      preparationPerson: '已下达'
    },
    {
      id: 'JHAG6002021-03-1002',
      type: 'AG600',
      batches: '002',
      manufacturing: '2002',
      deliverTime: '2020-09-10',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-03-10',
      preparationPerson: '已下达'
    },
    {
      id: 'JHAG6002021-03-2003',
      type: 'AG600',
      batches: '003',
      manufacturing: '2003',
      deliverTime: '2020-09-15',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-03-20',
      preparationPerson: '已下达'
    },
    {
      id: 'JHAG6002020-12-2004',
      type: 'AG600',
      batches: '004',
      manufacturing: '2004',
      deliverTime: '2020-06-20',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2020-12-20',
      preparationPerson: '审批中'
    },
    {
      id: 'JHAG6002021-01-2005',
      type: 'AG600',
      batches: '005',
      manufacturing: '2005',
      deliverTime: '2020-07-20',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-01-20',
      preparationPerson: '编辑'
    },
    {
      id: 'JHAG6002021-03-2506',
      type: 'AG600',
      batches: '006',
      manufacturing: '2006',
      deliverTime: '2020-08-20',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-03-25',
      preparationPerson: '编辑'
    },
    {
      id: 'JHAG6002021-03-2007',
      type: 'AG600',
      batches: '007',
      manufacturing: '2007',
      deliverTime: '2020-09-20',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-03-20',
      preparationPerson: '审批中'
    },
    {
      id: 'JHAG6002021-04-2208',
      type: 'AG600',
      batches: '008',
      manufacturing: '2008',
      deliverTime: '2020-10-20',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-04-22',
      preparationPerson: '审批中'
    },
    {
      id: 'JHAG6002021-05-2109',
      type: 'AG600',
      batches: '009',
      manufacturing: '2009',
      deliverTime: '2020-11-20',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-05-21',
      preparationPerson: '编辑'
    },
    {
      id: 'JHAG6002021-06-23010',
      type: 'AG600',
      batches: '010',
      manufacturing: '2010',
      deliverTime: '2020-12-20',
      name: '中国商用飞机有限责任公司',
      preparationTime: '2021-06-23',
      preparationPerson: '审批中'
    }
  ]
}
const planArr = {
  planPreData1: [
    {
      standerd: '31',
      startTime: '2020-03-01',
      endTime: '2020-04-01',
      timeOut: '是',
      planStartTime: '2020-03-01',
      planEndTime: '2020-04-01',
      state: '已生成',
      AONum: '62',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-02',
      endTime: '2020-05-02',
      timeOut: '是',
      planStartTime: '2020-04-02',
      planEndTime: '2020-05-02',
      state: '已生成',
      AONum: '99',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '120',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '150',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '是',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '200',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '否',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '300',
      show: true
    }
  ],
  planPreData2: [
    {
      standerd: '31',
      startTime: '2020-03-02',
      endTime: '2020-04-02',
      timeOut: '是',
      planStartTime: '2020-03-02',
      planEndTime: '2020-04-02',
      state: '已生成',
      AONum: '63',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '100',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '121',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '否',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '151',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '是',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '201',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-08-07',
      endTime: '2020-09-07',
      timeOut: '否',
      planStartTime: '2020-08-07',
      planEndTime: '2020-09-07',
      state: '已生成',
      AONum: '299',
      show: true
    }
  ],
  planPreData3: [
    {
      standerd: '31',
      startTime: '2020-03-03',
      endTime: '2020-04-03',
      timeOut: '是',
      planStartTime: '2020-03-03',
      planEndTime: '2020-04-03',
      state: '已生成',
      AONum: '64',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-04',
      endTime: '2020-05-04',
      timeOut: '否',
      planStartTime: '2020-04-04',
      planEndTime: '2020-05-04',
      state: '已生成',
      AONum: '101',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-05-05',
      endTime: '2020-06-05',
      timeOut: '否',
      planStartTime: '2020-05-05',
      planEndTime: '2020-06-05',
      state: '已生成',
      AONum: '122',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-06-06',
      endTime: '2020-07-06',
      timeOut: '否',
      planStartTime: '2020-06-06',
      planEndTime: '2020-07-06',
      state: '已生成',
      AONum: '153',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-07-07',
      endTime: '2020-08-07',
      timeOut: '否',
      planStartTime: '2020-07-07',
      planEndTime: '2020-08-07',
      state: '已生成',
      AONum: '203',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-08-08',
      endTime: '2020-09-08',
      timeOut: '否',
      planStartTime: '2020-08-08',
      planEndTime: '2020-09-08',
      state: '已生成',
      AONum: '297',
      show: true
    }
  ],
  planPreData4: [
    {
      standerd: '31',
      startTime: '2020-03-01',
      endTime: '2020-04-01',
      timeOut: '是',
      planStartTime: '2020-03-01',
      planEndTime: '2020-04-01',
      state: '已生成',
      AONum: '62',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-02',
      endTime: '2020-05-02',
      timeOut: '是',
      planStartTime: '2020-04-02',
      planEndTime: '2020-05-02',
      state: '已生成',
      AONum: '99',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '120',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '150',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '是',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '200',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '否',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '300',
      show: true
    }
  ],
  planPreData5: [
    {
      standerd: '31',
      startTime: '2020-03-02',
      endTime: '2020-04-02',
      timeOut: '是',
      planStartTime: '2020-03-02',
      planEndTime: '2020-04-02',
      state: '已生成',
      AONum: '63',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '100',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '121',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '否',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '151',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '是',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '201',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-08-07',
      endTime: '2020-09-07',
      timeOut: '否',
      planStartTime: '2020-08-07',
      planEndTime: '2020-09-07',
      state: '已生成',
      AONum: '299',
      show: true
    }
  ],
  planPreData6: [
    {
      standerd: '31',
      startTime: '2020-09-08',
      endTime: '2020-10-08',
      timeOut: '是',
      planStartTime: '2020-09-08',
      planEndTime: '2020-10-08',
      state: '已生成',
      AONum: '64',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-10-09',
      endTime: '2020-11-09',
      timeOut: '否',
      planStartTime: '2020-10-09',
      planEndTime: '2020-11-09',
      state: '已生成',
      AONum: '101',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-11-10',
      endTime: '2020-12-10',
      timeOut: '否',
      planStartTime: '2020-11-10',
      planEndTime: '2020-12-10',
      state: '已生成',
      AONum: '122',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-12-11',
      endTime: '2021-01-11',
      timeOut: '否',
      planStartTime: '2020-12-11',
      planEndTime: '2021-01-11',
      state: '已生成',
      AONum: '153',
      show: true
    },
    {
      standerd: '53',
      startTime: '2021-01-12',
      endTime: '2021-02-12',
      timeOut: '否',
      planStartTime: '2021-01-12',
      planEndTime: '2021-02-12',
      state: '已生成',
      AONum: '203',
      show: true
    },
    {
      standerd: '54',
      startTime: '2021-02-13',
      endTime: '2021-03-13',
      timeOut: '否',
      planStartTime: '2021-02-13',
      planEndTime: '2021-03-13',
      state: '已生成',
      AONum: '297',
      show: true
    }
  ],
  planPreData7: [
    {
      standerd: '31',
      startTime: '2020-03-01',
      endTime: '2020-04-01',
      timeOut: '是',
      planStartTime: '2020-03-01',
      planEndTime: '2020-04-01',
      state: '已生成',
      AONum: '62',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-02',
      endTime: '2020-05-02',
      timeOut: '是',
      planStartTime: '2020-04-02',
      planEndTime: '2020-05-02',
      state: '已生成',
      AONum: '99',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '120',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '150',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '是',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '200',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '否',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '300',
      show: true
    }
  ],
  planPreData8: [
    {
      standerd: '31',
      startTime: '2020-03-02',
      endTime: '2020-04-02',
      timeOut: '是',
      planStartTime: '2020-03-02',
      planEndTime: '2020-04-02',
      state: '已生成',
      AONum: '63',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '100',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '121',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '否',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '151',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '是',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '201',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-08-07',
      endTime: '2020-09-07',
      timeOut: '否',
      planStartTime: '2020-08-07',
      planEndTime: '2020-09-07',
      state: '已生成',
      AONum: '299',
      show: true
    }
  ],
  planPreData9: [
    {
      standerd: '31',
      startTime: '2020-09-08',
      endTime: '2020-10-08',
      timeOut: '是',
      planStartTime: '2020-09-08',
      planEndTime: '2020-10-08',
      state: '已生成',
      AONum: '64',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-10-09',
      endTime: '2020-11-09',
      timeOut: '否',
      planStartTime: '2020-10-09',
      planEndTime: '2020-11-09',
      state: '已生成',
      AONum: '101',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-11-10',
      endTime: '2020-12-10',
      timeOut: '否',
      planStartTime: '2020-11-10',
      planEndTime: '2020-12-10',
      state: '已生成',
      AONum: '122',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-12-11',
      endTime: '2021-01-11',
      timeOut: '否',
      planStartTime: '2020-12-11',
      planEndTime: '2021-01-11',
      state: '已生成',
      AONum: '153',
      show: true
    },
    {
      standerd: '53',
      startTime: '2021-01-12',
      endTime: '2021-02-12',
      timeOut: '否',
      planStartTime: '2021-01-12',
      planEndTime: '2021-02-12',
      state: '已生成',
      AONum: '203',
      show: true
    },
    {
      standerd: '54',
      startTime: '2021-02-13',
      endTime: '2021-03-13',
      timeOut: '否',
      planStartTime: '2021-02-13',
      planEndTime: '2021-03-13',
      state: '已生成',
      AONum: '297',
      show: true
    }
  ],
  planPreData10: [
    {
      standerd: '31',
      startTime: '2020-03-01',
      endTime: '2020-04-01',
      timeOut: '是',
      planStartTime: '2020-03-01',
      planEndTime: '2020-04-01',
      state: '已生成',
      AONum: '62',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-02',
      endTime: '2020-05-02',
      timeOut: '是',
      planStartTime: '2020-04-02',
      planEndTime: '2020-05-02',
      state: '已生成',
      AONum: '99',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '120',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '150',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '是',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '200',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '否',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '300',
      show: true
    }
  ],
  planPreData11: [
    {
      standerd: '31',
      startTime: '2020-03-02',
      endTime: '2020-04-02',
      timeOut: '是',
      planStartTime: '2020-03-02',
      planEndTime: '2020-04-02',
      state: '已生成',
      AONum: '63',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-04-03',
      endTime: '2020-05-03',
      timeOut: '否',
      planStartTime: '2020-04-03',
      planEndTime: '2020-05-03',
      state: '已生成',
      AONum: '100',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-05-04',
      endTime: '2020-06-04',
      timeOut: '否',
      planStartTime: '2020-05-04',
      planEndTime: '2020-06-04',
      state: '已生成',
      AONum: '121',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-06-05',
      endTime: '2020-07-05',
      timeOut: '否',
      planStartTime: '2020-06-05',
      planEndTime: '2020-07-05',
      state: '已生成',
      AONum: '151',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-07-06',
      endTime: '2020-08-06',
      timeOut: '是',
      planStartTime: '2020-07-06',
      planEndTime: '2020-08-06',
      state: '已生成',
      AONum: '201',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-08-07',
      endTime: '2020-09-07',
      timeOut: '否',
      planStartTime: '2020-08-07',
      planEndTime: '2020-09-07',
      state: '已生成',
      AONum: '299',
      show: true
    }
  ],
  planPreData12: [
    {
      standerd: '31',
      startTime: '2020-05-01',
      endTime: '2021-03-10',
      timeOut: '是',
      planStartTime: '2020-05-02',
      planEndTime: '2021-06-20',
      state: '已生成',
      AONum: '82',
      show: true
    },
    {
      standerd: '41',
      startTime: '2020-06-03',
      endTime: '2021-03-12',
      timeOut: '是',
      planStartTime: '2020-06-04',
      planEndTime: '2021-06-22',
      state: '已生成',
      AONum: '119',
      show: true
    },
    {
      standerd: '51',
      startTime: '2020-07-05',
      endTime: '2021-03-14',
      timeOut: '是',
      planStartTime: '2020-07-06',
      planEndTime: '2021-06-24',
      state: '已生成',
      AONum: '140',
      show: true
    },
    {
      standerd: '52',
      startTime: '2020-08-07',
      endTime: '2021-03-16',
      timeOut: '是',
      planStartTime: '2020-08-08',
      planEndTime: '2021-06-26',
      state: '已生成',
      AONum: '170',
      show: true
    },
    {
      standerd: '53',
      startTime: '2020-09-10',
      endTime: '2021-03-18',
      timeOut: '是',
      planStartTime: '2020-09-10',
      planEndTime: '2021-06-28',
      state: '已生成',
      AONum: '220',
      show: true
    },
    {
      standerd: '54',
      startTime: '2020-12-31',
      endTime: '2021-03-20',
      timeOut: '否',
      planStartTime: '2020-12-31',
      planEndTime: '2021-06-30',
      state: '已生成',
      AONum: '180',
      show: true
    }
  ]
}

export default [

  {
    url: '/cmm/mating/productionplan',
    type: 'get',
    response: config => {
      console.log('mock', config.query)
      let planPreData = ''
      switch (config.query.data) {
        case '001':
          planPreData = planArr.planPreData1
          break
        case '002':
          planPreData = planArr.planPreData2
          break
        case '003':
          planPreData = planArr.planPreData3
          break
        case '004':
          planPreData = planArr.planPreData4
          break
        case '005':
          planPreData = planArr.planPreData5
          break
        case '006':
          planPreData = planArr.planPreData6
          break
        case '007':
          planPreData = planArr.planPreData7
          break
        case '008':
          planPreData = planArr.planPreData8
          break
        case '009':
          planPreData = planArr.planPreData9
          break
        case '010':
          planPreData = planArr.planPreData10
          break
        case '011':
          planPreData = planArr.planPreData12
          break
        default:
          break
      }
      return {
        status: 200,
        data: {
          data: planPreData
        }
      }
    }
  },
  {
    url: '/cmm/mating/production',
    type: 'get',
    response: config => {
      const items = planData.model
      return {
        status: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
