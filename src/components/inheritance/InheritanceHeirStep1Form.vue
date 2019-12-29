<template>
  <div>
    <div class="info">
      <div
        v-if="getIssues.heirPrivateKeyWIF"
        class="notice error"
      >
        Need a valid private key (WIF)
      </div>
      <div
        v-if="getIssues.address"
        class="notice error"
      >
        Need a valid contract address
      </div>
      <div
        v-if="getIssues.doNetworksMatch"
        class="notice error"
      >
        Key and address are not of same network
      </div>
      <div
        v-if="getIssues.heirPrivateKeyWIFInfo"
        class="notice"
      >
        ✓ {{ getIssues.heirPrivateKeyWIFInfo }} key recognized
      </div>
      <div
        v-if="getIssues.addressInfo"
        class="notice"
      >
        ✓ {{ getIssues.addressInfo }} contract address recognized
      </div>
    </div>
    <Details
      class="inputFieldsWrapper"
      buttonText="Edit details"
      :showAtStart="showDetails"
    >
      <div class="label">
        Contract address
      </div>
      <textarea
        id="address"
        rows="1"
        class="textBox"
        ref="q__input3"
        spellcheck="false"
        :value="address"
        @input="textChanged"
      />
      <div class="label">
        Heir Private Key (WIF)
      </div>
      <textarea
        id="heirPrivateKeyWIF"
        rows="1"
        class="textBox"
        ref="q__input1"
        spellcheck="false"
        :value="heirPrivateKeyWIF"
        @input="textChanged"
      />
      <div class="label">
        Script (hex)
      </div>
      <textarea
        id="scriptHex"
        rows="1"
        class="textBox"
        ref="q__input2"
        spellcheck="false"
        :value="scriptHex"
        @input="textChanged"
      />
    </Details>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import sanitize from './../../helpers/sanitize'; // string cleaner
import Details from './../general/Details'; // my expanding component

export default {
  name: 'InheritanceHeirForm',
  components: {
    Details
  },
  data: () => ({
    address: '',
    scriptHex: '',
    heirPrivateKeyWIF: '',
    relativeLockTime: ''
  }),
  props: {
    showDetails: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getFile',
      'getContractValues',
      'getIssues'
    ])
  },
  mounted () {
    const file = this.getFile;
    if (file) {
      this.updateFromFile(file);
    } else {
      this.updateFromState();
    }
  },
  methods: {
    ...mapActions('inheritanceHeir', [
      'changeContractValues'
    ]),
    updateFromState () {
      const contract = this.getContractValues;
      this.address = contract.address;
      this.scriptHex = contract.scriptHex;
      this.heirPrivateKeyWIF = contract.heirPrivateKeyWIF;
    },
    // update contract data from file data if necessary
    updateFromFile (file) {
      const contract = JSON.parse(file.data);
      let errors = {};
      try {
        this.address = contract.address;
      } catch (e) { errors.address = true; }
      try {
        this.scriptHex = contract.redeemScriptHex || this.scriptHex;
      } catch (e) { errors.redeemScriptHex = true; }
      try {
        this.scriptHex = contract.witnessScriptHex || this.scriptHex;
      } catch (e) { errors.witnessScriptHex = true; }
      try {
        this.heirPrivateKeyWIF = contract.heirPrivateKeyWIF;
      } catch (e) { errors.heirPrivateKeyWIF = true; }
      try {
        this.daysLocked = contract.daysAfterConfirmForUnlock;
      } catch (e) { errors.daysLocked = true; }
      try {
        this.relativeLockTime = contract.relativeLockTime;
      } catch (e) { errors.relativeLockTime = true; }

      // update vuex
      this.changeContractValues({
        heirPrivateKeyWIF: this.heirPrivateKeyWIF,
        address: this.address,
        scriptHex: this.scriptHex,
        daysLocked: this.daysLocked,
        relativeLockTime: this.relativeLockTime
      });
    },
    // textbox contents changed
    textChanged (event) {
      // remove unwanted chars (depends on box)
      let fixedString;
      if (event.target.id === 'address') {
        fixedString = sanitize(event.target.value, 'basic');
      }
      if (event.target.id === 'heirPrivateKeyWIF') {
        fixedString = sanitize(event.target.value, 'base58');
      }
      if (event.target.id === 'scriptHex') {
        fixedString = sanitize(event.target.value, 'hex');
      }
      event.target.value = fixedString;
      this[event.target.id] = fixedString;

      // signal to parent change was done
      // so parent knows it's no longer the file settings
      this.$emit('input');

      // update vuex
      this.changeContractValues({
        heirPrivateKeyWIF: this.heirPrivateKeyWIF,
        address: this.address,
        scriptHex: this.scriptHex
      });
    }
  }
};

</script>

<style scoped>
  .info {
    margin-top: 6vmin;
    margin-bottom: 3vmin;
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
  }
  .label {
    font-size: 2vmin;
    text-align: left;
    margin-bottom: 0.5vmin;
    margin-top: 2vmin;
  }
  .notice {
    margin: 0 auto;
    text-align: left;
    width: 90%;
    padding: 1vmin;
    padding-left: 2vmin;
    border-radius: 1vmin;
    margin-bottom: 1vmin;
    margin-top: 0.5vmin;
  }
  .error {
    background: rgba(194, 0, 0, 0.5);
  }
</style>
