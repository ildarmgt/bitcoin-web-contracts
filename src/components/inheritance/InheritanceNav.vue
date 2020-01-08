<template>
  <div class="inheritance_nav">
    <SelectionButton
      @selectionChoice="onButtonSelect"
      :color="'var(--bitcoin-orange, orange)'"
      :meaning="'create'"
      :buttonText="'Create contract'"
      :meaningSelected="lastSelection"
    />

    <SelectionButton
      :color="'var(--color-owner-solid, rgb(102, 102, 255))'"
      :meaning="'owner'"
      :buttonText="'Spend as Owner'"
      @selectionChoice="onButtonSelect"
      :meaningSelected="lastSelection"
    />

    <SelectionButton
      :color="'var(--color-heir, rgba(0, 134, 0, 0.6))'"
      :meaning="'heir'"
      :buttonText="'Spend as Heir'"
      @selectionChoice="onButtonSelect"
      :meaningSelected="lastSelection"
    />

    <Expander>
      <InheritanceCreate v-if="isSelected('create')" />
      <InheritanceOwner v-if="isSelected('owner')" />
      <InheritanceHeir v-if="isSelected('heir')" />
    </Expander>
  </div>
</template>

<script>
import SelectionButton from './../general/SelectionButton';
import InheritanceCreate from './InheritanceCreate';
import InheritanceOwner from './InheritanceOwner';
import InheritanceHeir from './InheritanceHeir';
import Expander from './../general/Expander';

export default {
  name: 'InheritanceNav',
  components: {
    SelectionButton,
    InheritanceCreate,
    InheritanceOwner,
    InheritanceHeir,
    Expander
  },
  data: () => ({
    lastSelection: ''
  }),
  methods: {
    onButtonSelect (value) {
      this.lastSelection = value;
    },

    isSelected (val) {
      return this.lastSelection === val;
    },

    getHeight () {
      return this.$refs.inheritance_nav_view.clientHeight;
    }
  }
};
</script>

<style scoped>

</style>
