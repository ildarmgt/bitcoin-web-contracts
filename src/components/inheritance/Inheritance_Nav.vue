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
    data () {
      return {
        lastSelected: null
      }
    },
    methods: {
      onCreateSelect () {
        this.lastSelected = 'create';
        this.$emit('selected', this.lastSelected);
      },
      onOwnerSpendSelect () {
        this.lastSelected = 'owner';
        this.$emit('selected', this.lastSelected)
      },
      onHeirSpendSelect () {
        this.lastSelected = 'heir';
        this.$emit('selected', this.lastSelected)
      }
    }
  };
</script>

<style scoped>
  .inheritance_nav {
    margin: 2vmin;
  }
</style>
