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
        textColor="var(--color-heir-solid, rgba(0, 134, 0))"
        @click="onNextButtonClick"
        class="next"
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
