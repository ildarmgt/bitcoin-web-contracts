import Vuex from 'vuex';
import Vue from 'vue';

import inheritance from './modules/inheritance';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    inheritance
  }
});
