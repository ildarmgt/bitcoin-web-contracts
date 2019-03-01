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

    </div>

  </div>
</template>

<script>
  export default {
    name: 'Inheritance_Create'
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

  .inheritance__create__title {
    color: white;
    background-color: orange;
  }
</style>
