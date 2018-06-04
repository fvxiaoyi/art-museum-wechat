const state = {
  maskVisible: false,
  authorization: false,
  articleList: []
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
  },
  loadArticleList(state, payload) {
    for(let i=1;i<10;i++) {
      state.articleList.push({
        id: i,
        src: "../../static/art1.jpg"
      })
    }
  },
  loadArticleList2(state, payload) {
    for(let i=0;i<10;i++) {
      state.articleList.push({
        id: "1" + i,
        src: "../../static/art2.jpg"
      })
    }
  },
  articleListAddOne(state, payload) {
    state.articleList = []
    for(let i=1;i<3;i++) {
      state.articleList.push({
        id: i,
        src: "../../static/art1.jpg"
      })
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}