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

    width: calc(5 * var(--s));
    height: calc(5 * var(--s));
    border-radius: calc(5 * var(--s));
    font-size: calc(5 * var(--s));
    line-height: calc(5.3 * var(--s));
    padding: calc(0.7 * var(--s));
    text-align: center;
    vertical-align: middle;

    background: var(--bitcoin-orange, orange);
    color: white;
    opacity: 0.7;

    transform: rotate(20deg);

    text-decoration: none;
  }
</style>
