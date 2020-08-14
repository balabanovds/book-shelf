import Vuex from 'vuex';
import Vue from 'vue';
import authors from "./modules/authors";
import books from "./modules/books";


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authors,
    books
  },
  state: {
    search: '',
    exchangeUSDtoRUB: 1,
    isUSD: true
  },
  getters: {
    searchLower(state) {
      return state.search.toLowerCase();
    },
    calcCurrency: (state) => value => {
      if (!state.isUSD) {
        value = value * state.exchangeUSDtoRUB
      }

      return parseFloat((value / 100).toFixed(2))
    },
    formatPrice: (state, getters) => value => {
      return state.isUSD
        ? `$ ${getters.calcCurrency(value)}`
        : `${getters.calcCurrency(value)} руб`
    }
  },
  mutations: {
    setSearch(state, payload) {
      state.search = payload.toString();
    },
    toggleCurrency(state) {
      state.isUSD = !state.isUSD
    },
    setRate(state, value) {
      state.exchangeUSDtoRUB = value
    }
  },
  actions: {
    async fetchRates({commit}){
      try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {})

        const json = await response.json()

        commit('setRate', +json.Valute.USD.Value)
      } catch (e) {
        console.error('fetch failed', e)
      }

    }
  }
});

export default store;
