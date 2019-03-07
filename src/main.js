import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store'; // App state
import VueFlashMessage from 'vue-flash-message'; // flash msg

// components
import IntroPage from './components/_main/IntroPage';
import Inheritance from './components/inheritance/Inheritance';
import PuzzleDelay from './components/puzzledelay/PuzzleDelay';

// global css
require('./assets/css/global.css');

// add router
Vue.use(VueRouter);

// flash msg
require('./assets/css/vue-flash-message.css');
Vue.use(VueFlashMessage);

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
