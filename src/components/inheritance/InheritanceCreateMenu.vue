<template>
  <div
    class="m"
    @click="menuClicked"
    @mouseenter="menuClicked"
    @mouseleave="leftMenu"
  >
    ...
    <div
      v-if="showMenu"
      class="m__wrap"
    >
      <div class="m__wrap__list">
        <div>
          <span
            @click="clicked('p2wsh')"
            class="m__wrap__list__choice"
            :class="{ selected: this.addressType == 'p2wsh' }"
          >p2wsh</span>
          or
          <span
            class="m__wrap__list__choice"
            @click="clicked('p2sh')"
            :class="{ selected: this.addressType == 'p2sh' }"
          >p2sh (legacy)</span>
        </div>
        <div>
          <span
            @click="clicked('bitcoin')"
            class="m__wrap__list__choice"
            :class="{ selected: this.networkChoice == 'bitcoin' }"
          >mainnet</span>
          or
          <span
            @click="clicked('testnet')"
            class="m__wrap__list__choice"
            :class="{ selected: this.networkChoice == 'testnet' }"
          >testnet</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceCreateMenu',
  data: () => ({
    showMenu: false,
    addressType: '',
    networkChoice: ''
  }),
  computed: {
    ...mapGetters('inheritanceCreate', [
      'getContractValuesIC' // get contract value from vuex
    ])
  },
  methods: {
    ...mapActions('inheritanceCreate', [
      'updateContractValuesIC', // update contract values in vuex
      'changePageIC',
      'updateKeysIfInvalid'
    ]),
    menuClicked () {
      const contract = this.getContractValuesIC;
      this.addressType = contract.addressType;
      this.networkChoice = contract.networkChoice;
      this.showMenu = true;
    },
    leftMenu () {
      this.showMenu = false;
    },
    clicked (inOption) {
      switch (inOption) {
        case 'p2sh':
          this.addressType = 'p2sh';
          break;
        case 'p2wsh':
          this.addressType = 'p2wsh';
          break;
        case 'bitcoin':
          this.networkChoice = 'bitcoin';
          break;
        case 'testnet':
          this.networkChoice = 'testnet';
          break;
      }
      const payload = {
        networkChoice: this.networkChoice,
        addressType: this.addressType
      };
      // update vuex
      this.updateContractValuesIC(payload);
      // (ideally here update addresses to right network)
      this.updateKeysIfInvalid();
      // reset page
      this.changePageIC(1);
    }
  }
};
</script>

<style scoped>
  /* visually just a button */
  .m {
    height: 7vmin;
    width: 7vmin;
    line-height: 1vmin;
    font-size: 6vmin;
    color: white;
    position: absolute;
    right: 1vmin;
    top: 1vmin;
    cursor: pointer;
    z-index: 1000;
  }
  /* this just makes sure it overlaps w/ the button */
  .m__wrap {
    font-size: 3vmin;
    line-height: 7vmin;
    position: absolute;
    right: 0;
    top: 0;
  }
  /* offset menu with options */
  .m__wrap__list {
    background-color: rgba(17, 17, 51, 0.904);
    position: relative;
    color: black;
    margin: 1vmin 1vmin;
    padding-top: 0.1vmin;
    padding-bottom: 1vmin;

  }
  .m__wrap__list div {
    margin-top: 1vmin;
    margin-left: 1vmin;
    margin-right: 1vmin;
    white-space: nowrap;
    padding: 0.1vmin 1vmin;
    color: white;
  }
  .m__wrap__list__choice {
    padding: 0.2vmin 1vmin;
    padding-top: 0.1vmin;
    cursor: pointer;
  }
  .selected {
    background-color: rgba(255, 255, 255, 0.226);
    border-radius: 1vmin;
  }
</style>
