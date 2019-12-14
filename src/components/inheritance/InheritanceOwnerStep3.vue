<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        What to do with 11.04 BTC selected?
        <div class="q__lbl1">
          <RoundButton
            textContent="Reset timer only"
            textColor="white"
            @click="showResetForm"
          />
          or
          <RoundButton
            textContent="Send to another address"
            textColor="white"
            @click="showSpendingForm"
          />
        </div>
      </div>
      <!-- (TODO) replace outline -->
      <!-- send to another  -->
      Recepient address:<br>
      Amount (send all)<br>
      Fee (suggest)<br>
      Remaining 0.54 BTC to be sent back and timer reset<br>
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
import RoundButton from './../general/RoundButton';

export default {
  name: 'InheritanceOwnerStep3',
  components: {
    ArrowButton,
    RoundButton
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
      this.changePage(2);
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
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
  }
</style>
