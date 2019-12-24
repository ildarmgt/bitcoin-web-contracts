<template>
  <div class="inheritance_owner fa">
    <Stepper
      stepperName="Spend as Owner"
      :pageWanted="getPageSelected"
      :pageInfo="getPagesInfo"
      @newPageClicked="stepperPageChangeRequested"
      :primaryColor="{'--primaryColor': 'rgb(102, 102, 255)'}"
    >
      <StepperStep
        :pageTitle="getPagesInfo[0].pageTitle"
      >
        <InheritanceOwnerStep1 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfo[1].pageTitle"
      >
        <InheritanceOwnerStep2 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfo[2].pageTitle"
      >
        <InheritanceOwnerStep3 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfo[3].pageTitle"
      >
        <InheritanceOwnerStep4 />
      </StepperStep>
    </Stepper>
  </div>
</template>

<script>
// components
import Stepper from './../general/Stepper';
import StepperStep from './../general/StepperStep';
import InheritanceOwnerStep1 from './InheritanceOwnerStep1';
import InheritanceOwnerStep2 from './InheritanceOwnerStep2';
import InheritanceOwnerStep3 from './InheritanceOwnerStep3';
import InheritanceOwnerStep4 from './InheritanceOwnerStep4';

// vuex state
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InheritanceOwner',
  components: {
    Stepper,
    StepperStep,
    InheritanceOwnerStep1,
    InheritanceOwnerStep2,
    InheritanceOwnerStep3,
    InheritanceOwnerStep4
  },
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getPagesInfo',
      'getPageSelected'
    ])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePage'
    ]),
    stepperPageChangeRequested (inNumber) {
      this.changePage(inNumber);
    }
  }
};
</script>

<style scoped>
  .inheritance_owner {
    position: relative;
  }
</style>
