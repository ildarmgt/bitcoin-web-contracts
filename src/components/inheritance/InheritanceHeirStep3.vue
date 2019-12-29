<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        <div class="q__strong_text">
          Where to send
          <span class="amt">{{ getContractValues.sumOfUTXO }}</span>
          {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
          selected?
        </div>
      </div>
      <div>
        <InheritanceHeirStep3Form
          class="form"
        />
      </div>
      <!-- next button -->
      <ArrowButton
        textContent="Next"
        textColor="rgb(0, 134, 0)"
        @click="onNextButtonClick"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

import ArrowButton from './../general/ArrowButton';
// import RoundButton from './../general/RoundButton';
import InheritanceHeirStep3Form from './InheritanceHeirStep3Form';

export default {
  name: 'InheritanceHeirStep3',
  components: {
    ArrowButton,
    InheritanceHeirStep3Form
  },
  data: () => ({}),
  mounted () {},
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getContractValues'
    ])
  },
  methods: {
    ...mapActions('inheritanceHeir', [
      'changePage',
      'changeContractValues'
    ]),

    // next button event
    onNextButtonClick () {
      this.changePage(4);
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
    margin-top: 2vmin;
  }
  .amt {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.1vmin 1vmin;
    border-radius: 1vmin;
    font-weight: normal;
  }
</style>
