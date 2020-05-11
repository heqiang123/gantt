export default {
  props: {
    rowCalssState: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    rowClassShow() {
      return this.rowCalssState ? this.rowCalssName : ''
    }
  },
  methods: {
    rowCalssName({ row, rowIndex }) {
      console.log(111)
      const planMon = row.startTime ? row.startTime.substring(row.startTime.indexOf('-') + 1, row.startTime.lastIndexOf('-')) : ''
      const planDay = row.startTime ? row.startTime.substring(row.startTime.lastIndexOf('-') + 1) : ''
      const date = new Date()
      const currtMon = date.getMonth() + 1
      const currtDate = date.getDate()
      console.log('当前天', planDay, currtDate, planMon, currtMon)
      if (planMon) {
        if (planMon < currtMon) {
          return 'warning-row'
        } else if (planMon.indexOf(currtMon) > -1) {
          console.log('当前天11', planDay, currtDate)
          if (planDay < currtDate) {
            return 'warning-row'
          }
        }
      } else if (!row.Batches && !row.startTime) {
        if (row.demandNum === row.distribution) {
          return 'satisfy-row'
        } else {
          return 'unsatisfy-row'
        }
      } else if (row.Batches) {
        if (rowIndex / 2 === 0) {
          return 'satisfy-row'
        } else if (rowIndex % 5 === 0) {
          return 'unsatisfy-row'
        } else if (rowIndex % 2 === 1) {
          return 'warning-row'
        }
      }
      return ''
    }
  }
}
