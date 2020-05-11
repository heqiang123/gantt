
const state = {
  productionBotData: [],
  workData: [
    {
      num1: 'WX2001',
      num2: '5',
      num3: 'WX2003',
      num4: '4',
      num5: '代料'
    },
    {
      num1: 'DT2003',
      num2: '2',
      num3: 'DT2003',
      num4: '1',
      num5: '正常'
    },
    {
      num1: 'WX2003',
      num2: '9',
      num3: 'WX2006',
      num4: '4',
      num5: '串换件'
    },
    {
      num1: 'DT2004',
      num2: '4',
      num3: 'DT2004',
      num4: '1',
      num5: '正常'
    },
    {
      num1: 'WX2005',
      num2: '12',
      num3: 'WX2005',
      num4: '4',
      num5: '正常'
    },
    {
      num1: 'WX2006',
      num2: '2',
      num3: 'WX2006',
      num4: '1',
      num5: '正常'
    }
  ]
}

const mutations = {
  CHANGE_PRODUCT(state, data) {
    state.productionBotData = data.productionBotData
  },
  DELETE_W_DATA(state, data) {
    if (state.workData) {
      state.workData.forEach((element, index) => {
        if (element.num1 === data) {
          element.num4 = parseInt(element.num4) + 1
          if (parseInt(element.num4) === parseInt(element.num2)) {
            setTimeout(() => {
              state.workData.splice(index, 1)
            }, 2000)
          }
        }
      })
    }
    // state.productionBotData = data.productionBotData
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_PRODUCT', data)
  },
  deleteWData({ commit }, data) {
    commit('DELETE_W_DATA', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

