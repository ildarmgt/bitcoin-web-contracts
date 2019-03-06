<template>
  <router-link
    to="/"
    class="title"
  >
    <span class="title__bitcoin">Bitcoin</span> Smart Contracts
  </router-link>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
  .title {
    display: inline-block;
    /* color:rgb(17, 17, 51); */
    color:rgb(255, 255, 255);
    background-color: rgb(17, 17, 51);
    margin: 1vmin 0;
    padding: 1.5vmin 0;
    width: 100%;
    text-decoration: none;
  }

  .title__bitcoin {
    /* color:rgb(255, 218, 51); */
    color:orange;
  }
</style>
