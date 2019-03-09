<template>
  <div>
    <div class="label">
      Owner Private Key (WIF)
    </div>
    <textarea
      id="ownerPrivateKeyWIF"
      rows="1"
      class="textBox"
      ref="q__input1"
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
      ref="q__input2"
      spellcheck="false"
      :value="scriptHex"
      @input="textChanged"
    />
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import sanitize from './../../helpers/sanitize'; // string cleaner

export default {
  name: 'InheritanceOwnerForm',
  components: {},
  data: () => ({
    address: '',
    scriptHex: '',
    ownerPrivateKeyWIF: ''
  }),
  props: {},
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getFile',
      'getContractValues'
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

      // update vuex
      this.changeContractValues({
        ownerPrivateKeyWIF: this.ownerPrivateKeyWIF,
        address: this.address,
        scriptHex: this.scriptHex
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
      event.target.value = fixedString;
      this[event.target.id] = fixedString;

      // signal to parent change was done
      // so parent knows it's no longer the file settings
      this.$emit('input');

      // update vuex
      this.changeContractValues({
        ownerPrivateKeyWIF: this.ownerPrivateKeyWIF,
        address: this.address,
        scriptHex: this.scriptHex
      });
    }
  }
};

</script>

<style scoped>
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
  }
  .label {
    font-size: 2vmin;
    text-align: left;
    margin-bottom: 0.5vmin;
    margin-top: 2vmin;
  }
</style>
