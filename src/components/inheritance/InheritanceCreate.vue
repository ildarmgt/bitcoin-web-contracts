<template>
  <div class="inheritance_create">
    <Stepper :name="'Generate Contract'">
      <StepperStep :title="'Owner Key'">
        Step 1 content
      </StepperStep>
      <StepperStep :title="'Heir Key'">
        Step 2 content
      </StepperStep>
      <StepperStep :title="'Back up'">
        Step 3 content
      </StepperStep>
    </Stepper>

    <div class="inheritance_create_content">
      <div class="step">
        <div class="step_title">
          Step 1
        </div>
        <div class="step_info">
          Owner Private Key (WIF):
        </div>
      </div>

      <div class="button">
        Generate New
      </div>
      or
      <div class="button">
        Use Known
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from './../general/Stepper';
import StepperStep from './../general/StepperStep';

export default {
  name: 'InheritanceCreate',
  components: {
    Stepper,
    StepperStep
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
    display: inline-block;
    font-size: 4vmin;
    color: orange;
    margin-right: 3vmin;
    vertical-align: middle;
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
