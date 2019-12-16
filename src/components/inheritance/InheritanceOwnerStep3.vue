<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        <div class="q__strong_text">
          What to do with 11.04 BTC selected?
        </div>
        <div class="q__lbl1">
        <!--
          <RoundButton
            textContent="Only reset timer"
            textColor="white"
            @click="showResetForm"
          />
          <br>or<br>
          <RoundButton
            textContent="Send to another address"
            textColor="white"
            @click="showSpendingForm"
          />
        -->
        </div>
      </div>
      <!-- (TODO) replace outline -->
      <InheritanceOwnerStep3Form
        class="form"
      />
      <!-- next button -->
      <ArrowButton
        textContent="Next"
        textColor="rgb(102, 102, 255)"
        @click="onNextButtonClick"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

import ArrowButton from './../general/ArrowButton';
// import RoundButton from './../general/RoundButton';
import InheritanceOwnerStep3Form from './InheritanceOwnerStep3Form';

export default {
  name: 'InheritanceOwnerStep3',
  components: {
    ArrowButton,
    // RoundButton,
    InheritanceOwnerStep3Form
  },
  data: () => ({}),
  mounted () {},
  computed: {
    ...mapGetters('inheritanceOwner', [])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePage'
    ]),
    // next button event
    onNextButtonClick () {
      // now change page to step 2
      this.changePage(3);
    },

    showSpendingForm () {

    },

    showResetForm () {

    }
  }
};
</script>

<style scoped>
  .q {
    text-align: left;
    margin: 0vmin 2vmin;
  }
  .q__strong {
    display: block;
    text-align: center;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
  }
  .q__strong_text {
    text-align: left;
    margin-bottom: 2vmin;
  }
  .form {
    width: 88%;
    display: block;
    margin: auto;
  }
  .q__lbl1 {
    display: inline-block;
  }
</style>
