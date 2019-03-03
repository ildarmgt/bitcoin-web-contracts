<template>
  <div>
    <div class="question">
      <div class="question__strong">
        How long until inheritance can be spent by the Heir?
      </div>
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
      <div class="question__light">
        Measured from moment funding is confirmed.
        <br>
        Value can be up to 388 days.
      </div>
      <div class="nextStep">
        Next
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // state

export default {
  name: 'InheritanceCreateStep1',
  data: () => ({
    defaultTime: '365',
    timeValue: '365',
    lastTimer: null,
    isSafe: true
  }),
  methods: {
    // vuex action to change page ready status to true/false
    ...mapActions(['updatePageStatus']),
    numberChanged (event) {
      // not safe to use number until steril
      this.isSafe = false;

      // change text input to allowed characters
      const newText = event.target.value;
      const filter = '0123456789.';
      const filteredText = newText
        .split('')
        .filter(letter => filter.indexOf(letter) > -1)
        .join('');

      // check that value is below 1.06 years or 388 days (bip 68)
      const fixedNumber = parseFloat(filteredText) > 388 ? '388' : filteredText;
      this.timeValue = fixedNumber;
      this.$refs.question__time__input.value = fixedNumber;

      // let user type and do final checks after 3 sec delay of not typing
      clearTimeout(this.lastTimer);
      this.lastTimer = setTimeout(() => {
        this.refreshNumber();
      }, 3000);
    },
    refreshNumber () {
      // make scheck that value is non 0 and a real number or reset to default
      if (parseFloat(this.timeValue) === 0 || isNaN(this.timeValue) || !this.timeValue) {
        this.timeValue = this.defaultTime;
      }
      // remove pointless zeros and decimal points w/o reason
      this.timeValue = parseFloat(this.timeValue).toString();
      // update view
      this.$refs.question__time__input.value = this.timeValue;
      this.isSafe = true;
      // this.letStepperKnowIfReady();
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
    /* line-height: 4vmin; */
    height: 4vmin;
    width: 10vmin;
    text-align: center;
    border: none;
    background-color: rgba(255, 255, 255, 0.8);
    /* background: none; */
    /* border-bottom: white solid 0.3vmin; */
    color: orange;
    display: inline-block;
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

</style>
