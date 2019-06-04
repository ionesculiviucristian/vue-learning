import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    aState: '',
    anotherState: '',
    items: [
      { id: 1, title: 'Item #1' },
      { id: 2, title: 'Item #2' },
      { id: 3, title: 'Item #3' },
      { id: 4, title: 'Item #4' }
    ]
  },
  getters: {
    specialItems: (state, getters) => state.items.filter(item => item.id % 2 === 0),
    firstItem: (state) => state.items[0]
  },
  mutations: {
    increment(state, n) {
      state.count += n;
      state.aState += 'A';
      state.anotherState += 'B';
    },
    decrement(state) {
      state.count-- ;
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment', 1)
      }, 1000)
    }
  }
});
