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
        <InheritanceOwnerStep3Form
          class="form"
        />
      </div>
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
import InheritanceOwnerStep3Form from './InheritanceOwnerStep3Form';

export default {
  name: 'InheritanceOwnerStep3',
  components: {
    ArrowButton,
    RoundButton,
    InheritanceOwnerStep3Form
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
    ...mapGetters('inheritanceOwner', [
      'getContractValues'
    ])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
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
