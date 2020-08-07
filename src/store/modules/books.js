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
    console.log(book)
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
    try {
      const response = await fetch("http://176.58.113.185:8001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      const json = await response.json()
      commit('addBook', json)
    } catch (e) {
      console.error(e)
    }
  },

  async delete({commit}, id) {
    try {
      await fetch(`http://176.58.113.185:8001/books/${id}`, {
        method: "DELETE",
      })
    } catch (e) {
      console.error(e)
      return
    }
    commit('delBook', id)
  },

  async fetchAll({commit}) {
    try {
      const response = await fetch("http://176.58.113.185:8001/books")
      const json = await response.json()
      commit('setBooks', json)
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
