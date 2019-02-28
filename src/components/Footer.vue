<template>
  <div class="footer">

    <div class="footer_warning text_light">
      Warning: Demonstration only. Not reviewed for public use.
    </div>

    <a class="footer_source text_light" href="https://github.com/ildarmgt/bitcoin-web-contracts">
      &lt; Source Code &gt;
    </a>

    <div class="footer_email text_light">
      ildarmgt@gmail.com
    </div>
    <br>
    <BitcoinLogo />
  </div>
</template>

<script>
  import BitcoinLogo from './BitcoinLogo';

  export default {
    name: 'Footer',
    components: {
      BitcoinLogo
    }
  }
</script>

<style>
  .footer {
    margin: 0 0 0 0;
    vertical-align: middle;
  }

  .footer_warning {
    display: block;
    margin: 0 1vmin;
  }

  .footer_source {
    display: inline-block;
    margin: 1vmin;
  }

  .footer_email {
    display: inline-block;
    margin: 1vmin;
  }

</style>

