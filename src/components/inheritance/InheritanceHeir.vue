<template>
  <div class="inheritance_heir fa">
    <Stepper
      stepperName="Spend as Heir"
      :pageWanted="getPageSelected"
      :pageInfo="getPagesInfo"
      @newPageClicked="stepperPageChangeRequested"
      :primaryColor="{'--primaryColor': 'rgb(0, 134, 0)'}"
    >
      <StepperStep
        :pageTitle="getPagesInfo[0].pageTitle"
      >
        <InheritanceHeirStep1 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfo[1].pageTitle"
      >
        <InheritanceHeirStep2 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfo[2].pageTitle"
      >
        <InheritanceHeirStep3 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfo[3].pageTitle"
      >
        <InheritanceHeirStep4 />
      </StepperStep>
    </Stepper>
  </div>
</template>

<script>
// components
import Stepper from './../general/Stepper';
import StepperStep from './../general/StepperStep';
import InheritanceHeirStep1 from './InheritanceHeirStep1';
import InheritanceHeirStep2 from './InheritanceHeirStep2';
import InheritanceHeirStep3 from './InheritanceHeirStep3';
import InheritanceHeirStep4 from './InheritanceHeirStep4';

// vuex state
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InheritanceHeir',
  components: {
    Stepper,
    StepperStep,
    InheritanceHeirStep1,
    InheritanceHeirStep2,
    InheritanceHeirStep3,
    InheritanceHeirStep4
  },
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getPagesInfo',
      'getPageSelected'
    ])
  },
  methods: {
    ...mapActions('inheritanceHeir', [
      'changePage'
    ]),
    stepperPageChangeRequested (inNumber) {
      this.changePage(inNumber);
    }
  }
};
</script>

<style scoped>
  .inheritance_heir {
    position: relative;
  }
  /* .green {
    color: white;
    background-color: green;
    background-color: rgba(0, 100, 0, 0.65);
  } */
</style>
