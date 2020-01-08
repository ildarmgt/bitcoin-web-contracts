<template>
  <div>
    <div class="info">
      <div
        v-if="getIssues.ownerPrivateKeyWIF"
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
        v-if="getIssues.relativeLockTime"
        class="notice error"
      >
        Relative lock time can't be blank
      </div>
      <div
        v-if="getIssues.scriptHex"
        class="notice error"
      >
        Script can't be blank
      </div>
      <div
        v-if="getIssues.ownerPrivateKeyWIFInfo"
        class="notice"
      >
        ✓ {{ getIssues.ownerPrivateKeyWIFInfo }} key recognized
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
        spellcheck="false"
        :value="address"
        @input="textChanged"
      />
      <div class="label">
        Owner Private Key (WIF)
      </div>
      <textarea
        id="ownerPrivateKeyWIF"
        rows="1"
        class="textBox"
        spellcheck="false"
        :value="ownerPrivateKeyWIF"
        @input="textChanged"
      />
      <div class="label">
        Script (hex)
      </div>
      <textarea
        id="scriptHex"
        rows="1"
        class="textBox"
        spellcheck="false"
        :value="scriptHex"
        @input="textChanged"
      />
      <div class="label">
        Relative lock time (dec) {{ tryToCalcDays() ? ' ~' + tryToCalcDays() + ' days' : '' }}
      </div>
      <textarea
        id="relativeLockTime"
        rows="1"
        class="textBox"
        spellcheck="false"
        :value="relativeLockTime"
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
  name: 'InheritanceOwnerForm',
  components: {
    Details
  },
  data: () => ({
    address: '',
    scriptHex: '',
    ownerPrivateKeyWIF: '',
    relativeLockTime: ''
  }),
  props: {
    showDetails: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters('inheritanceOwner', [
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
    ...mapActions('inheritanceOwner', [
      'changeContractValues'
    ]),
    updateFromState () {
      const contract = this.getContractValues;
      this.address = contract.address;
      this.scriptHex = contract.scriptHex;
      this.ownerPrivateKeyWIF = contract.ownerPrivateKeyWIF;
      this.relativeLockTime = contract.relativeLockTime;
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
        this.ownerPrivateKeyWIF = contract.ownerPrivateKeyWIF;
      } catch (e) { errors.ownerPrivateKeyWIF = true; }
      try {
        this.relativeLockTime = contract.relativeLockTime;
        this.daysLocked = this.tryToCalcDays();
      } catch (e) { errors.relativeLockTime = true; }

      // update vuex
      this.changeContractValues({
        ownerPrivateKeyWIF: this.ownerPrivateKeyWIF,
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
      if (event.target.id === 'ownerPrivateKeyWIF') {
        fixedString = sanitize(event.target.value, 'base58');
      }
      if (event.target.id === 'scriptHex') {
        fixedString = sanitize(event.target.value, 'hex');
      }
      if (event.target.id === 'relativeLockTime') {
        fixedString = sanitize(event.target.value, 'numbers');
      }
      event.target.value = fixedString;
      this[event.target.id] = fixedString;

      // signal to parent change was done
      // so parent knows it's no longer the file settings
      this.$emit('input');

      // update vuex
      this.changeContractValues({
        ownerPrivateKeyWIF: this.ownerPrivateKeyWIF,
        address: this.address,
        scriptHex: this.scriptHex,
        relativeLockTime: this.relativeLockTime,
        daysLocked: this.tryToCalcDays()
      });
    },
    tryToCalcDays () {
      try {
        // BIP 68 spec
        // converting from relative lock time to time via bit masks and shifts
        const days = ((this.relativeLockTime & 0x0000ffff) << 9) / 60 / 60 / 24;
        return days.toFixed(3);
      } catch (e) {}
    }
  }
};

</script>

<style scoped>
  .info {
    margin-top: calc(6 * var(--s));
    margin-bottom: var(--s3);
  }
  .textBox {
    display: inline-block;
    width: 95%;
    color: var(--color-owner-solid, rgb(102, 102, 255));
  }
  .label {
    font-size: var(--s2);
    text-align: left;
    margin-bottom: var(--s0-5);
    margin-top: var(--s2);
  }
  .notice {
    margin: 0 auto;
    text-align: left;
    width: 90%;
    padding: var(--s1);
    padding-left: var(--s2);
    border-radius: var(--s1);
    margin-bottom: var(--s1);
    margin-top: var(--s0-5);
  }
  .error {
    background: var(--color-error-strong, rgb(175, 27, 27));
  }
</style>
