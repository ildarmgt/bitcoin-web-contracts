<template>
  <div class="app">
    <router-link to="/" class="title">
      <span class="gold">Bitcoin</span> Smart Contracts
    </router-link>

    <div class="view">
      <router-view></router-view>
    </div>

    <div class="warning">
      Warning: Demonstration only. Not reviewed for public use.
    </div>

    <div class="footer">
      <a href="https://github.com/ildarmgt/bitcoin-web-contracts" class="clean">
        {{'< '}}Source Code{{' >'}}
      </a>
      <div class="clean">ildarmgt@gmail.com</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style scoped>
  .title {
    display: inline-block;
    font-size: 4vh;
    /* color:rgb(17, 17, 51); */
    color:rgb(255, 255, 255);
    background-color: rgb(17, 17, 51);
    margin: 1vh 1vh;
    padding: 1.5vh 10vw;
    text-decoration: none;
  }

  .footer {
    margin: 3vh 0 0 0;
    font-size: 1.5vh;
  }
  .gold {
    color:rgb(255, 218, 51);
  }

  div {
    cursor: default;
  }
</style>
