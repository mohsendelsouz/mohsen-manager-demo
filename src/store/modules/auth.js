import axios from "@/util/axios";

export default {
  namespaced: true,
  state () {
    return {
      user: JSON.parse(localStorage.getItem('manager'))|| null,
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    login({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/login', payload).then((response) => {
          let user = response.data.data;
          commit('setUser', user);
          localStorage.setItem('manager', JSON.stringify(user));

          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          resolve(user);
        }).catch((error) => {
          reject(error.response.data)
        });
      });
    },
    logout({commit}) {
      return new Promise( (resolve) => {
        axios.post('/logout')
          .finally(() => {
            commit('setUser', null);
            localStorage.removeItem('manager');
            axios.defaults.headers.common['Authorization'] = null;

            resolve(true);
          });
      });
    },
  },
  getters: {
    getUser: (state) => state.user,
  }
}