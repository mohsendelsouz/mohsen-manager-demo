export default {
  namespaced: true,
  state () {
    return {
      title: null,
      jobs: [],
      type: null
    }
  },
  mutations: {
    setTitle(state, payload) {
      state.title = payload;
    },
    setJobs(state, payload) {
      state.jobs = payload;
    },
    setType(state, payload) {
      state.type = payload;
    },
  },
  getters: {
    getTitle: (state) => state.title,
    getJobs: (state) => state.jobs,
    getType: (state) => state.type,
  }
}