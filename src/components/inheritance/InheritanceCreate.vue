<template>
  <div class="inheritance_create">
    <Stepper
      stepperName="Create Contract"
      :pageWanted="getPageSelectedIC"
      @newPageClicked="stepperPageChangeRequested"
    >
      <StepperStep pageTitle="Will Timer">
        <InheritanceCreateStep1 />
      </StepperStep>
      <StepperStep pageTitle="Owner Key">
        <InheritanceCreateStep2 />
      </StepperStep>
      <StepperStep pageTitle="Heir Key">
        <InheritanceCreateStep3 />
      </StepperStep>
      <StepperStep pageTitle="Done">
        <InheritanceCreateStep4 />
      </StepperStep>
    </Stepper>
  </div>
</template>

<script>
// components
import Stepper from './../general/Stepper';
import StepperStep from './../general/StepperStep';
import InheritanceCreateStep1 from './InheritanceCreateStep1';
import InheritanceCreateStep2 from './InheritanceCreateStep2';
import InheritanceCreateStep3 from './InheritanceCreateStep3';
import InheritanceCreateStep4 from './InheritanceCreateStep4';

// vuex state
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InheritanceCreate',
  components: {
    Stepper,
    StepperStep,
    InheritanceCreateStep1,
    InheritanceCreateStep2,
    InheritanceCreateStep3,
    InheritanceCreateStep4
  },
  computed: {
    ...mapGetters(['getPageSelectedIC'])
  },
  methods: {
    ...mapActions(['changePageIC']),
    stepperPageChangeRequested (inNumber) {
      this.changePageIC(inNumber);
    }
  }
};
</script>

<style scoped>

</style>
