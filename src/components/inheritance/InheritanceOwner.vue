<template>
  <div class="inheritance_owner">
    <Stepper
      stepperName="Spend as Owner"
      :pageWanted="getPageSelectedICO"
      :pageInfo="getPagesInfoICO"
      @newPageClicked="stepperPageChangeRequested"
      :primaryColor="{'--primaryColor': 'rgb(102, 102, 255)'}"
    >
      <StepperStep
        :pageTitle="getPagesInfoICO[0].pageTitle"
      >
        load your backup
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfoICO[1].pageTitle"
      >
        where to send
      </StepperStep>
      <StepperStep
        :pageTitle="getPagesInfoICO[2].pageTitle"
      >
        transaction hex
      </StepperStep>
    </Stepper>
  </div>
</template>

<script>
// components
import Stepper from './../general/Stepper';
import StepperStep from './../general/StepperStep';

// vuex state
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InheritanceOwner',
  components: {
    Stepper,
    StepperStep
  },
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getPagesInfoICO',
      'getPageSelectedICO'
    ])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePageICO'
    ]),
    stepperPageChangeRequested (inNumber) {
      this.changePageICO(inNumber);
    }
  }
};
</script>

<style scoped>
  .inheritance_owner {
    position: relative;
  }
</style>
