<template>
  <div class="inheritance_create">
    <InheritanceCreateMenu />
    <Stepper
      stepperName="Create Contract"
      :pageWanted="getPageSelectedIC"
      :pageInfo="getPagesInfoIC"
      @newPageClicked="stepperPageChangeRequested"
      :primaryColor="{'--primaryColor': 'orange'}"
    >
      <StepperStep
        :pageTitle="getPagesInfoIC[0].pageTitle"
      >
        <InheritanceCreateStep1 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfoIC[1].pageTitle"
      >
        <InheritanceCreateStep2 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfoIC[2].pageTitle"
      >
        <InheritanceCreateStep3 />
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfoIC[3].pageTitle"
      >
        <InheritanceCreateStep4 />
      </StepperStep>
    </Stepper>
  </div>
</template>

<script>
// components
import InheritanceCreateMenu from './InheritanceCreateMenu';
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
    InheritanceCreateStep4,
    InheritanceCreateMenu
  },
  computed: {
    ...mapGetters('inheritanceCreate', [
      'getPageSelectedIC',
      'getPagesInfoIC'
    ])
  },
  mounted () {
    this.initializeIC();
  },
  methods: {
    ...mapActions('inheritanceCreate', [
      'changePageIC',
      'initializeIC'
    ]),
    // on stepper emits change page request
    stepperPageChangeRequested (inNumber) {
      this.changePageIC(inNumber);
    }
  }
};
</script>

<style scoped>
  .inheritance_create {
    position: relative;
  }
</style>
