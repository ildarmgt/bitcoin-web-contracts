<template>
  <div class="inheritance_nav">
    <SelectionButton
      @selectionChoice="onButtonSelect"
      :color="'rgba(255, 165, 0, 0.8)'"
      :meaning="'create'"
      :buttonText="'Create contract'"
      :meaningSelected="lastSelection"
    />

    <SelectionButton
      :color="'rgba(0, 0, 160, 0.60)'"
      :meaning="'owner'"
      :buttonText="'Spend as Owner'"
      @selectionChoice="onButtonSelect"
      :meaningSelected="lastSelection"
    />

    <SelectionButton
      :color="'rgba(0, 100, 0, 0.65)'"
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
