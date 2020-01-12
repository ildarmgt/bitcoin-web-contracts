<template>
  <div>
    <div
      class="sum"
      v-show="( this.sumOfUTXO !== '' )"
    >
      Total selected: <span class="amt">{{ this.sumOfUTXO }}</span>
      {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
    </div>
    <Details
      :buttonText="'See details'"
      :showAtStart="showDetails"
      class="details"
    >
      <div class="form">
        <div class="form_buttons">
          <RoundButton
            textContent="+ funds"
            class="btnAddUTXO"
            @click="onClickAddUTXO"
          />
        </div>
        <div
          v-for="(value, name, index) in selectedUTXO"
          :key="index"
          class="form_element"
        >
          <div class="form_line1">
            <div class="label">
              Confirmed transaction id (txid) : vout
              <RoundButton
                textContent="×"
                class="btnRemoveUTXO"
                @click="onClickRemoveUTXO(name, value, $event)"
              />
            </div>
            <textarea
              id="txid"
              rows="1"
              class="textbox txidbox"
              :ref="index"
              spellcheck="false"
              placeholder="txid"
              :value="name.split('-')[0]"
              @input="txidChanged(name, value, $event)"
            />
            :
            <textarea
              id="vout"
              rows="1"
              class="textbox voutbox"
              :ref="index"
              spellcheck="false"
              placeholder="vout"
              :value="name.split('-')[1]"
              @input="voutChanged(name, value, $event)"
            />
          </div>
          <div class="form_line1">
            <div class="label">
              Selected output's value
              ({{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }})
            </div>
            <textarea
              id="utxovalue"
              rows="1"
              class="textbox utxovalue"
              :ref="index"
              spellcheck="false"
              placeholder="BTC value"
              :value="value"
              @input="utxoValueChanged(name, value, $event)"
            />
          </div>
        </div>
      </div>
    </Details>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import sanitize from './../../helpers/sanitize'; // string cleaner
import Details from './../general/Details'; // to hide details
import RoundButton from './../general/RoundButton';

export default {
  name: 'InheritanceHeirStep2Form',
  components: {
    Details,
    RoundButton
  },
  data: () => ({
    lastTimer: null,
    selectedUTXO: {},
    sumOfUTXO: ''
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
    ...mapActions('inheritanceHeir', [
      'changeContractValues'
    ]),

    // add new utxo form
    onClickAddUTXO (event) {
      this.selectedUTXO = { ...this.selectedUTXO, ['' + '-' + '']: '' };

      this.changeContractValues({ selectedUTXO: this.selectedUTXO });
    },

    // remove this utxo
    onClickRemoveUTXO (name, value, event) {
      delete this.selectedUTXO[name]; // deleted old key:value pair
      this.changeContractValues({ selectedUTXO: this.selectedUTXO });
    },

    // txid changed
    txidChanged (name, value, event) {
      // sanitize and display string, update vuex
      const fixedString = sanitize(event.target.value, 'hex');
      event.target.value = fixedString;

      // const oldTxid = name.split('-')[0]; // txid
      const oldVout = name.split('-')[1]; // vout
      const oldValue = value; // value
      const newTxid = event.target.value;
      delete this.selectedUTXO[name]; // deleted old key:value pair

      // replace with new txid
      this.selectedUTXO[newTxid + '-' + oldVout] = oldValue;
      // replace in vuex
      this.changeContractValues({ selectedUTXO: this.selectedUTXO });
    },

    // vout changed
    voutChanged (name, value, event) {
      // sanitize and display string, update vuex
      const fixedString = sanitize(event.target.value, 'numbers');
      event.target.value = fixedString;

      const oldTxid = name.split('-')[0]; // txid
      // const oldVout = name.split('-')[1]; // vout
      const oldValue = value; // value
      const newVout = event.target.value;
      delete this.selectedUTXO[name]; // deleted old key:value pair

      // replace with new vout
      this.selectedUTXO[oldTxid + '-' + newVout] = oldValue;
      // replace in vuex
      this.changeContractValues({ selectedUTXO: this.selectedUTXO });
    },

    // utxo value changed
    utxoValueChanged (name, value, event) {
      // sanitize and display string, update vuex
      let fixedString = sanitize(event.target.value, 'fractions');
      event.target.value = fixedString;

      // delayed so typing "." doesn't get removed instantly
      const DELAY_MS = 1000;
      clearTimeout(this.lastTimer);
      this.lastTimer = setTimeout(() => {
        // lastTimer
        fixedString = parseFloat(fixedString).toFixed(8);
        fixedString = isNaN(fixedString) ? (0).toFixed(8) : fixedString;
        event.target.value = fixedString;

        const newValue = event.target.value;
        // replace with new value
        this.selectedUTXO[name] = newValue;
        // replace in vuex
        this.changeContractValues({ selectedUTXO: this.selectedUTXO });
      }, DELAY_MS);
    },

    // update local data from vuex
    updateFromState (contract) {
      this.selectedUTXO = contract.selectedUTXO;
      this.sumOfUTXO = contract.sumOfUTXO;
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
  .form_element {
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
    padding: var(--s1);
    padding-top: var(--s1);
    margin: var(--s1);
    border-radius: var(--s1);
    font-size: var(--s2);
    position: relative;
  }
  .label {
    font-size: var(--s2);
    text-align: left;
    padding-top: var(--s1);
    margin-left: var(--s0-5);
  }
  .textbox {
    display: inline-block;
    color: var(--color-heir-solid, rgba(0, 134, 0));
    margin: var(--s1);
  }
  .txidbox {
    width: 70%;
  }
  .voutbox {
    width: var(--s5);
  }
  .utxovalue {
    width: 75%;
  }
  .amt {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    padding: var(--s0-1) var(--s1);
    border-radius: var(--s1);
  }
  .details {
    margin-top: var(--s2);
  }
  .form_buttons {
    text-align: right;
  }
  .btnAddUTXO {
    font-size: var(--s2-5);
    border: none;
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
  }
  .btnRemoveUTXO {
    padding: var(--s1-5);
    line-height: var(--s1-5);
    width: var(--s1);
    border-radius: var(--s3);
    font-size: var(--s3);
    margin: 0;
    width: var(--s1-5);
    border: none;
    right: var(--s0-5);
    top: var(--s0-5);
    position: absolute;
  }
  .btnRemoveUTXO:hover,
  .btnAddUTXO:hover {
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
    color: var(--color-info, rgb(173, 255, 47));
  }
</style>
