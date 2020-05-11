import Mock from 'mockjs'
// const random = Mock.Random
// 装配计划编制
const planData = function() {
  // const deliver = random.date()
  // const datePlan = '2020-06-30'
  return Mock.mock({
    'model|3': [{
      type: 'AG' + '@integer(6, 9)' + '00',
      'batches|+1': 2001,
      time: '@date',
      deliverTime: function() {
        if (this.batches === 2001) {
          return '2020-' + '03-20'
        } else if (this.batches === 2002) {
          return '2020-' + '04-20'
        } else {
          return '2020-' + '05-20'
        }
      },
      'state|1': ['已下达', '已生成']
    }],
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
    ]
    // 'standing|6': [{
    //   'stand|+1': 51,
    //   time: '@date',
    //   ptime: '@date',
    //   'timeConnect|+1': 1,
    //   'timeAfterConnet|+1': 7,
    //   'datConnect|+1': '@integer(10, 25)',
    //   planStart: function() {
    //     if (this.sort === 51) {
    //       return '2020-' + '03-01'
    //     } else if (this.sort === 52) {
    //       return '2020-' + '04-01'
    //     } else {
    //       return '2020-' + '05-01'
    //     }
    //   },
    //   planEnd: function() {
    //     if (this.sort === 51) {
    //       return '2020-' + '04-01'
    //     } else if (this.sort === 52) {
    //       return '2020-' + '04-01'
    //     } else {
    //       return '2020-' + '05-01'
    //     }
    //   },
    //   'state|1': ['已下达', '已生成']
    // }]
  })
}

export default [
  {
    url: '/cmm/mating/plan',
    type: 'get',
    response: config => {
      const data = planData
      return {
        status: 200,
        data: {
          items: data
        }
      }
    }
  }
]
