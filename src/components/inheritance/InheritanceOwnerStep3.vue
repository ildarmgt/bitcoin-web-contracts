<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        <div class="q__strong_text">
          What to do with
          <span class="amt">{{ getContractValues.sumOfUTXO }}</span>
          {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
          selected?
        </div>
        <div class="q__lbl1">
          <RoundButton
            textContent="Spend"
            textColor="var(--background, white)"
            @click="showSpendingForm"
          />
          <RoundButton
            textContent="Only reset timer"
            textColor="var(--background, white)"
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
        textColor="var(--color-owner-solid, rgb(102, 102, 255))"
        @click="onNextButtonClick"
        class="next"
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
    margin: 0 var(--s2);
  }
  .q__strong {
    display: block;
    text-align: center;
    font-size: var(--s3);
    color: var(--background, white);
    margin-right: var(--s3);
    margin-left: 5%;
    font-weight: bold;
  }
  .q__strong_text {
    text-align: left;
    margin-bottom: var(--s2);
  }
  .form {
    width: 88%;
    display: block;
    margin: auto;
  }
  .q__lbl1 {
    display: inline-block;
    margin-top: var(--s2);
  }
  .amt {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    padding: var(--s0-1) var(--s1);
    border-radius: var(--s1);
    font-weight: normal;
  }
  .next {
    margin-top: var(--s2);
  }
</style>
