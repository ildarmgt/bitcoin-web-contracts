<template>
  <div class="inheritance">
    <Inheritance_Intro />
    <Inheritance_Nav @selected="onSelect"/>
    <Inheritance_Create v-if="createSelected" />
    <Inheritance_Owner v-if="ownerSelected" />
    <Inheritance_Heir v-if="heirSelected" />
  </div>
</template>

<script>
  import Inheritance_Nav from './Inheritance_Nav';
  import Inheritance_Intro from './Inheritance_Intro';
  import Inheritance_Create from './Inheritance_Create';
  import Inheritance_Owner from './Inheritance_Owner';
  import Inheritance_Heir from './Inheritance_Heir';

  export default {
    name: 'Inheritance',
    components: {
      Inheritance_Nav,
      Inheritance_Intro,
      Inheritance_Create,
      Inheritance_Owner,
      Inheritance_Heir
    },
    data () {
      return {
        lastSelected: null
      }
    },
    methods: {
      onSelect (selectedChoice) {
        this.lastSelected = selectedChoice;
      }
    },
    computed: {
      createSelected () {
        return this.lastSelected == 'create';
      },
      ownerSelected () {
        return this.lastSelected == 'owner';
      },
      heirSelected () {
        return this.lastSelected == 'heir';
      }
    }
  };
</script>

<style>
  .inheritance {
    width: 90%;
    display: inline-block;
  }
</style>
