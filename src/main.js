import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'; // App state
import App from './App.vue';

// components
import IntroPage from './components/IntroPage';
import Inheritance_Intro from './components/inheritance/Inheritance_Intro';
import PuzzleDelay_Intro from './components/puzzledelay/PuzzleDelay_Intro';


Vue.use(VueRouter);

export const router = new VueRouter({
  // mode: 'history', // needs to be off for offline routing
  routes: [
    { path: '/', component: IntroPage },
    { path: '/inheritance', component: Inheritance_Intro },
    { path: '/puzzledelay', component: PuzzleDelay_Intro }
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
