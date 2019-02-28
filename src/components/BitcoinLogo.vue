<template>
  <a href="https://bitcoin.org/" class="logo">₿</a>
</template>

<script>
  export default {
    name: 'BitcoinLogo'
  }
</script>

<style scoped>
  .logo {
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: 700;

    display: inline-block;

    width: 5vmin;
    height: 5vmin;
    border-radius: 5vmin;
    font-size: 5vmin;
    line-height: 5.3vmin;
    padding: 0.7vmin;
    text-align: center;
    vertical-align: middle;

    background: orange;
    color: white;
    /* opacity: 0.6; */

    transform: rotate(20deg);

    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;

    text-decoration: none;
  }
</style>