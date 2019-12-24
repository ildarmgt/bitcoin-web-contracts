<template>
  <div>
    <div class="txHex">
      {{ getContractValues.tx.toHex() }}
    </div>
    <RoundButton
      textContent="Broadcast via blockstream.info"
      textColor="white"
      @click="btnBroadcast"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import RoundButton from './../general/RoundButton';
import { blockstreamPush } from './../../api/broadcast';

export default {
  name: 'InheritanceOwnerStep4',
  components: {
    RoundButton
  },
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
    ]),
    btnDecode () {
      console.log('bam');
    },
    btnBroadcast () {
      console.log('bam');
      blockstreamPush(this.getContractValues.tx.toHex());
    }
  }
};
</script>

<style scoped>
  .txHex {
    width: 80%;
    white-space: pre-wrap; /* CSS3 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }
</style>
