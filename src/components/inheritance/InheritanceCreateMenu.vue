<template>
  <div
    class="m"
    @click="menuClicked"
    @mouseenter="menuClicked"
    @mouseleave="leftMenu"
  >
    <div class="btnMenu">
      <!-- svg from https://iconmonstr.com -->
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M19 18c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-14-3c-1.654 0-3 1.346-3 3s1.346 3 3 3h14c1.654 0 3-1.346 3-3s-1.346-3-3-3h-14zm19 3c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm0-12c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm-15 0c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z" />
      </svg>
    </div>
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
    width: 9vmin;
    line-height: 2.5vmin;
    font-size: 2.5vmin;
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
    top: -1vmin;
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
  .btnMenu svg {
    fill: white;
    fill: rgba(255, 255, 255, 0.5);
    height: 4vmin;
    width: 4vmin;
  }
</style>
