import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store'; // App state
import VueFlashMessage from 'vue-flash-message'; // flash msg

// components
import IntroPage from './components/_main/IntroPage';
// import Inheritance from './components/inheritance/Inheritance';
import PuzzleDelay from './components/puzzledelay/PuzzleDelay';

// global css
import './assets/css/global.css';
import './assets/css/vue-flash-message.css';

// add router
Vue.use(VueRouter);

// flash message
Vue.use(VueFlashMessage);

export const router = new VueRouter({
  // mode: 'history', // needs to be off for offline routing
  routes: [
    { path: '/', component: IntroPage },
    { path: '/inheritance', component: () => import('./components/inheritance/Inheritance.vue') },
    { path: '/puzzledelay', component: PuzzleDelay }
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
