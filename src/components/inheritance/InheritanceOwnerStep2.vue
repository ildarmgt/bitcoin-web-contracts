<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        Which of contract's unspent funds to spend?
      </div>
      <div class="q__lbl1">
        Search the address <br>
        <RoundButton
          class="q__lblInternet"
          textContent="at blockstream.info"
          @click="getOutputs"
        />
        or
        <RoundButton
          class="q__lblInternet"
          textContent="fill out manually"
          @click="showFormNow"
        />
        ?
      </div>

      <div class="utxoList">
        <div
          class="q__lbl2"
          v-if="utxo.length"
        >
          Select confirmed outputs:<br><br>
          BTC locked and time it's unlocked for the heir
        </div>
        <div
          class="utxoItem"
          v-for="(output, i) in utxo"
          :key="i"
          @click="utxoClicked(i)"
        >
          <RoundButton
            class="q__plus"
            textContent="+"
            :isPushedIn="isSelected(i)"
          />
          <span
            class="q__utxoItem__lblTime"
          >
            {{ output.utxoValue + ' BTC ' }}
          </span>
          <span
            class="locked"
            :class="{ unlocked : output.ago.unlocked }"
          >
            {{ output.ago.dh }}
          </span>
        </div>
      </div>
      <!-- textbox -->
      <InheritanceOwnerStep2Form
        class="form"
        v-if="showForm"
        :showDetails="showDetails"
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
    vout: '',
    utxoValue: '',
    selected: -1,
    showForm: false,
    showDetails: false
  }),
  mounted () {
    // if page 2 utxo and vout filled out, show them at start
    const contract = this.getContractValues;
    if (contract.txid && contract.vout) {
      this.showForm = true;
    }
  },
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

    // show the form
    showFormNow () {
      this.showDetails = true;
    },

    // returns if specific utxo from api list was selected
    isSelected (i) {
      return this.selected === i;
    },

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
        // update local storage
        this.utxo = outputs.map((out, i) => {
          if (out.status.block_time) {
            const { daysLocked } = this.getContractValues;
            const ago = timeDiff(out.status.block_time * 1000, daysLocked);
            const value = (out.value / 1e8).toFixed(8);
            const info = {
              index: i,
              utxoValue: value,
              ago: ago,
              txid: out.txid,
              vout: out.vout.toString(),
              time: out.status.block_time
            };
            return info;
          }
        });
      } catch (e) {
        console.log('Error while trying api request from blockstream.info\n', e);
      }
    },

    // response to clicking utxo
    utxoClicked (i) {
      // show form
      this.showForm = true;

      // mark option selected
      this.selected = i;
      // (TODO)
      // put selected utxo (1 at first, multiple later) into local storage
      this.txid = this.utxo[i].txid;
      this.vout = this.utxo[i].vout;
      this.utxoValue = this.utxo[i].utxoValue;
      // put selected into vuex
      this.changeContractValues({
        txid: this.txid,
        vout: this.vout,
        utxoValue: this.utxoValue
      });
    }
  }
};
</script>

<style scoped>
  .q {
    text-align: center;
    margin: 0vmin 2vmin;
  }
  .q__strong {
    display: block;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
    text-align: left;
  }
  .q__lbl1 {
    margin-top: 6vmin;
    margin-bottom: 6vmin;
    text-align: center;
    color: white;
    font-size: 3vmin;
    line-height: 5vmin;
  }
  .q__lbl2 {
    /* margin-top: 6vmin; */
    margin-bottom: 3vmin;
    text-align: center;
    color: white;
    font-size: 2.5vmin;
    /* line-height: 5vmin; */
    margin-left: 10%;
    text-align: left;
  }
  .utxoItem {
    margin-left: 10%;
    text-align: left;
    color: white;
    font-size: 2.5vmin;
    line-height: 2.5vmin;
    cursor: pointer;
  }
  .utxoItem:hover {
    background-color: rgba(10,10,10,0.3);
  }
  .q__plus {
    padding: 0 0.5vmin;
  }
  .utxoList {
    margin-bottom: 3vmin;
  }
  .form {
    width: 85%;
    display: inline-block;
  }
  .locked {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 1.5vmin;
    padding: 0.2vmin;
    padding-left: 1vmin;
    padding-right: 1vmin;
    vertical-align: baseline;
  }
  .unlocked {
    background-color: rgb(122, 0, 0);
    background-color: rgba(122, 0, 0, 0.5);
  }
</style>
