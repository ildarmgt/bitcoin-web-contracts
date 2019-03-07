import Vuex from 'vuex';
import Vue from 'vue';

import inheritanceCreate from './modules/inheritanceCreate';
import inheritanceOwner from './modules/inheritanceOwner';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    inheritanceCreate,
    inheritanceOwner
  }
});
