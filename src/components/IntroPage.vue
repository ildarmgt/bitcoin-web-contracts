<template>
  <div>
    <div>
      Bitcoin Decentralized Applications (dApps)
    </div>
    <div>
      <DappList></DappList>
    </div>
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
