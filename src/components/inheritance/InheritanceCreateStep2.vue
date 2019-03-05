<template>
  <div>
    <div class="q">
      <!-- main page q -->
      <div class="q__strong">
        What is the <span class="owner">Owner</span>'s private key?
      </div>
      <!-- input value -->
      <div class="q__key">
        <textarea
          rows="1"
          class="q__key__input"
          ref="q__key__input"
          spellcheck="false"
          @input="updateKey"
          @change="checkValidity"
          :value="key"
        />
        <div class="q__key__btns">
          <div
            class="q__key__btns__new"
            @click="newKeyRequested"
          >
            new
          </div>
        </div>
        <!-- for later   js .textContent -->
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
        class="arrowButton fa"
        @click="onNextButtonClick"
      >
        Next
      </div>
    </div>
  </div>
</template>

<script>
import { newWIF, isWifValid } from './../../bitcoin';
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceCreateStep2',
  data: () => ({
    key: ''
  }),
  components: {},
  mounted () {
    // show initial private key
    const ownerKey = this.getContractValuesIC.ownerKey;
    if (ownerKey) {
      this.key = ownerKey;
    } else {
      this.key = this.newKey();
    }
    // update vuex
    this.updateContractValuesIC({ ownerKey: this.key });
  },
  computed: {
    ...mapGetters([
      'getContractValuesIC'
    ])
  },
  methods: {
    ...mapActions([
      'changePageIC', // change page (vuex)
      'updateContractValuesIC' // update contract values
    ]),
    checkValidity () {
      // key validity check
      const stored = this.getContractValuesIC;
      const isValid = isWifValid({
        wif: this.key,
        networkChoice: stored.networkChoice
      });
      if (!isValid) {
        this.flash('Owner key is invalid', 'error', {
          timeout: 5000,
          important: false
        });
      }
    },
    newKey () {
      return newWIF('bitcoin');
    },
    newKeyRequested () {
      const newKey = this.newKey();
      // update vuex
      this.updateContractValuesIC({ ownerKey: newKey });
      // update view
      this.key = newKey;
    },
    onNextButtonClick () {
      // now change page to step 3
      this.changePageIC(3);
    },
    updateKey (event) {
      // grab content and trim it
      let newKey = event.target.value;
      // innerHTML, innerText, textContent, innerText.trim()

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
      this.updateContractValuesIC({ ownerKey: fixedKey });

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
    font-size: 3vmin;
    color: white;
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
    border-top: 1vmin solid white;
    transition: background-color 0.15s;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: default;
    /* hide visual bug on scroll bar */
    /* firefox */
    scrollbar-color: rgba(255, 166, 0, 0.5) rgba(255, 255, 255, 0);
    scrollbar-width: thin;
  }
  /* chrome scroll bar */
  .q__key__input::-webkit-scrollbar {
    background: rgba(255, 255, 255, 0);
    height: 1vmin;
  }
  /* chrome scroll bar background */
  .q__key__input::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }
  /* scroll bar itself */
  .q__key__input::-webkit-scrollbar-thumb {
    background-color: rgba(255, 166, 0, 0.466);
    border-radius: 1vmin;
    box-shadow: inset 0 0 0 0.1vmin white;
  }
  .q__key__input:focus {
    outline: none;
  }
  .q__key__input:focus,.q__key__input:hover {
    background: white;
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
      background-color: rgb(255, 207, 118);
      position: relative;
      display: block;
      border-radius: 1vmin 2vmin 2vmin 1vmin;
      z-index: 1;
      -webkit-user-select: none;
      -moz-user-select: -moz-none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      transition: background-color 0.15s;
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
  .arrowButton:active {
    transform: translateY(0.2vmin);
  }
  .arrowButton:hover {
      background-color: white;
  }
  .owner {
    color: rgb(44, 44, 218);
    white-space:nowrap;
  }
</style>
