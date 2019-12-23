<template>
  <div>
    <div v-show="showSending">
      <div class="label">
        Send to
        <RoundButton
          v-if="getContractValues.networkChoice === 'testnet'"
          textContent="testnet faucet"
          @click="changeContractValues({ toAddress: '2NGZrVvZG92qGYqzTLjCAewvPZ7JE8S8VxE' })"
          class="btnTestnet"
        />
      </div>
      <textarea
        id="toAddress"
        placeholder="Bitcoin address"
        rows="1"
        class="textBox"
        ref="q__input1"
        spellcheck="false"
        :value="toAddress"
        @input="textChanged"
      />
      <div class="label">
        Amount ( BTC )
      </div>
      <textarea
        id="toAmount"
        placeholder="BTC to send"
        rows="1"
        class="textBox txtAmount"
        ref="q__input2"
        spellcheck="false"
        :value="toAmount"
        @input="textChanged"
      />
      <RoundButton
        textContent="Max"
        class="btnMax"
        @click="onMaxClick"
      />
    </div>
    <div class="label">
      Miner Fee ( sat / vByte )
    </div>
    <textarea
      id="feeRate"
      placeholder="Fee rate"
      rows="1"
      class="textBox txtFee"
      ref="q__input3"
      spellcheck="false"
      :value="feeRate"
      @input="textChanged"
    />
    <RoundButton
      textContent="Check Net"
      class="btnFee"
      @click="onFeeClick"
    />
    <div class="lblReturn">
      <div v-if="parseFloat(changeAmount) > 0">
        <span class="change">{{ this.changeAmount }} BTC</span> to be re-locked
      </div>
      <div v-else>
        No balance remaining for re-lock
      </div>
      <Details
        class="details"
        :alignment="'middle'"
      >
        <div class="lblInfoBlob">
          [Check net] button fetches fee rate recommendations from blockstream.info and fills in the fee expected to allow confirmation within 2 blocks or ~20 min
        </div>
        <div class="lblInfoBlob">
          The timer for any remaining funds
          is reset via sending them back
          to this contract's address
        </div>
      </Details>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
// import sanitize from './../../helpers/sanitize'; // string cleaner

import fees from '../../api/fees'; // fee estimate api
import sanitize from './../../helpers/sanitize'; // string cleaner

import RoundButton from './../general/RoundButton';
import Details from './../general/Details';

export default {
  name: 'InheritanceOwnerStep3Form',
  components: {
    RoundButton,
    Details
  },
  data: () => ({
    lastTimer: {
      toAddress: null,
      toAmount: null,
      feeRate: null
    },
    toAddress: '',
    toAmount: '',
    feeRate: '',
    changeAddress: '',
    changeAmount: ''
  }),
  props: {
    showSending: {
      type: Boolean,
      default: undefined
    }
  },
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getContractValues'
    ])
  },
  watch: {
    // if vuex contract values change, update this component
    getContractValues (newValue, oldValue) {
      console.log('contract changed');
      console.log('old:', JSON.stringify(oldValue));
      console.log('new:', JSON.stringify(newValue));
      this.updateFromState();
    },
    // if type of tx change, update calculations
    showSending (newValue, oldValue) {
      this.changeContractValues({
        spending: newValue
      });
      console.log('form detected change from', oldValue, 'to', newValue);
    }
  },
  mounted () {
    this.updateFromState();
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changeContractValues'
    ]),
    // this grabs values from vuex and puts them into page variables
    updateFromState () {
      // read vuex state
      const contract = this.getContractValues;
      // update display variables
      this.toAddress = contract.toAddress;
      this.toAmount = contract.toAmount;
      this.feeRate = contract.feeRate;
      this.changeAddress = contract.changeAddress;
      this.changeAmount = contract.changeAmount;
    },
    // max button clicked
    onMaxClick () {
      // TODO this needs to subtract fee but skipping for a moment
      this.toAmount = this.getContractValues.sumOfUTXO;
      this.changeContractValues({ toAmount: this.toAmount });
    },
    // fee button clicked
    async onFeeClick () {
      const feeEstimates = await fees();
      this.feeRate = feeEstimates['2']; // 2 block estimate for now
      this.changeContractValues({ feeRate: this.feeRate });
    },
    // textbox contents changed
    textChanged (event) {
      // update page variables
      this[event.target.id] = event.target.value = sanitize(event.target.value, 'oneline');

      // do basic character enforcement instantly

      // put 3 second delay on correcting inputs, refresh delay if changed
      const DELAY_MS = 2000;
      clearTimeout(this.lastTimer[event.target.id]);
      this.lastTimer[event.target.id] = setTimeout(() => {
        // remove unwanted chars (depends on box)
        let fixedString;
        if (event.target.id === 'toAddress') {
          fixedString = sanitize(event.target.value, 'basic');
        }
        if (event.target.id === 'toAmount') {
          fixedString = sanitize(event.target.value, 'fractions');
          fixedString = parseFloat(fixedString).toFixed(8);
          fixedString = isNaN(fixedString) ? (0).toFixed(8) : fixedString;
        }
        if (event.target.id === 'feeRate') {
          fixedString = sanitize(event.target.value, 'fractions');
        }

        event.target.value = fixedString;
        this[event.target.id] = fixedString;

        // update vuex
        this.changeContractValues({
          toAddress: this.toAddress,
          toAmount: this.toAmount,
          feeRate: this.feeRate,
          changeAddress: this.changeAddress
        });
      }, DELAY_MS);
    }
  }
};

</script>

<style scoped>
  .form {
    color: white;
    font-size: 3vmin;
    text-align: left;
  }
  .label {
    font-size: 2vmin;
    text-align: left;
    margin-bottom: 0.5vmin;
    margin-top: 2vmin;
  }
  .lblReturn {
    font-size: 2.5vmin;
    text-align: center;
    margin-bottom: 0.5vmin;
    margin-top: 2vmin;
  }
  .textBox {
    font-family: 'Montserrat';
    display: inline-block;
    resize: none;
    font-size: 2.3vmin;
    padding: 0.2vmin 1vmin;
    height: 3.6vmin;
    width: 95%;
    text-align: center;
    background-color: white;
    color: rgb(102, 102, 255);
    border: 0.1vmin solid white;
    border-right: 0.3vmin solid white;
    border-left: 0.3vmin solid white;
    border-top: 0.5vmin solid white;
    transition: background-color 0.15s;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: default;
    vertical-align: middle;
  }
  .txtAmount {
    width: 60%;
  }
  .txtFee {
    width: 60%;
  }
  .notice {
    margin: 0 auto;
    width: 90%;
    padding: 1vmin;
    border-radius: 1vmin;
    margin-bottom: 1vmin;
    margin-top: 0.5vmin;
  }
  .error {
    background: rgb(194, 0, 0);
  }
  .btnMax, .btnFee {
    vertical-align: middle;
    margin: 0;
  }
  .details {
    margin-top: 2vmin;
    transform: scale(0.9);
  }
  .change {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.1vmin 1vmin;
    border-radius: 1vmin;
  }
  .btnTestnet {
    display: block;
    width: 25vmin;
    margin: 0;
    opacity: 0.65;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(0.6);
    float: right;
  }
  .btnTestnet:active {
    transform: scale(0.6);
  }
  .btnTestnet:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .lblInfoBlob {
    background-color: rgba(0,0,0,0.1);
    border-radius: 2vmin;
    padding: 1vmin;
    margin-bottom: 1vmin;
  }
</style>
