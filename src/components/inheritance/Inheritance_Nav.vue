<template>
  <div class="inheritance_nav">

    <Inheritance_Button
      @selectionChoice="onButtonSelect"
      :color="'orange'"
      :meaning="'create'"
      :buttonText="'Create this contract'"
      :meaningSelected="lastSelection"
    />

    <Inheritance_Button
      :color="'blue'"
      :meaning="'owner'"
      :buttonText="'Spend as Owner'"
      @selectionChoice="onButtonSelect"
      :meaningSelected="lastSelection"
    />

    <Inheritance_Button
      :color="'green'"
      :meaning="'heir'"
      :buttonText="'Spend as Heir'"
      @selectionChoice="onButtonSelect"
      :meaningSelected="lastSelection"
    />

    <Inheritance_Create v-if="showCreate" />
    <Inheritance_Owner v-if="showOwner" />
    <Inheritance_Heir v-if="showHeir" />

  </div>
</template>

<script>
  import Inheritance_Button from './Inheritance_Button';

  import Inheritance_Create from './Inheritance_Create';
  import Inheritance_Owner from './Inheritance_Owner';
  import Inheritance_Heir from './Inheritance_Heir';

  export default {
    name: 'Inheritance_Nav',
    components: {
      Inheritance_Button,
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
      }
    },
    computed: {
      showCreate () {
        return this.lastSelection == 'create'
      },
      showOwner () {
        return this.lastSelection == 'owner'
      },
      showHeir () {
        return this.lastSelection == 'heir'
      }
    }
  };
</script>

<style scoped>
  .inheritance_nav {
    margin: 2vmin;
  }
</style>
