<template>
  <div>
    <div>
      My Decentralized Applications (dApps):
    </div>
    <div class="view">
      <DappList />
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
};
</script>

<style scoped>
  .view {
    margin-top: 3vmin;
    margin-bottom: 3vmin;
  }
</style>
