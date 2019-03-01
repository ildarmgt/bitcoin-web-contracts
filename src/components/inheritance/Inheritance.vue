<template>
  <div class="inheritance">
    <Inheritance_Intro />
    <Inheritance_Nav />
  </div>
</template>

<script>
  import Inheritance_Nav from './Inheritance_Nav';
  import Inheritance_Intro from './Inheritance_Intro';

  export default {
    name: 'Inheritance',
    components: {
      Inheritance_Nav,
      Inheritance_Intro
    }
  };
</script>

<style>
  .inheritance {
    width: 90%;
    display: inline-block;
  }
</style>
