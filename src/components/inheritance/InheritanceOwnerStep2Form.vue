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
  name: 'InheritanceOwnerStep2Form',
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
    ...mapGetters('inheritanceOwner', [
      'getContractValues'
    ])
  },
  watch: {
    // if vuex contract values change, update this component
    getContractValues (contract) {
      this.updateFromState(contract);
    }
  },
  mounted () {
    // update txid & vout from vuex
    const contract = this.getContractValues;
    this.updateFromState(contract);
  },
  updated () {},
  methods: {
    ...mapActions('inheritanceOwner', [
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
    margin-top: var(--s2);
  }
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
  .textbox {
    display: inline-block;
    color: var(--color-owner-solid, rgb(102, 102, 255));
  }
  .txidbox {
    width: 70%;
    margin-left: 5%;
  }
  .voutbox {
    width: var(--s5);
  }
  .utxovalue {
    margin-left: 5%;
    width: 75%;
  }
  .amt {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    padding: var(--s0-1) var(--s1);
    border-radius: var(--s1);
  }
  .details {
    margin-top: var(--s1);
  }
</style>
