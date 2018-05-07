const state = {
  maskVisible: true
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
    alert(1)
    state.maskVisible = payload.visible
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}