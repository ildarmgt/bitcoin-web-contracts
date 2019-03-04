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
        Create the Heir's key
      </StepperStep>
      <StepperStep pageTitle="Back up">
        Back up the information
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

// vuex state
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InheritanceCreate',
  components: {
    Stepper,
    StepperStep,
    InheritanceCreateStep1,
    InheritanceCreateStep2
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
