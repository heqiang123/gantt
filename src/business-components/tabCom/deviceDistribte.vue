<template>
  <div style="padding-top: 10px">
    <dee-table :columns="deviceColumns" :data="deviceData" />
  </div>
</template>
<script>
export default {
  name: 'DeviceDistribte',
  data() {
    return {
      deviceColumns: [
        { title: '三坐标', key: 'n1',
          component: {
            name: 'el-tag',
            tgType: (val) => {
              if (Number(val) > 6) {
                return 'danger'
              } else if (Number(val) > 4) {
                return 'warning'
              }
            }
          }},
        { title: '五轴', key: 'n2',
          component: {
            name: 'el-tag',
            tgType: (val) => {
              if (Number(val) > 6) {
                return 'danger'
              } else if (Number(val) > 4) {
                return 'warning'
              }
            }
          }},
        { title: '三轴', key: 'n3',
          component: {
            name: 'el-tag',
            tgType: (val) => {
              if (Number(val) > 6) {
                return 'danger'
              } else if (Number(val) > 4) {
                return 'warning'
              }
            }
          }},
        { title: '四轴', key: 'n4',
          component: {
            name: 'el-tag',
            tgType: (val) => {
              if (Number(val) > 6) {
                return 'danger'
              } else if (Number(val) > 4) {
                return 'warning'
              }
            }
          }},
        { title: '马尔', key: 'n5',
          component: {
            name: 'el-tag',
            tgType: (val) => {
              if (Number(val) > 6) {
                return 'danger'
              } else if (Number(val) > 4) {
                return 'warning'
              }
            }
          }}
      ],
      deviceData: [
        {
          n1: '1',
          n2: '2',
          n3: '4',
          n4: '5',
          n5: '1'
        }, {
          n1: '3',
          n2: '2',
          n3: '4',
          n4: '5',
          n5: '1'
        }, {
          n1: '5',
          n2: '2',
          n3: '4',
          n4: '5',
          n5: '1'
        }, {
          n1: '7',
          n2: '2',
          n3: '4',
          n4: '5',
          n5: '1'
        }
      ]
    }
  }
}
</script>
