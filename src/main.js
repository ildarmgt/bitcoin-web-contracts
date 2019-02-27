import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'; // App state
import App from './App.vue';

// components
import IntroPage from './components/IntroPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history', // not hash router
  routes: [
    { path: '/', component: IntroPage }
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
