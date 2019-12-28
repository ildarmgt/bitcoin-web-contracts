<template>
  <div>
    <div class="q fa">
      Page content
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceHeirStep3',
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getFile',
      'getContractValues',
      'getPagesInfo'
    ])
  },
  mounted () {},
  methods: {
    ...mapActions('inheritanceHeir', [
      'changePage',
      'changeFile'
    ])
  }
};
</script>

<style scoped>

</style>
