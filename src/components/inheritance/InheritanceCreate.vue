<template>
  <div class="inheritance_create">
    <Stepper stepperName="Generate Contract">
      <StepperStep title="Will Timer">
        How long to lock for?
      </StepperStep>
      <StepperStep title="Owner Key">
        <InheritanceCreateStep1 />
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

export default {
  name: 'InheritanceCreate',
  components: {
    Stepper,
    StepperStep,
    InheritanceCreateStep1
  },
  mounted () {
    // console.log(this);
  }
};
</script>

<style scoped>
  .inheritance_create_content {
    width: 90%;
    display: inline-block;
  }

  .step {
    display: block;
    text-align: left;
    margin-top: 3vmin;
  }
  .step_title {

  }

  .step_info {
    display: inline-block;
    vertical-align: middle;
  }

  .orange {
    color: white;
    background-color: orange;
  }

</style>
