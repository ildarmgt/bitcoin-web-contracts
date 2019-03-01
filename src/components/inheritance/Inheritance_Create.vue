<template>
  <div class="inheritance_create">
    <h2 class="inheritance__create__title">
      Generate Contract
    </h2>

    <div class="inheritance_create_content">

      <div class="step">
        <div class="step_title">Step 1</div>
        <div class = "step_info">Owner Private Key (WIF):</div>
      </div>

      <div class="button">Generate New</div>
      or
      <div class="button">Use Known</div>



      <div class="step">
        <div class="step_title">Step 2</div>
        <div class = "step_info">Heir Private Key (WIF):</div>
      </div>

      <div class="button">Generate New</div>
      or
      <div class="button">Use Known</div>

      <div class="step">
        <div class="step_title">Step 3</div>
        <div class = "step_info">How long should the delay be before heir has access:</div>
      </div>

      <div class="button">1 Year</div>
      or
      <div class="button">1 Month</div>

      <div class="step">
        <div class="step_title">Step 4</div>
        <div class = "step_info">Back up this data or file. Losing this will forever lock you out.</div>
      </div>

      <div class="step">
        <div class="step_title">Step 5</div>
        <div class = "step_info">Fund this contract</div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'Inheritance_Create'
  }
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

  .inheritance__create__title {
    color: white;
    background-color: orange;
  }
</style>
