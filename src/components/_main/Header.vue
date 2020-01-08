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
    color: var(--background, white);
    background-color: var(--bitcoin-blue, rgb(17, 17, 51));
    margin: var(--s1) 0;
    padding: var(--s1-5) 0;
    width: 100%;
    text-decoration: none;
  }

  .title__bitcoin {
    /* color:rgb(255, 218, 51); */
    color: var(--bitcoin-orange, orange);
  }
</style>
