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
          <div
            class="q__key__btns__new"
            @click="newKeyRequested"
          >
            new
          </div>
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
      <div
        class="arrowButton"
        @click="onNextButtonClick"
        v-if="getPagesInfoIC[3].usable"
      >
        Next
      </div>
    </div>
  </div>
</template>

<script>
import { newWIF } from './../../bitcoin';
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceCreateStep3',
  data: () => ({
    key: ''
  }),
  components: {},
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

      if (fixedKey !== newKey) {
        console.log('String had illegal chars. Old string:', newKey);
      }

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
    /* margin: 0vmin 2vmin; */
  }
  .q__strong {
    display: block;
    font-size: 3vmin;
    color: white;
    /* margin-right: 3vmin; */
    margin-left: 5%;
    font-weight: bold;
  }
  .q__key {
    display: block;
    margin-left: 7%;
    margin-right: 7%;
    margin-top: 4vmin;
    margin-bottom: 3vmin;
    text-align: center;
  }
  .q__key__input {
    font-family: 'Montserrat';
    display: inline-block;
    resize: none;
    font-size: 2.3vmin;
    padding: 0.2vmin 1vmin;
    height: 3.6vmin;
    width: 95%;
    text-align: center;
    background-color: white;
    color: orange;
    border: 0.1vmin solid white;
    border-right: 0.3vmin solid white;
    border-left: 0.3vmin solid white;
    border-top: 0.5vmin solid white;
    transition: background-color 0.15s;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: default;
  }
  .q__key__btns {
    margin-top: 0.5vmin;
    margin-left: 3%;
    text-align: left;
    display: block;
  }
  .q__key__btns__new {
    display: inline-block;
    margin: 0 1vmin;
    padding: 0.5vmin 1vmin;
    font-size: 2.5vmin;
    height: 2.5vmin;
    line-height: 2.5vmin;
    border-radius: 3vmin;
    color: white;
    border: 0.2vmin white solid;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }
  .q__key__btns__new:hover {
    transform: translateY(-0.1vmin);
  }
  .q__key__btns__new:active {
    transform: translateY(0.1vmin);
  }
  .q__light {
    display: block;
    font-size: 2vmin;
    color: white;
    margin-top: 2vmin;
    line-height: 3vmin;
    margin-left: 15%;
  }
  .q__light_link {
    display: inline-block;
    text-align: center;
    vertical-align: top;
    font-size: 2vmin;
    line-height: 2vmin;
    width: 2vmin;
    height: 2vmin;
    padding: 0.1vmin;
    text-decoration: none;
    /* border: 1px solid white; */
    border-radius: 2vmin;
    background-color: rgba(255, 255, 255, 0.527);
    color: orange;

  }
  .arrowButton {
      font-size: 3vmin;
      margin: 0 auto;
      margin-top: 5vmin;
      width: max-content;
      height: 5vmin;
      line-height: 5vmin;
      text-align: center;
      padding: 0 3vmin 0 2vmin;
      color: orange;
      background-color: rgb(255, 255, 255);
      opacity: 0.75;
      position: relative;
      display: block;
      border-radius: 1vmin 2vmin 2vmin 1vmin;
      z-index: 1;
      -webkit-user-select: none;
      -moz-user-select: -moz-none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      transition: opacity 0.15s;
  }
  .arrowButton:after{
      position: absolute;
      right: -1.37vmin;
      top: 0;
      content: "";
      width: 5vmin;
      height: 5vmin;
      background-color: inherit;
      border-radius: 2vmin 1.3vmin 1vmin 1.3vmin;
      transform: rotate(-45deg) scale(0.707);
      z-index: 0;
  }
  .arrowButton:hover {
    opacity: 1;
  }
  .arrowButton:active {
    transform: translateY(0.2vmin);
  }
  .heir {
    color: rgb(0, 134, 0);
    white-space:nowrap;
  }
  .q__key__btns__warn {
    display: inline-block;
    margin-left: 40%;
    color: white;
    background-color: rgb(255, 42, 42);
    padding: 0.1vmin 2vmin 0.2vmin 2vmin;
    font-size: 2.3vmin;
    position: relative;
    border-radius: 1vmin;
  }
  .q__key__btns__warn:after {
    position: absolute;
    right: 10vmin;
    top: -2vmin;
    content: "";
    width: 0;
    height: 0;
    border-left: 1vmin solid transparent;
    border-right: 1vmin solid transparent;
    border-bottom: 2.1vmin solid rgb(255, 42, 42);
  }

</style>
