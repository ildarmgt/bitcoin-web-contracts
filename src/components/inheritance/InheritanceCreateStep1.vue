<template>
  <div>
    <div class="question">
      <div class="question__strong">
        How long until inheritance can be claimed?
      </div>
      <div class="question__light">
        from time the contract is funded
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
        <!-- {{ numberChanged() }} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InheritanceCreateStep1',
  data: () => ({
    defaultTime: '365',
    timeValue: '365'
  }),
  methods: {
    numberChanged (event) {
      // change text input to allowed characters
      const newText = event.target.value;
      const filter = '0123456789.';
      const fixedText = newText
        .split('')
        .filter(letter => filter.indexOf(letter) > -1)
        .join('');

      // check that value is below 1.06 years or 388 days (bip 68)
      const fixedNumber = parseFloat(fixedText) > 388 ? '388' : fixedText;
      this.timeValue = fixedNumber;
      this.$refs.question__time__input.value = fixedNumber;

      window.setTimeout(() => {
        this.refreshNumber();
      }, 3000);
    },
    refreshNumber () {
      // make final check that value is non 0 and a real number or reset to default
      if (parseFloat(this.timeValue) === 0 || isNaN(this.timeValue) || !this.timeValue) {
        this.timeValue = this.defaultTime;
      }
      this.$refs.question__time__input.value = this.timeValue;
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
    /* color: black; */
    color: white;
    margin-right: 3vmin;
    font-weight: bold;
  }
  .question__light {
    display: block;
    font-size: 2vmin;
    color: white;
    margin-top: 1vmin;
    margin-left: 5%;
  }
  .question__time {
    display: block;
    margin-top: 3vmin;
    margin-bottom: 2vmin;
    text-align: left;
    margin-left: 12%;
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
  }
  input:focus{
    outline: none;
  }

  ::selection {
  background: rgba(17, 17, 51, 0.65);; /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
  background: rgba(17, 17, 51, 0.65);; /* Gecko Browsers */
  }

</style>
