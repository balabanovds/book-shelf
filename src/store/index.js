import Vuex from 'vuex'
import Vue from 'vue'
import authors from "./modules/authors";
import books from "./modules/books";


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authors,
    books
  },
  state: {
    search: ''
  },
  getters: {
    searchLower(state) {
      return state.search.toLowerCase()
    }
  },
  mutations: {
    setSearch(state, payload) {
      state.search = payload.toString()
    }
  },
  actions: {

  }
})

export default store
