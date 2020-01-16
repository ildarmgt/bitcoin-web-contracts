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
          class="apiWaiting"
          v-if="apiWaiting"
        >
          API: Fetching...
        </div>
        <div
          class="apiFailed"
          v-if="apiFailed"
        >
          {{ apiFailed === 'API_BAD' ? 'API: Could not connect' : '' }}
          {{ apiFailed === 'API_NONE' ? 'API: No confirmed funds found' : '' }}
        </div>
        <div
          class="q__lbl2"
          v-if="utxo.length"
        >
          Select confirmed outputs:<br>
          <div class="q__lbl2___sidenote">
            Locked
            {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
            and when it's unlocked for you
          </div>
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
            {{ output.utxoValue }}
            {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
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
      <InheritanceHeirStep2Form
        class="form"
        v-if="showForm"
        :showDetails="showDetails"
      />
      <!-- next button -->
      <ArrowButton
        textContent="Next"
        textColor="var(--color-heir-solid, rgba(0, 134, 0))"
        @click="onNextButtonClick"
      />
    </div>
  </div>
</template>

<script>
import getUTXO from '../../api/utxo'; // api
import timeDiff from './../../helpers/timeDiff';

import { mapActions, mapGetters } from 'vuex'; // state

import ArrowButton from './../general/ArrowButton';
import RoundButton from './../general/RoundButton';
import InheritanceHeirStep2Form from './InheritanceHeirStep2Form';

export default {
  name: 'InheritanceHeirStep2',
  components: {
    ArrowButton,
    RoundButton,
    InheritanceHeirStep2Form
  },
  data: () => ({
    utxo: [], // all found utxo from API
    selectedUTXO: {}, // array of selected utxo
    showForm: false, // show selected utxo totals + details option
    showDetails: false, // show each individual utxo details
    apiWaiting: false, // show loading screen
    apiFailed: undefined // 'API_BAD' - api error, 'API_NONE' - no confirmed utxo
  }),
  mounted () {
    // if page 2 utxo and vout filled out, show them at start
    const contract = this.getContractValues;
    this.selectedUTXO = contract.selectedUTXO;
    if (Object.keys(contract.selectedUTXO).length) {
      this.showForm = true;
    }
  },
  watch: {
    // if vuex contract values change, update this component
    getContractValues (contract) {
      this.selectedUTXO = contract.selectedUTXO;
    }
  },
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getContractValues'
    ])
  },
  methods: {
    ...mapActions('inheritanceHeir', [
      'changePage',
      'changeContractValues'
    ]),

    // show the form
    showFormNow () {
      this.showDetails = !this.showDetails;
      this.showForm = true;
    },

    // returns if specific utxo from api list was selected
    isSelected (i) {
      const txid = this.utxo[i].txid;
      const vout = this.utxo[i].vout;
      const isMatch = !!this.selectedUTXO[txid + '-' + vout];
      return isMatch;
    },

    // next button event
    onNextButtonClick () {
      // now change page to step 3
      this.changePage(3);
    },

    // get a list of outputs for the address in step 1
    async getOutputs () {
      const { address, networkChoice } = this.getContractValues;

      this.apiWaiting = true; // show loading animation
      this.apiFailed = false; // hide past failure notice
      try {
        if (!address) { throw new Error('no address'); }
        if (!networkChoice) { throw new Error('unknown network'); }

        const outputs = await getUTXO(address, networkChoice);
        // update local storage
        // for now just removing unconfirmed tx
        this.utxo = outputs.reduce((acc, out, i) => {
          if (out.status.block_time) {
            const { daysLocked } = this.getContractValues;
            const ago = timeDiff(out.status.block_time * 1000, daysLocked);
            const value = (out.value / 1e8).toFixed(8);
            const info = {
              utxoValue: value,
              ago: ago,
              txid: out.txid,
              vout: out.vout.toString(),
              time: out.status.block_time
            };
            return [...acc, info];
          } else {
            return acc;
          }
        }, []);
        // if empty array, say nothing found
        this.apiFailed = !this.utxo.length ? 'API_NONE' : undefined;
        this.apiWaiting = false; // remove loading animation
      } catch (e) {
        // if api error, show trouble connecting
        this.apiFailed = 'API_BAD';
        this.apiWaiting = false; // remove loading animation
        console.log('Error while trying api request from blockstream.info\n', e);
      }
    },

    // response to clicking utxo
    utxoClicked (i) {
      // show form
      this.showForm = true;

      // grab important data from the api
      const txid = this.utxo[i].txid;
      const vout = this.utxo[i].vout;
      const value = this.utxo[i].utxoValue;

      // select if unselected, unselect if selected
      const isOldSelection = !!this.selectedUTXO[txid + '-' + vout];
      if (isOldSelection) {
        // already exists so remove
        delete this.selectedUTXO[txid + '-' + vout];
      } else {
        // add since not selected yet
        this.selectedUTXO = {
          ...this.selectedUTXO,
          [txid + '-' + vout]: value
        };
      }

      // put selected into vuex
      this.changeContractValues({
        selectedUTXO: this.selectedUTXO
      });
    }
  }
};
</script>

<style scoped>
  .q {
    text-align: center;
    margin: 0 var(--s2);
  }
  .q__strong {
    display: block;
    font-size: var(--s3);
    color: var(--background, white);
    margin-right: var(--s3);
    margin-left: 5%;
    font-weight: bold;
    text-align: left;
  }
  .q__lbl1 {
    margin-top: calc(6.0 * var(--s));
    margin-bottom: calc(4.0 * var(--s));
    text-align: center;
    color: var(--background, white);
    font-size: var(--s3);
    line-height: var(--s5);
  }
  .q__lbl2 {
    margin-bottom: var(--s3);
    text-align: center;
    color: var(--background, white);
    font-size: var(--s2-5);
    margin-left: 10%;
    text-align: left;
  }
  .utxoItem {
    margin-left: 10%;
    text-align: left;
    color: var(--background, white);
    font-size: var(--s2-5);
    line-height: var(--s2-5);
    cursor: pointer;
  }
  .q__plus {
    padding: 0 var(--s0-5);
  }
  .utxoList {
    margin-bottom: var(--s3);
  }
  .form {
    width: 85%;
    display: inline-block;
  }
  .locked {
    background-color: var(--color-error-light, rgba(141, 70, 70, 0.5));

    border-radius: var(--s1-5);
    padding: var(--s0-2);
    padding-left: var(--s1);
    padding-right: var(--s1);
    vertical-align: baseline;
    white-space: nowrap;
  }
  .unlocked {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
  }
  .q__lbl2___sidenote {
    margin-left: var(--s5);
    margin-top: var(--s3);
  }
  .utxoItem:hover {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
  }
  .apiWaiting {
    display: inline-block;
    margin: var(--s1) var(--s1);
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    border-radius: var(--s0-5);
    padding: var(--s0-5) var(--s2);
    margin-bottom: var(--s4);
    color: var(--background, white);
  }
  .apiFailed {
    display: inline-block;
    margin: var(--s1) var(--s1);
    background-color: var(--color-error-light, rgba(141, 70, 70, 0.5));
    border-radius: var(--s0-5);
    padding: var(--s0-5) var(--s2);
    margin-bottom: var(--s4);
    color: var(--background, white);
  }
</style>
