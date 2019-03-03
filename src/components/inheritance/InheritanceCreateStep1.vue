<template>
  <div>
    <div class="question">
      <div class="question_strong">
        Start by generating or providing a public key:
      </div>
      <div class="question_light">
        "WIF": {{ getKeyPair().private }}
      </div>
    </div>
  </div>
</template>

<script>
import bitcoin from 'bitcoinjs-lib';

export default {
  name: 'InheritanceCreateStep1',
  methods: {
    getKeyPair () {
      const keys = bitcoin.ECPair.makeRandom();
      return {
        private: keys.toWIF(),
        public: keys.publicKey
      };
    }
  }
};
</script>

<style scoped>
  .question {
    text-align: left;
    margin: 0vmin 2vmin;
  }
  .question_strong {
    display: block;
    font-size: 3vmin;
    color: black;
    margin-right: 3vmin;
  }
  .question_light {
    display: block;
    font-size: 2vmin;
    color: black;
    margin-top: 2vmin;
    margin-left: 3vmin;
  }
</style>
