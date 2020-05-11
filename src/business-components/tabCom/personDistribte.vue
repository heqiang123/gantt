<template>
  <div style="padding-top: 10px">
    <dee-table :columns="personColumns" :data="personData" />
  </div>
</template>
<script>
export default {
  name: 'PersonDistribte',
  data() {
    return {
      personColumns: [
        { title: '张三', key: 'n1',
          component: {
            name: 'el-tag',
            tgType: (val) => {
              if (Number(val) > 6) {
                return 'danger'
              } else if (Number(val) > 4) {
                return 'warning'
              }
            }
          }
        },
        { title: '李四', key: 'n2',
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
        { title: '王五', key: 'n3',
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
        { title: '赵六', key: 'n4',
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
        { title: '月份', key: 'n5' }
      ],
      personData: [
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
          n5: '2'
        }, {
          n1: '5',
          n2: '2',
          n3: '4',
          n4: '5',
          n5: '3'
        }, {
          n1: '7',
          n2: '2',
          n3: '4',
          n4: '5',
          n5: '4'
        }
      ]
    }
  }
}
</script>
