<template>
  <div>
    <div>
      My Decentralized Applications (dApps):
    </div>
    <div class="view">
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
