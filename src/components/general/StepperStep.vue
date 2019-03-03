<template>
  <div
    class="StepperStep"
    v-if="isStepSelected()"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'StepperStep',
  mounted () {
    // console.log(this.grabParent());
  },
  updated () {
    // console.log(this.grabParent());
  },
  methods: {
    isStepSelected () {
      // grab this step's title and current selection title
      const thisStepTitle = this.$attrs.title;
      const currentSelection = this.$parent.lastSelection;
      const isMatch = thisStepTitle === currentSelection;
      // console.log(
      //   'this steps title', this.$attrs.title, 'matches selection?', isMatch
      // );
      return isMatch;
    }
  }
};
</script>

<style scoped>

</style>
