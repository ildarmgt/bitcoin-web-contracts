<template>
  <div>
    <h1>Inheritance Contract dApp</h1>
    <div class="description">
      <ul>
        <li>
          The key of party <span class="key_blue">"Owner"</span> can access the funds at any time.
        </li>
        <li>
          The key of party <span class="key_green">"Heir"</span> is allowed access to the funds
          only if the funds remain untouched for a specified length of time.
        </li>
      </ul>
      (e.g. I will spend Bitcoin from this type of address, moving them at least once a year. But if something happens to me and I don't move them in 1 year, my sister can access the funds.)
    </div>

    <div class="choices">
      <router-link to="/inheritance" class="button orange">Create this contract</router-link>
      <router-link to="/inheritance" class="button blue">Spend as Owner</router-link>
      <router-link to="/inheritance" class="button green">Spend as Heir</router-link>
    </div>
    <br>Temp random private key test: {{ generateRandomKey }}
  </div>
</template>

<script>
  import bitcoin from 'bitcoinjs-lib';

  export default {
    name: 'Inheritance_Intro',
    computed: {
      generateRandomKey () {
        const keyPair = bitcoin.ECPair.makeRandom();
        return keyPair.toWIF();
      }
    }
  };
</script>

<style scoped>
  .description {
    display: block;
    width: 80%;
    margin: 0 auto;
    text-align: justify;;
  }

  .key_blue {
    /* font-weight: bold; */
    background-color: blue;
    opacity: 0.6;
    color: white;
    white-space:nowrap;
    margin: 0.4vmin;
    padding: 0.3vmin 2vmin;
    /* border-radius: 3vmin; */
    vertical-align: middle;
  }

  .key_green {
    /* font-weight: bold; */
    background-color: green;
    opacity: 0.6;
    color: white;
    white-space:nowrap;
    margin: 0.4vmin;
    padding: 0.3vmin 2vmin;
    /* border-radius: 3vmin; */
    vertical-align: middle;
  }

  .choices {
    margin: 2vmin;
  }
</style>
