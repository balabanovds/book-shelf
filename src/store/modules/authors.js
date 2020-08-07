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
    const response = await fetch("http://176.58.113.185:8001/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    const json = await response.json()
    commit('addAuthor', json)
  },

  async fetchAll({commit}) {
    try {
      const response = await fetch("http://176.58.113.185:8001/authors")
      const json = await response.json()
      commit('setAuthors', json)
    } catch (e) {
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
