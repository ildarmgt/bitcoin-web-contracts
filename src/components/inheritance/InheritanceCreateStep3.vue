<template>
  <div>
    <div class="q">
      <!-- main page q -->
      <div class="q__strong">
        And what is the <span class="heir">Heir</span>'s private key?
      </div>
      <!-- input value -->
      <div class="q__key">
        <textarea
          rows="1"
          class="q__key__input"
          ref="q__key__input"
          spellcheck="false"
          @input="updateKey"
          :value="key"
        />
        <div class="q__key__btns">
          <RoundButton
            textColor="var(--background, white)"
            textContent="new"
            @click="newKeyRequested"
            class="q__key__btns__new"
          />
          <div
            class="q__key__btns__warn"
            v-if="!getPagesInfoIC[2].valid"
          >
            invalid key
          </div>
        </div>
      </div>
      <!-- text to clarify qs and input  -->
      <div class="q__light">
        Generated a random key.
        <br>&nbsp;&nbsp;&nbsp;
        Press next or provide your own in WIF format.
        <a
          target="_blank"
          href="https://en.bitcoin.it/wiki/Wallet_import_format"
          class="q__light_link"
          title="Bitcoin Wiki"
        >?</a>
      </div>
      <!-- button to go to next page -->
      <ArrowButton
        textContent="Next"
        textColor="var(--bitcoin-orange, orange)"
        @click="onNextButtonClick"
      />
    </div>
  </div>
</template>

<script>
import { newWIF } from './../../bitcoin';
import { mapActions, mapGetters } from 'vuex'; // state
import RoundButton from './../general/RoundButton';
import ArrowButton from './../general/ArrowButton';

export default {
  name: 'InheritanceCreateStep3',
  data: () => ({
    key: ''
  }),
  components: {
    RoundButton,
    ArrowButton
  },
  mounted () {
    // show initial private key
    const heirPrivateKeyWIF = this.getContractValuesIC.heirPrivateKeyWIF;
    this.key = heirPrivateKeyWIF;
  },
  computed: {
    ...mapGetters('inheritanceCreate', [
      'getContractValuesIC',
      'getPagesInfoIC'
    ])
  },
  methods: {
    ...mapActions('inheritanceCreate', [
      'changePageIC', // change page (vuex)
      'updateContractValuesIC' // update contract values
    ]),
    newKey () {
      return newWIF(this.getContractValuesIC.networkChoice);
    },
    newKeyRequested () {
      const newKey = this.newKey();
      // update vuex
      this.updateContractValuesIC({ heirPrivateKeyWIF: newKey });
      // update view
      this.key = newKey;
    },
    onNextButtonClick () {
      // now change page to step 4
      this.changePageIC(4);
    },
    updateKey (event) {
      // grab content and trim it
      let newKey = event.target.value;

      // remove unwanted chars
      const base58filter = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      // https://en.wikipedia.org/wiki/Base58#cite_note-3

      let fixedKey = newKey
        // .replace(/(\r\n|\n|\r)/gm, '') // line breaks
        // .replace(/\s/g, '') // white space
        .split('')
        .filter(letter => base58filter.indexOf(letter) > -1)
        .join(''); // specific chars only

      // update vuex
      this.updateContractValuesIC({ heirPrivateKeyWIF: fixedKey });

      // this seems to be necessary
      event.target.value = fixedKey;

      // update view
      this.key = fixedKey;
    }
  }
};
</script>

<style scoped>
  .q {
    text-align: left;
  }
  .q__strong {
    display: block;
    font-size: var(--s3);
    color: var(--background, white);
    margin-left: 5%;
    font-weight: bold;
  }
  .q__key {
    display: block;
    margin-left: 7%;
    margin-right: 7%;
    margin-top: var(--s4);
    margin-bottom: var(--s3);
    text-align: center;
  }
  .q__key__input {
    display: inline-block;
    width: 95%;
    color: var(--bitcoin-orange, orange);
  }
  .q__key__btns {
    margin-top: var(--s0-5);
    margin-left: 3%;
    text-align: left;
    display: block;
  }
  .q__key__btns__new {
    margin: 0 var(--s1);
  }
  .q__light {
    display: block;
    font-size: var(--s2);
    color: var(--background, white);
    margin-top: var(--s2);
    line-height: var(--s3);
    margin-left: 15%;
  }
  .q__light_link {
    display: inline-block;
    text-align: center;
    vertical-align: top;
    font-size: var(--s2);
    line-height: var(--s2);
    width: var(--s2);
    height: var(--s2);
    padding: var(--s0-1);
    text-decoration: none;
    border-radius: var(--s2);
    background-color: var(--text-lighterondark, rgba(255, 225, 225, 0.6));
    color: var(--bitcoin-orange, orange);
  }
  .heir {
    color: var(--color-heir, rgb(0, 134, 0));
    white-space: nowrap;
    font-weight: bold;
    text-shadow:
      calc(-0.1 * var(--s)) calc(-0.1 * var(--s)) calc(0.05 * var(--s)) var(--background, white),
      var(--s0-1)           calc(-0.1 * var(--s)) calc(0.05 * var(--s)) var(--background, white),
      calc(-0.1 * var(--s)) var(--s0-1)           calc(0.05 * var(--s)) var(--background, white),
      var(--s0-1)           var(--s0-1)           calc(0.05 * var(--s)) var(--background, white);
  }
  .q__key__btns__warn {
    display: inline-block;
    margin-left: 40%;
    color: var(--background, white);
    background-color: var(--color-error-strong);
    padding: var(--s0-1) var(--s2) var(--s0-2) var(--s2);
    font-size: calc(2.3 * var(--s));
    position: relative;
    border-radius: var(--s1);
  }
  .q__key__btns__warn:after {
    position: absolute;
    right: calc(10 * var(--s));
    top: calc(-2 * var(--s));
    content: "";
    width: 0;
    height: 0;
    border-left: var(--s1) solid transparent;
    border-right: var(--s1) solid transparent;
    border-bottom: calc(2.1 * var(--s)) solid var(--color-error-strong);
  }
</style>
