<template>
  <div class="app">
    <div class="title">
      <span class="gold">Bitcoin</span> Smart Contracts
    </div>

    <div class="view">
      <router-view></router-view>
    </div>

    <div class="warning">
      Warning: Demonstration only. Not reviewed for public use.
    </div>

    <div class="footer">
      <a href="https://github.com/ildarmgt/bitcoin-web-contracts" class="clean">
        Source Code
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
  .footer {
    margin: 3vh 0 0 0;
    font-size: 1.5vh;
  }
  .gold {
    color:rgb(255, 218, 51);
  }
</style>
