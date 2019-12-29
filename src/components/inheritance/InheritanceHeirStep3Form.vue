<template>
  <div>
    <div>
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
    <div class="divFormFooter">
      <Details
        class="details"
        :alignment="'middle'"
      >
        <div
          class="lblInfoBlob"
          v-if="tx"
        >
          Your transaction information:<br>
          <table>
            <tr>
              <td>fee:</td>
              <td>{{ Math.floor(parseFloat(getContractValues.feeAmount) * 1e8) }} sats</td>
            </tr>
            <tr>
              <td>txid:</td>
              <td>{{ tx ? tx.getId() : 'N/A' }}</td>
            </tr>
            <tr>
              <td>size:</td>
              <td>{{ tx ? tx.virtualSize() : 'N/A' }} vBytes</td>
            </tr>
            <tr>
              <td>outputs:</td>
              <td>
                <div
                  v-for="(item, name) in tx.outs"
                  :key="name"
                >
                  #{{ name }} is {{ item.value }} sats
                </div>
              </td>
            </tr>
            <tr>
              <td>inputs:</td>
              <td>
                <div
                  v-for="(item, name) in tx.ins"
                  :key="name"
                >
                  #{{ name }} is from
                  {{ calcTxid(item.hash) }} :
                  {{ item.index }}
                </div>
              </td>
            </tr>
            <tr>
              <td>redeemScript:</td>
              <td>
                {{ getContractValues.scriptHex }}
              </td>
            </tr>
          </table>
        </div>
        <div class="lblInfoBlob">
          [Check net] button fetches fee rate recommendations from blockstream.info and fills in the fee expected to allow confirmation within 2 blocks or ~20 min (always mainnet prices)
        </div>
        <div
          class="lblInfoBlob"
          v-if="getContractValues.networkChoice === 'testnet'"
        >
          If testnet is used, [testnet faucet] button can fill a faucet's address to help them out.
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
  name: 'InheritanceHeirStep3Form',
  components: {
    RoundButton,
    Details
  },
  data: () => ({
    lastTimer: {
      toAddress: null,
      feeRate: null
    },
    toAddress: '',
    feeRate: ''
  }),
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getContractValues'
    ]),
    tx () {
      return this.getContractValues.tx;
    }
  },
  watch: {
    // if vuex contract values change, update this component
    getContractValues (newValue, oldValue) {
      this.updateFromState();
    }
  },
  // first thing it does
  mounted () {
    this.updateFromState();
  },
  methods: {
    ...mapActions('inheritanceHeir', [
      'changeContractValues'
    ]),
    calcTxid (hash) {
      // this gives many errors if reversing source instead of copy
      return Buffer.from(hash).reverse().toString('hex');
    },
    // this grabs values from vuex and puts them into page variables
    updateFromState () {
      // read vuex state
      const contract = this.getContractValues;
      // update display variables
      this.toAddress = contract.toAddress;
      this.feeRate = contract.feeRate;
    },
    // fee button clicked
    async onFeeClick () {
      const feeEstimates = await fees();
      this.feeRate = feeEstimates['2']; // 2 block estimate for now
      this.changeContractValues({
        feeRate: this.feeRate
      });
    },
    // textbox contents changed
    textChanged (event) {
      // update page variables

      // do basic character enforcement instantly
      this[event.target.id] = event.target.value = sanitize(event.target.value, 'oneline');

      // put 3 second delay on correcting inputs, refresh delay if changed
      const DELAY_MS = 2000;
      clearTimeout(this.lastTimer[event.target.id]);
      this.lastTimer[event.target.id] = setTimeout(() => {
        // remove unwanted chars (depends on box)
        let fixedString;
        if (event.target.id === 'toAddress') {
          fixedString = sanitize(event.target.value, 'basic');
        }
        if (event.target.id === 'feeRate') {
          fixedString = sanitize(event.target.value, 'fractions');
        }

        event.target.value = fixedString;
        this[event.target.id] = fixedString;

        // update vuex
        this.changeContractValues({
          toAddress: this.toAddress,
          feeRate: this.feeRate,
          changeAddress: this.changeAddress,
          change: true
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
  .divFormFooter {
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
    color: rgb(0, 134, 0);
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
  .btnFee {
    vertical-align: middle;
    margin: 0;
  }
  .details {
    margin-top: 2vmin;
    transform: scale(0.9);
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
    position: relative;
    top: -0.5vmin;
  }
  .btnTestnet:active {
    transform: scale(0.6);
  }
  .btnTestnet:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .lblInfoBlob {
    font-size: 2vmin;
    background-color: rgba(0,0,0,0.1);
    border-radius: 2vmin;
    padding: 2vmin;
    margin-bottom: 1vmin;
    text-align: left;
  }
  table {
    border-collapse: collapse;
    /* border: red 1px solid; */
    text-align: right;
    user-select: text;
  }
  td:nth-child(even) {
    padding: 1vmin;
    color: greenyellow;
    word-break: break-all;
    text-align: left;
    text-justify: distribute;
  }
  td:nth-child(odd) {
    white-space: nowrap;
  }
  .suggestion {
    margin-top: 1vmin;
    width: 70%;
    display: inline-block;
  }
</style>
