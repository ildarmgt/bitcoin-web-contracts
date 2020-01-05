<template>
  <div>
    <div
      class="sum"
      v-show="( this.utxoValue !== '' )"
    >
      Total selected: <span class="amt">{{ this.utxoValue }}</span>
      {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
    </div>
    <Details
      :buttonText="'See details'"
      :showAtStart="showDetails"
      class="details"
    >
      <div class="form">
        <div class="form_line1">
          <div class="label">
            Confirmed transaction id : unspent output number
          </div>
          <textarea
            id="txid"
            rows="1"
            class="textbox txidbox"
            ref="txidbox"
            spellcheck="false"
            placeholder="txid"
            :value="txid"
            @input="txidChanged"
          />
          :
          <textarea
            id="vout"
            rows="1"
            class="textbox voutbox"
            ref="voutbox"
            spellcheck="false"
            placeholder="vout"
            :value="vout"
            @input="voutChanged"
          />
        </div>
        <div class="form_line1">
          <div class="label">
            Selected output's value ({{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }})
          </div>
          <textarea
            id="utxovalue"
            rows="1"
            class="textbox utxovalue"
            ref="utxovalue"
            spellcheck="false"
            placeholder="BTC value"
            :value="utxoValue"
            @input="utxoValueChanged"
          />
        </div>
      </div>
    </Details>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import sanitize from './../../helpers/sanitize'; // string cleaner
import Details from './../general/Details'; // to hide details

export default {
  name: 'InheritanceHeirStep2Form',
  components: {
    Details
  },
  data: () => ({
    lastTimer: null,
    txid: '',
    vout: '',
    utxoValue: ''
  }),
  props: {
    showDetails: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getContractValues'
    ])
  },
  watch: {
    // if vuex contract values change, update this component
    getContractValues (contract) {
      // (TODO) replace with updateFromState
      this.updateFromState(contract);
      // this.txid = contract.txid;
      // this.vout = contract.vout;
      // this.utxoValue = contract.value;
    }
  },
  mounted () {
    // update txid & vout from vuex
    const contract = this.getContractValues;
    // (TODO) replace with updateFromState
    this.updateFromState(contract);

    // this.txid = contract.txid;
    // this.vout = contract.vout;
    // this.utxoValue = contract.value;
  },
  updated () {},
  methods: {
    ...mapActions('inheritanceHeir', [
      'changeContractValues'
    ]),

    // txid changed
    txidChanged (event) {
      // sanitize and display string, update vuex
      const fixedString = sanitize(event.target.value, 'hex');
      event.target.value = fixedString;
      this.txid = fixedString;
      this.changeContractValues({ txid: this.txid });
    },

    // vout changed
    voutChanged (event) {
      // sanitize and display string, update vuex
      const fixedString = sanitize(event.target.value, 'numbers');
      event.target.value = fixedString;
      this.vout = fixedString;
      this.changeContractValues({ vout: this.vout });
    },

    // utxo value changed
    utxoValueChanged (event) {
      // sanitize, display, and update vuex
      let fixedString = sanitize(event.target.value, 'fractions');
      event.target.value = fixedString;
      this.utxoValue = fixedString;

      // delayed so typing "." doesn't get removed instantly
      const DELAY_MS = 2000;
      clearTimeout(this.lastTimer);
      this.lastTimer = setTimeout(() => {
        // lastTimer
        fixedString = parseFloat(fixedString).toFixed(8);
        fixedString = isNaN(fixedString) ? (0).toFixed(8) : fixedString;
        event.target.value = fixedString;
        this.utxoValue = fixedString;
        this.changeContractValues({ utxoValue: this.utxoValue });
      }, DELAY_MS);
    },

    // update local data from vuex
    updateFromState (contract) {
      this.txid = contract.txid;
      this.vout = contract.vout;
      this.utxoValue = contract.utxoValue;
    }
  }
};

</script>

<style scoped>
  .sum {
    text-align: right;
    margin-top: 2vmin;
  }
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
  .textbox {
    font-family: 'Montserrat';
    display: inline-block;
    resize: none;
    font-size: 2.3vmin;
    padding: 0.2vmin 1vmin;
    height: 3.6vmin;
    text-align: center;
    background-color: white;
    color: rgb(0, 134, 0);
    border: 0.1vmin solid white;
    border-right: 0.3vmin solid white;
    border-left: 0.3vmin solid white;
    border-top: 0.5vmin solid white;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: default;
    vertical-align: middle;
  }
  .txidbox {
    width: 70%;
    margin-left: 5%;
  }
  .voutbox {
    width: 5vmin;
  }
  .utxovalue {
    margin-left: 5%;
    width: 75%;
  }
  .txidbox::placeholder,
  .voutbox::placeholder,
  .utxovalue::placeholder {
    color: rgba(105, 102, 136, 0.555);
  }
  .amt {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.1vmin 1vmin;
    border-radius: 1vmin;
  }
  .details {
    margin-top: 1vmin;
  }
</style>
