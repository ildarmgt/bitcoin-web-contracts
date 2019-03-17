<template>
  <div class="form">
    <textarea
      id="txid"
      rows="1"
      class="txidbox"
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
      class="voutbox"
      ref="voutbox"
      spellcheck="false"
      placeholder="vout"
      :value="vout"
      @input="voutChanged"
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
    txid: '',
    vout: ''
  }),
  props: {},
  computed: {
    ...mapGetters('inheritanceOwner', [])
  },
  mounted () {},
  methods: {
    ...mapActions('inheritanceOwner', []),
    // txid changed
    txidChanged (event) {
      const fixedString = sanitize(event.target.value, 'hex');
      event.target.value = fixedString;
      this[event.target.id] = fixedString;
    },
    // vout changed
    voutChanged (event) {
      const fixedString = sanitize(event.target.value, 'numbers');
      event.target.value = fixedString;
      this[event.target.id] = fixedString;
    },
    // load from vuex
    updateFromState () {}
  }
};

</script>

<style scoped>
  .form {
    color: white;
    font-size: 3vmin;
    text-align: center;
  }
  .txidbox {
    font-family: 'Montserrat';
    display: inline-block;
    resize: none;
    font-size: 2.3vmin;
    padding: 0.2vmin 1vmin;
    height: 3.6vmin;
    width: 75%;
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

  .voutbox {
    font-family: 'Montserrat';
    display: inline-block;
    resize: none;
    font-size: 2.3vmin;
    padding: 0.2vmin 1vmin;
    height: 3.6vmin;
    width: 5vmin;
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

  .txidbox::placeholder,
  .voutbox::placeholder {
    color: rgba(105, 102, 136, 0.555);
  }
</style>
