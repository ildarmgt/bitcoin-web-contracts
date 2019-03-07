<template>
  <div>
    <textarea
      rows="1"
      class="q__input"
      ref="q__input1"
      spellcheck="false"
      :value="'1'"
    />
    <textarea
      rows="1"
      class="q__input"
      ref="q__input2"
      spellcheck="false"
      :value="'2'"
    />
    <textarea
      rows="1"
      class="q__input"
      ref="q__input3"
      spellcheck="false"
      :value="'3'"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceOwnerForm',
  components: {},
  data: () => ({
    contractAddress: '',
    scriptHex: '',
    witnessScriptHex: '',
    ownerPrivateKeyWIF: ''
  }),
  props: {},
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getFile'
    ])
  },
  mounted () {
    this.updateFromFile();
  },
  methods: {
    ...mapActions([]),
    updateFromFile () {
      const file = this.getFile;
      if (file) {
        const contract = JSON.parse(file);
        let errors = {};
        try {
          this.contractAddress = contract.contractAddress;
        } catch (e) { errors.contractAddress = true; }
        try {
          this.scriptHex = contract.redeemScriptHex;
        } catch (e) { errors.redeemScriptHex = true; }
        try {
          this.scriptHex = contract.witnessScriptHex;
        } catch (e) { errors.witnessScriptHex = true; }
        try {
          this.ownerPrivateKeyWIF = contract.ownerPrivateKeyWIF;
        } catch (e) { errors.ownerPrivateKeyWIF = true; }
      }
    }
  }
};

</script>

<style scoped>
  .q__input {
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
</style>
