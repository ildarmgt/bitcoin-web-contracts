<template>
  <div class="app">
    <Header />
    <div class="view">
      <router-view />
    </div>
    <Footer />
    <DevPanel />
  </div>
</template>

<script>
import Footer from './components/Footer';
import Header from './components/Header';
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

<style>
  .app {
    display: inline-block;
    width: 85%;
  }

  .view {
    margin-top: 2vmin;
    margin-bottom: 2vmin;
  }
</style>
