import {BASE_URL} from '../../main'

const state = {
  books: []
}

const getters = {
  filteredBySearch(state, getters, rootState, rootGetters) {
    const srch = rootGetters.searchLower
    return state.books.filter((b) => {
      return (
        b.title.toLowerCase().includes(srch) ||
        b.year.toString().includes(srch) ||
        b.price.toString().includes(srch) ||
        b.category.toLowerCase().includes(srch)
      );
    })
  },

  getAuthors: (state, getters, rootState) => book => {
    return rootState.authors.authors.filter((a) =>
      a.books.some((val) => val === book.id)
    );
  }
}

const mutations = {
  addBook(state, payload) {
    state.books.push(payload)
  },

  delBook(state, id) {
    state.books = state.books.filter(b => b.id !== id)
  },

  setBooks(state, payload) {
    state.books = payload
  }
}

const actions = {
  async create({commit}, payload) {
    let json = ''
    try {
      const response = await fetch(`${BASE_URL}/books`, {
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
    commit('addBook', json)
  },

  async delete({commit}, id) {
    try {
      await fetch(`${BASE_URL}/books/${id}`, {
        method: "DELETE",
        headers: {
        }
      })
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      return
    }
    commit('delBook', id)
  },

  async fetchAll({commit}) {
    try {
      const response = await fetch(`${BASE_URL}/books`, {
        headers: {
        }
      })
      const json = await response.json()
      commit('setBooks', json)
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
