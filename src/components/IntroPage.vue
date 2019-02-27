<template>
  <div>
    intropage.vue
    <div>
      Bitcoin Smart Contracts
    </div>
    <div>
      Demonstration Decentralized Applications (dApps)
      <DappList></DappList>
    </div>
    (Do not use)
  </div>
</template>

<script>
  import DappList from './DappList';

  export default {
    name: 'IntroPage',
    components: {
      DappList
    }
  }
</script>

<style>

</style>
