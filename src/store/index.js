const state = {
  userInfo: {},
  maskVisible: false,
  banners: [],
  articleList: [],
  articleListLoadMoreEnd: false,
  totalArticleList: 0,
  viewStudentId: null
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  setBanner(state, payload) {
    if(!state.userInfo.auth) {
      state.banners.push({
        id: 0,
        originalUrl: '../../static/img/home-Banner-1.png'
      })
    }
    payload.data.forEach(b => state.banners.push(b))
  },
  setViewStudentId(state, payload) {
    state.viewStudentId = payload
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  setArticleList(state, payload) {
    if(!state.userInfo.auth) {
      state.articleList.push({
        id: null
      })
    }
    payload.data.forEach(d => state.articleList.push(d))
    state.totalArticleList = payload.total
    state.articleListLoadMoreEnd = payload.page * 10 >= payload.total
  },
  clearArticleList(state, payload) {
    state.articleList = []
    state.totalArticleList = 0
    state.articleListLoadMoreEnd = false
  },
  changeMaskVisible(state, payload) {
    state.maskVisible = payload.visible
  },
  handleArticleListClick(state, payload) {
    if(payload.preIndex != null) {
      state.articleList[payload.preIndex].click = 0
    }
    state.articleList[payload.index].click = 1
  },
  handleArticleListCancelClick(state, payload) {
    state.articleList[payload.index].click = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}