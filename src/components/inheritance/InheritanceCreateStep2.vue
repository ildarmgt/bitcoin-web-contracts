<template>
  <div>
    <div class="question">
      <!-- main page question -->
      <div class="question__strong">
        What private key to use for the Owner?
      </div>
      <!-- input value -->
      <div class="question__key">
        <div
          contenteditable="true"
          class="question__key__input"
          ref="question__key__input"
        >
          {{ key }}
        </div>
        <!-- for later @input="" @change="" js .textContent -->
      </div>

      <!-- text to clarify questions and input  -->
      <div class="question__light">
        Private key is in
        <a href="https://en.bitcoin.it/wiki/Wallet_import_format">
          WIF format
        </a>
        &nbsp;&nbsp;&nbsp;
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
import bitcoin from 'bitcoinjs-lib'; // bitcoin lib
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceCreateStep2',
  data: () => ({
    key: ''
  }),
  components: {},
  mounted () {
    // generate initial private key
    this.key = bitcoin.ECPair.makeRandom().toWIF();
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([
      'changePageIC' // change page (vuex)
    ]),
    onNextButtonClick () {
      // now change page to step 3
      this.changePageIC(3);
    }
  }
};
</script>

<style scoped>
  .question {
    text-align: left;
    /* margin: 0vmin 2vmin; */
  }
  .question__strong {
    display: block;
    font-size: 3vmin;
    color: white;
    /* margin-right: 3vmin; */
    margin-left: 5%;
    font-weight: bold;
  }
  .question__key {
    display: block;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 4vmin;
    margin-bottom: 3vmin;
    text-align: left;
  }
  .question__key__input {
    font-size: 3vmin;
    /* height: 2vmin; */
    width: 100%;
    text-align: center;
    border: none;
    background-color: rgba(255, 255, 255, 0.75);
    color: orange;
    border: 1vmin orange solid;
    display: inline-block;
    transition: background-color 0.15s;
    overflow-x: auto;
    white-space: nowrap;
    /* firefox */
    scrollbar-color: rgba(255, 166, 0, 0.5) rgba(255, 166, 0, 0);
    scrollbar-width: thin;
  }
  /* scroll bar */
  .question__key__input::-webkit-scrollbar {
    background: orange;
    /* width: 5px; */
  }
  /* scroll bar background */
  .question__key__input::-webkit-scrollbar-track {
    background: orange;
  }
  /* scroll bar itself */
  .question__key__input::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1vh;
    border: 0.4vh solid orange;
  }
  .question__key__input:focus {
    outline: none;
  }
  .question__key__input:focus,.question__key__input:hover {
    background: white;
  }
  .question__key__label {
    font-size: 3vmin;
    color: white;
    margin-left: 1vmin;
    display: inline-block;
    font-weight: bold;
  }
  .question__light {
    display: block;
    font-size: 2vmin;
    color: white;
    margin-top: 2vmin;
    line-height: 2.7vmin;
    margin-left: 15%;
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
</style>
