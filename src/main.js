import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store'; // App state

import VueFlashMessage from 'vue-flash-message';

// components
import IntroPage from './components/_main/IntroPage';
import Inheritance from './components/inheritance/Inheritance';
import PuzzleDelay from './components/puzzledelay/PuzzleDelay';

require('vue-flash-message/dist/vue-flash-message.min.css');
Vue.use(VueFlashMessage);

Vue.use(VueRouter);

export const router = new VueRouter({
  // mode: 'history', // needs to be off for offline routing
  routes: [
    { path: '/', component: IntroPage },
    { path: '/inheritance', component: Inheritance },
    { path: '/puzzledelay', component: PuzzleDelay }
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
