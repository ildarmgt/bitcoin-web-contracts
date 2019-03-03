<template>
  <div class="inheritance_create">
    <Stepper stepperName="Generate Contract">
      <StepperStep title="Will Timer">
        <InheritanceCreateStep1 />
      </StepperStep>
      <StepperStep title="Owner Key">
        <InheritanceCreateStep2 />
      </StepperStep>
      <StepperStep title="Heir Key">
        Create the Heir's key
      </StepperStep>
      <StepperStep title="Back up">
        Back up the information
      </StepperStep>
    </Stepper>
  </div>
</template>

<script>
import Stepper from './../general/Stepper';
import StepperStep from './../general/StepperStep';

import InheritanceCreateStep1 from './InheritanceCreateStep1';
import InheritanceCreateStep2 from './InheritanceCreateStep2';

export default {
  name: 'InheritanceCreate',
  components: {
    Stepper,
    StepperStep,
    InheritanceCreateStep1,
    InheritanceCreateStep2
  },
  mounted () {
    // console.log(this);
  }
};
</script>

<style scoped>

</style>
