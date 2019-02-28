<template>
  <div class="app">

    <router-link to="/" class="title">
      <span class="bitcoin">Bitcoin</span> Smart Contracts
    </router-link>

    <div class="view">
      <router-view></router-view>
    </div>

    <Footer />


  </div>
</template>

<script>
  import Footer from './components/Footer';

  export default {
    name: 'App',
    components: {
      Footer
    }
  }
</script>

<style>
  .title {
    display: inline-block;
    /* color:rgb(17, 17, 51); */
    color:rgb(255, 255, 255);
    background-color: rgb(17, 17, 51);
    margin: 1vmin 1vmin;
    padding: 1.5vmin 10vw;
    text-decoration: none;
  }

  .bitcoin {
    /* color:rgb(255, 218, 51); */
    color:orange;
  }

  .view {
  margin-top: 2vmin;
  margin-bottom: 2vmin;
  }

</style>
