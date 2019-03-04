<template>
  <div>
    <div class="question">
      <!-- main page question -->
      <div class="question__strong">
        How long until inheritance can be spent by the Heir?
      </div>
      <!-- input value -->
      <div class="question__time">
        <input
          type="text"
          class="question__time__input"
          ref="question__time__input"
          maxlength="5"
          :value="timeValue"
          @input="numberChanged"
          @change="refreshNumber"
        >
        <div class="question__time__label">
          days
        </div>
      </div>
      <!-- text to clarify questions and input  -->
      <div class="question__light">
        To be measured from moment funding is confirmed.<br>
        &nbsp;&nbsp;&nbsp;Value of up to 388 days.
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
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceCreateStep1',
  data: () => ({
    timeValue: '365', // stores number to display
    lastTimer: null // stores timer id used for fixing numbers
  }),
  mounted () {
    // load default time value from vuex
    this.timeValue = this.getDelayIC;
  },
  computed: {
    ...mapGetters([
      'getDelayIC' // get delay from vuex of inheritance contract
    ])
  },
  methods: {
    ...mapActions([
      'updatePageStatusIC', // set page ready status to true/false (vuex)
      'changePageIC', // set selected page (vuex)
      'updateContractValuesIC' // set stored contract values (vuex)
    ]),
    // modifies input value to match only filtered values and
    // initiates a timer to fix nonsense values after delay
    numberChanged (event) {
      // change text input to allowed characters
      const newText = event.target.value;
      const filter = '0123456789.'; // only these characters allowed
      const filteredText = newText
        .split('')
        .filter(letter => filter.indexOf(letter) > -1)
        .join('');

      // check that value is below 1.06 years or 388 days (bip 68)
      const fixedNumber = parseFloat(filteredText) > 388 ? '388' : filteredText;

      // update values
      this.$refs.question__time__input.value = this.timeValue = fixedNumber;

      // let user type and do final checks after 3 sec delay of not typing
      // this way user's not interrupted if erasing all or mistyped
      // start by clearing out last timer and setting new timer
      clearTimeout(this.lastTimer);
      this.lastTimer = setTimeout(() => {
        this.refreshNumber();
      }, 3000);
    },
    // get rid of blank, non-numbers,
    refreshNumber () {
      // make sceck that value is non-0, not blank, and a real number
      // or reset to default number
      let inputValue = this.timeValue;
      if (
        parseFloat(inputValue) === 0 ||
        isNaN(inputValue) ||
        !inputValue
      ) {
        inputValue = this.getDelayIC;
      }

      // remove pointless zeros and decimal points w/o reason
      inputValue = parseFloat(inputValue).toString();

      // update view
      // div might not exist so wrapped in try
      try {
        this.$refs.question__time__input.value = inputValue;
      } catch (e) {}
      // update page readiness
      this.updatePageStatusIC({ pageIndex: 0, status: true });
      // update contract value
      this.updateContractValuesIC({ daysDelay: inputValue });
    },
    // next button event
    onNextButtonClick () {
      // convert to valid number
      this.refreshNumber();
      // now change page to step 2
      this.changePageIC(2);
    }
  }
};
</script>

<style scoped>
  .question {
    text-align: left;
    margin: 0vmin 2vmin;
  }
  .question__strong {
    display: block;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
  }
  .question__time {
    display: block;
    margin-top: 4vmin;
    margin-bottom: 3vmin;
    text-align: left;
    margin-left: 10%;
  }
  .question__time__input {
    font-size: 3vmin;
    height: 4vmin;
    width: 10vmin;
    text-align: center;
    border: none;
    background-color: rgba(255, 255, 255, 0.75);
    color: orange;
    display: inline-block;
    transition: background-color 0.15s;
  }
  .question__time__input:focus,.question__time__input:hover {
    background: white;
  }
  .question__time__label {
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
  input:focus{
    outline: none;
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
