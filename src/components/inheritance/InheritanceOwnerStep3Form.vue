<template>
  <div>
    <div v-show="getContractValues.spending">
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
        Amount ( {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }} )
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
        textContent="Send All"
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
      <div v-if="!getContractValues.change">
        Timer reset output removed to send all
      </div>
      <div v-else-if="parseFloat(changeAmount) > parseFloat(getContractValues.feeAmount)">
        <span class="change">
          {{ this.changeAmount }}
          {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
        </span>
        left for timer reset.
      </div>
      <div v-else>
        Only
        <span class="change">
          {{ this.changeAmount }}
          {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
        </span>
        left for timer reset.
        <div class="suggestion">
          Use Send All to save on fees by not reseting any and send more.
        </div>
      </div>
      <Details
        class="details"
        :alignment="'middle'"
      >
        <div
          class="lblInfoBlob"
          v-if="tx"
        >
          Your future transaction information:<br>
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
        <div class="lblInfoBlob">
          The timer for relocked funds is reset via sending them back to this contract's address
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
  computed: {
    ...mapGetters('inheritanceOwner', [
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
  mounted () {
    this.updateFromState();
  },
  methods: {
    ...mapActions('inheritanceOwner', [
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
      this.toAmount = contract.toAmount;
      this.feeRate = contract.feeRate;
      this.changeAddress = contract.changeAddress;
      this.changeAmount = contract.changeAmount;
    },
    // max button clicked
    onMaxClick () {
      // TODO this needs to subtract fee but skipping for a moment
      this.toAmount = this.getContractValues.sumOfUTXO;

      this.changeContractValues({
        toAmount: this.toAmount,
        change: false
      });
    },
    // fee button clicked
    async onFeeClick () {
      const feeEstimates = await fees();
      this.feeRate = feeEstimates['2']; // 2 block estimate for now
      // (TODO) give option menu
      this.changeContractValues({
        feeRate: this.feeRate,
        change: true
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
    color: var(--background, white);
    font-size: var(--s3);
    text-align: left;
  }
  .label {
    font-size: var(--s2);
    text-align: left;
    margin-bottom: var(--s0-5);
    margin-top: var(--s2);
  }
  .lblReturn {
    font-size: var(--s2-5);
    text-align: center;
    margin-bottom: var(--s0-5);
    margin-top: var(--s2);
  }
  .textBox {
    display: inline-block;
    font-size: calc(2.3 * var(--s));
    padding: var(--s0-2) var(--s1);
    height: calc(3.6 * var(--s));
    width: 95%;
    color: var(--color-owner-solid, rgb(102, 102, 255));
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
    padding: var(--s1);
    border-radius: var(--s1);
    margin-bottom: var(--s1);
    margin-top: var(--s0-5);
  }
  .error {
    background: var(--color-error-strong, rgb(175, 27, 27));
  }
  .btnMax, .btnFee {
    vertical-align: middle;
    margin: 0;
  }
  .details {
    margin-top: var(--s2);
    transform: scale(0.9);
  }
  .change {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    padding: var(--s0-1) var(--s0-5);
    margin-right: var(--s0-5);
    border-radius: var(--s1);
  }
  .btnTestnet {
    display: block;
    width: calc(25 * var(--s));
    margin: 0;
    opacity: 0.65;
    border: none;
    background-color: var(--brighter1, rgba(255, 255, 255, 0.1));
    transform: scale(0.6);
    float: right;
    position: relative;
    top: calc(-0.5 * var(--s));
  }
  .btnTestnet:active {
    transform: scale(0.6);
  }
  .btnTestnet:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .lblInfoBlob {
    font-size: var(--s2);
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    border-radius: var(--s2);
    padding: var(--s2);
    margin-bottom: var(--s1);
    text-align: left;
  }
  table {
    border-collapse: collapse;
    text-align: right;
    user-select: text;
  }
  td:nth-child(even) {
    padding: var(--s1);
    color: var(--color-info, rgb(173, 255, 47));
    word-break: break-all;
    text-align: left;
    text-justify: distribute;
  }
  td:nth-child(odd) {
    white-space: nowrap;
  }
  .suggestion {
    margin-top: var(--s1);
    width: 70%;
    display: inline-block;
  }
</style>
