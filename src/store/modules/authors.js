import {FULL_BASE_URL} from '../../main'

const state = {
  authors: []
}

const getters = {
  filteredBySearch(state, getters, rootState, rootGetters) {
    const srch = rootGetters.searchLower
    return state.authors.filter((a) => {
      return (
        a.firstName.toLowerCase().includes(srch) ||
        a.lastName.toLowerCase().includes(srch) ||
        a.country.toLowerCase().includes(srch)
      );
    });
  },

  getBooks: (state, getters, rootState) => author => {
    const books = rootState.books.books
    return author.books.flatMap(i => books.filter(b => b.id === i))
  }
}

const mutations = {
  addAuthor(state, payload) {
    state.authors.push(payload)
  },
  setAuthors(state, payload) {
    state.authors = payload
  }
}

const actions = {
  async create({commit}, payload) {
    let json = ''
    try {
      const response = await fetch(`${FULL_BASE_URL}/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
      json = await response.json()
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      return
    }
    commit('addAuthor', json)
  },

  async fetchAll({commit}) {
    try {
      const response = await fetch(`${FULL_BASE_URL}/authors`, {
        headers: {
        }
      })
      const json = await response.json()
      commit('setAuthors', json)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
