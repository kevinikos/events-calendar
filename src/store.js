import Vue    from 'vue';
import Vuex   from 'vuex';
import events from './events.data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPanelVisible: false,
    selectedDate: '',
    events,
  },
  mutations: {
    selectField(state, date) {
      state.selectedDate = `${date.year}-${date.month}-${date.day}`;
    },
    removeEvent(state, id) {
      state.events.splice(state.events.findIndex(event => event.id === id), 1);
    },
  },
  actions: {},
});
