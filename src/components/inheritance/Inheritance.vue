<template>
  <div class="inheritance">
    <InheritanceIntro />
    <InheritanceNav />
  </div>
</template>

<script>
import InheritanceIntro from './InheritanceIntro';
import InheritanceNav from './InheritanceNav';

export default {
  name: 'Inheritance',
  components: {
    InheritanceNav,
    InheritanceIntro
  }
};
</script>

<style scoped>
  .inheritance {
    width: 90%;
    display: inline-block;
  }
</style>
