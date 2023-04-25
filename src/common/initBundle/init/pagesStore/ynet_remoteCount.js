
export default { //远程柜台
  state: {
    pageData: 'null',
  },
  mutations: {
    setData(state, data) {
        state.pageData = data
    },
  },
  getters: {
    getData({pageData }) {
        return pageData
    }
  }
}