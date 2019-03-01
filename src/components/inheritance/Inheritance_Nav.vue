<template>
  <div class="inheritance_nav">
    <div
      @click="onCreateSelect"
      class="button orange"
    >Create this contract</div>
    <div
      @click="onOwnerSpendSelect"
      class="button blue"
    >Spend as Owner</div>
    <div
      @click="onHeirSpendSelect"
      class="button green"
    >Spend as Heir</div>
  </div>
</template>

<script>
  export default {
    name: 'Inheritance_Nav',
    methods: {
      onCreateSelect () {
        this.$emit('selected', 'create')
      },
      onOwnerSpendSelect () {
        this.$emit('selected', 'owner')
      },
      onHeirSpendSelect () {
        this.$emit('selected', 'heir')
      }
    }
  };
</script>

<style scoped>
  .inheritance_nav {
    margin: 2vmin;
  }
</style>
