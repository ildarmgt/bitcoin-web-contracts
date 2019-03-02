import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'; // App state
import App from './App.vue';

// components
import IntroPage from './components/IntroPage';
import Inheritance from './components/inheritance/Inheritance';
import PuzzleDelay from './components/puzzledelay/PuzzleDelay';

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
