import Vuex from 'vuex';
import Vue from 'vue';

import inheritanceCreate from './modules/inheritanceCreate';
import inheritanceOwner from './modules/inheritanceOwner';
import inheritanceHeir from './modules/inheritanceHeir';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    inheritanceCreate,
    inheritanceOwner,
    inheritanceHeir
  }
});
