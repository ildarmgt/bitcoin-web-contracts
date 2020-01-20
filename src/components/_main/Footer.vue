<template>
  <div class="footer">
    <div class="footer__warning text_light">
      Warning: Demonstration only. Not reviewed for public use.
    </div>
    <div
      class="footer__address text_light"
    >
      donate: 1HYhi1D8VCv4dRZhbAy1ghKGRv3UU34pb6
    </div>
    <a
      class="footer__source text_light"
      href="https://github.com/ildarmgt/bitcoin-web-contracts"
      target="_blank"
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
    margin-bottom: var(--s5);
    margin-top: var(--s5);
    vertical-align: middle;
  }
  .footer__warning {
    display: block;
    margin: 0 var(--s1);
    margin-bottom: var(--s0-2);
  }
  .footer__source,
  .footer__email,
  .footer__dl {
    display: inline-block;
    margin: var(--s2);
    margin-left: var(--s1);
    margin-right: var(--s1);
    margin-bottom: 0;
    margin-top: 0;
  }
  .footer__logo {
    margin-top: var(--s1);
  }
  .icon {
    height: var(--s1-5);
    width: var(--s1-5);
    fill: var(--text-darkeronlight, rgb(149, 149, 167));
    vertical-align: middle;
  }
  .footer__address {
    margin-top: calc(1.2 * var(--s));
    margin-bottom: calc(0.3 * var(--s));
    display: block;
  }
  a:hover {
    color: black;
  }
  a:hover .icon {
    fill: black;
  }
</style>
