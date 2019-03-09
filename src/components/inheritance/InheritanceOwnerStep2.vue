<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        Which outputs are we spending?
      </div>
      <div class="q__lbl1">
        Search the address<br>
        <RoundButton
          class="q__lblInternet"
          textContent="online at blockstream.info "
          @click="getOutputs"
        />
        or
        <RoundButton
          class="q__lbl"
          textContent="fill out manually"
        />
      </div>
      <div>
        <div
          v-for="(output, i) in utxo"
          :key="i"
        >
          {{ output }}
        </div>
      </div>
      <!-- next button -->
      <ArrowButton
        textContent="Next"
        textColor="rgb(102, 102, 255)"
        @click="onNextButtonClick"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import timeDiff from './../../helpers/timeDiff';

import { mapActions, mapGetters } from 'vuex'; // state
import ArrowButton from './../general/ArrowButton';
import RoundButton from './../general/RoundButton';

export default {
  name: 'InheritanceOwnerStep2',
  components: {
    ArrowButton,
    RoundButton
  },
  data: () => ({
    utxo: []
  }),
  mounted () {},
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getContractValues'
    ])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePage'
    ]),
    // next button event
    onNextButtonClick () {
      // now change page to step 3
      this.changePage(3);
    },

    // get a list of outputs for the address in step 1
    async getOutputs () {
      const MAIN_PATH = 'https://blockstream.info/api/address/';
      const TEST_PATH = 'https://blockstream.info/testnet/api/address/';
      const { address, networkChoice } = this.getContractValues;

      try {
        if (!address) { throw new Error('no address'); }
        if (!networkChoice) { throw new Error('unknown network'); }

        const apiRoot = (networkChoice === 'bitcoin') ? MAIN_PATH : TEST_PATH;
        const apiPath = apiRoot + address + '/utxo';
        const res = await axios.get(apiPath);
        const outputs = res.data;
        this.utxo = outputs.map((eaOutput, i) => {
          if (eaOutput.status.block_time) {
            const ago = timeDiff(eaOutput.status.block_time * 1000);
            const value = (eaOutput.value / 1e8).toFixed(8);
            const info = `${i + 1}: BTC: ${value} ` + ago;
            return info;
          }
        });
      } catch (e) {
        console.log('Error caught trying api request from blockstream.info\n', e);
      }
    }
  }
};
</script>

<style scoped>
  .q {
    text-align: left;
    margin: 0vmin 2vmin;
  }
  .q__strong {
    display: block;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
  }
  .q__lbl1 {
    margin-left: 7%;
    margin-top: 6vmin;
    margin-bottom: 6vmin;
    text-align: left;
    color: white;
    font-size: 3vmin;
    line-height: 5vmin;
  }
</style>
