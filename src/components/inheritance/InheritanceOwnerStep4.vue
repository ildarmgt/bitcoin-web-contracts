<template>
  <div>
    content
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceOwnerStep4',
  components: {},
  data: () => ({}),
  mounted () {},
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getContractValues'
    ])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePage',
      'changeContractValues'
    ])
  }
};
</script>

<style scoped>

</style>
