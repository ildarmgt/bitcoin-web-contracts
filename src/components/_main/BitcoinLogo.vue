<template>
  <div
    class="logo noselect"
  >
    ₿
  </div>
</template>

<script>
export default {
  name: 'BitcoinLogo'
};
</script>

<style scoped>
  .logo {
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: 700;

    display: inline-block;

    width: 5vmin;
    width: calc(5 * var(--s));
    height: 5vmin;
    height: calc(5 * var(--s));
    border-radius: 5vmin;
    border-radius: calc(5 * var(--s));
    font-size: 5vmin;
    font-size: calc(5 * var(--s));
    line-height: 5.3vmin;
    line-height: calc(5.3 * var(--s));
    padding: 0.7vmin;
    padding: calc(0.7 * var(--s));
    text-align: center;
    vertical-align: middle;

    background: orange;
    color: white;
    opacity: 0.6;

    transform: rotate(20deg);

    text-decoration: none;
  }
</style>
