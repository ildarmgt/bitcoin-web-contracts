<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        Which of contract's unspent funds to spend?
      </div>
      <div class="q__lbl1">
        Search the address (for confirmed utxo)<br>
        <RoundButton
          class="q__lblInternet"
          textContent="at blockstream.info"
          @click="getOutputs"
        />
        or fill out manually:
      </div>
      <div>
        <div
          class="utxoList"
          v-for="(output, i) in utxo"
          :key="i"
        >
          <RoundButton
            class="q__plus"
            textContent="+"
            @click="utxoClicked(i)"
          />
          {{ output.value + ' BTC, ' + output.ago.dh }}<br>
        </div>
      </div>
      <!-- textbox -->
      <InheritanceOwnerStep2Form
        :txid="txid"
        :vout="vout"
      />
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
import InheritanceOwnerStep2Form from './InheritanceOwnerStep2Form';

export default {
  name: 'InheritanceOwnerStep2',
  components: {
    ArrowButton,
    RoundButton,
    InheritanceOwnerStep2Form
  },
  data: () => ({
    utxo: [],
    txid: '',
    vout: ''
  }),
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
        this.utxo = outputs.map((out, i) => {
          if (out.status.block_time) {
            const ago = timeDiff(out.status.block_time * 1000);
            const value = (out.value / 1e8).toFixed(8);
            const info = {
              index: i,
              value: value,
              ago: ago,
              txid: out.txid,
              vout: out.vout,
              time: out.status.block_time
            };
            return info;
          }
        });
      } catch (e) {
        console.log('Error caught trying api request from blockstream.info\n', e);
      }
    },

    // response to clicking utxo
    utxoClicked (i) {
      console.log('utxo selected: ', this.utxo[i].txid, ':', this.utxo[i].vout);
      // (TODO)
      // put selected utxo (1 at first, multiple later) into local storage
      this.txid = this.utxo[i].txid;
      this.vout = this.utxo[i].vout;
      // put selected into vuex
      this.changeContractValues({
        txid: this.txid,
        vout: this.vout.toString()
      });
      // put selected into text boxes
      // 2) update component state from vuex on mount in manual fill view
      // 3) enable page 3 if at least one utxo+vout has been selected
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
  .utxoList {
    margin-left: 10%;
    text-align: left;
    color: white;
    font-size: 2.5vmin;
    line-height: 2.5vmin;
  }
  .q__plus {
    padding: 0 0.5vmin;

  }
</style>
