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
    state.articleList.push({
      src: "../../static/img/btn-home-inv.png",
      click: false
    })
    for(let i=1;i<10;i++) {
      state.articleList.push({
        id: i,
        src: "../../static/art1.jpg",
        click: false
      })
    }
  },
  handleArticleListClick(state, payload) {
    if(payload.preIndex) {
      state.articleList[payload.preIndex].click = false
    }
    state.articleList[payload.index].click = true
  },
  handleArticleListCancelClick(state, payload) {
    state.articleList[payload.index].click = false
  },
  loadArticleList2(state, payload) {
    state.articleList.push({
      src: "../../static/img/btn-home-inv.png",
      click: false
    })
    for(let i=0;i<10;i++) {
      state.articleList.push({
        id: "1" + i,
        src: "../../static/art2.jpg",
        click: false
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