<template>
  <div class="footer">
    <div class="footer__warning text_light">
      Warning: Demonstration only. Not reviewed for public use.
    </div>

    <a
      class="footer__source text_light"
      href="https://github.com/ildarmgt/bitcoin-web-contracts"
    >
      &lt; Source Code &gt;
    </a>

    <div class="footer__email text_light">
      ildarmgt@gmail.com
    </div>

    <br>
    <a
      class="footer__dl text_light"
      href="./dapp.zip"
    >
      download as zip
      <!-- icon from https://iconmonstr.com/ -->
      <svg
        viewBox="0 0 24 24"
        class="icon"
      >
        <path d="M14 2v11h2.51l-4.51 5.01-4.509-5.01h2.509v-11h4zm2-2h-8v11h-5l9 10 9-10h-5v-11zm1 22h-10v2h10v-2z" />
      </svg>
    </a>
    <br>
    <BitcoinLogo class="footer__logo" />
  </div>
</template>

<script>
import BitcoinLogo from './BitcoinLogo';

export default {
  name: 'Footer',
  components: {
    BitcoinLogo
  }
};
</script>

<style scoped>
  .footer {
    margin: 0 0 0 0;
    margin-bottom: 5vmin;
    vertical-align: middle;
  }

  .footer__warning {
    display: block;
    margin: 0 1vmin;
    margin-bottom: 0.2vmin;
  }

  .footer__source,
  .footer__email,
  .footer__dl {
    display: inline-block;
    margin: 2vmin;
    margin-bottom: 0;
    margin-top: 0;
  }
  .footer__logo {
    margin-top: 1vmin;
  }
  .icon {
    height: 1.5vmin;
    width: 1.5vmin;
    fill: rgb(149, 149, 167);

  }
</style>
