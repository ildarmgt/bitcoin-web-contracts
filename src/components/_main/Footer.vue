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
      &lt; download as zip &gt;
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
</style>
