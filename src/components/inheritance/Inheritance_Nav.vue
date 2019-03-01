<template>
  <div class="inheritance_nav">

    <SelectionButton
      @selectionChoice="onButtonSelect"
      :color="'orange'"
      :meaning="'create'"
      :buttonText="'Create this contract'"
      :meaningSelected="lastSelection"
    />

    <SelectionButton
      :color="'blue'"
      :meaning="'owner'"
      :buttonText="'Spend as Owner'"
      @selectionChoice="onButtonSelect"
      :meaningSelected="lastSelection"
    />

    <SelectionButton
      :color="'green'"
      :meaning="'heir'"
      :buttonText="'Spend as Heir'"
      @selectionChoice="onButtonSelect"
      :meaningSelected="lastSelection"
    />

    <Inheritance_Create v-if="isSelected('create')" />
    <Inheritance_Owner v-if="isSelected('owner')" />
    <Inheritance_Heir v-if="isSelected('heir')" />

  </div>
</template>

<script>
  import SelectionButton from './../general/SelectionButton';

  import Inheritance_Create from './Inheritance_Create';
  import Inheritance_Owner from './Inheritance_Owner';
  import Inheritance_Heir from './Inheritance_Heir';

  export default {
    name: 'Inheritance_Nav',
    components: {
      SelectionButton,
      Inheritance_Create,
      Inheritance_Owner,
      Inheritance_Heir
    },
    data: () => ({
      lastSelection: ''
    }),
    methods: {
      onButtonSelect (value) {
        this.lastSelection = value;
      },
      isSelected (val) {
        return this.lastSelection == val;
      }
    }
  };
</script>

<style scoped>
  .inheritance_nav {
    margin: 2vmin;
  }
</style>
