<template>
  <div class="app">
    <Header />
    <div class="view">
      <router-view />
    </div>
    <Footer />
    <DevPanel />
    <flash-message
      transitionIn="animated swing"
      class="flashMessage"
    />
  </div>
</template>

<script>
import Footer from './components/_main/Footer';
import Header from './components/_main/Header';
import DevPanel from './components/general/DevPanel';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    DevPanel
  }
};
</script>

<style scoped>
  .flashMessage {
    position: fixed;
    top: 2vmin;
    left: 25%;
    width: 50%;
    z-index: 100;
  }
  .app {
    display: inline-block;
    width: 85%;
  }
  .view {
    margin-top: 2vmin;
    margin-bottom: 2vmin;
  }
</style>
