const state = {
  userInfo: {},
  maskVisible: false,
  viewStudentId: null,
  courseId: null,
  subjectId: null,
  reloadHome: false,
  reloadMe: false
}

const getters = {
}

const actions = {
}

const mutations = {
  setViewStudentId(state, payload) {
    state.viewStudentId = payload
  },
  setCourseId(state, payload) {
    state.courseId = payload
  },
  setSubjectId(state, payload) {
    state.subjectId = payload
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  setReloadHome(state, payload) {
    state.reloadHome = payload
  },
  setReloadMe(state, payload) {
    state.reloadMe = payload
  },
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