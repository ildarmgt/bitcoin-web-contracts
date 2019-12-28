<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        <div class="q__strong_text">
          What to do with
          <span class="amt">{{ getContractValues.sumOfUTXO }}</span>
          BTC selected?
        </div>
        <div class="q__lbl1">
          <RoundButton
            textContent="Spend"
            textColor="white"
            @click="showSpendingForm"
          />
          <RoundButton
            textContent="Only reset timer"
            textColor="white"
            @click="showResetForm"
          />
        </div>
      </div>
      <div v-show="showForm">
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
import RoundButton from './../general/RoundButton';
import InheritanceHeirStep3Form from './InheritanceHeirStep3Form';

export default {
  name: 'InheritanceHeirStep3',
  components: {
    ArrowButton,
    RoundButton,
    InheritanceHeirStep3Form
  },
  data: () => ({
    showForm: false
  }),
  mounted () {
    if (this.getContractValues.showForm) {
      this.showForm = true;
    }
  },
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
    },

    showSpendingForm () {
      this.showForm = true;
      this.changeContractValues({ showForm: true, spending: true });
    },

    showResetForm () {
      this.showForm = true;
      this.changeContractValues({ showForm: true, spending: false });
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
