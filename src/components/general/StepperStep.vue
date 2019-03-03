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
  methods: {
    isStepSelected () {
      // grab this step's title and current selection title
      const thisStepTitle = this.$attrs.pageTitle;
      const currentSelection = this.$parent.lastSelection;
      const isMatch = thisStepTitle === currentSelection;
      return isMatch;
    }
  }
};
</script>

<style scoped>

</style>
