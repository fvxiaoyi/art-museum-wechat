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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}