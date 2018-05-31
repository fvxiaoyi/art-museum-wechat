const state = {
  maskVisible: false,
  authorization: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  changeMaskVisible(state, payload) {
    state.maskVisible = payload.visible
  },
  changeAuthorization(state, payload) {
    state.authorization = payload.authorization
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}