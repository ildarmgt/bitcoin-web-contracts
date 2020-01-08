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
    height: calc(7 * var(--s));
    width: calc(9 * var(--s));
    line-height: var(--s2-5);
    font-size: var(--s2-5);
    color: var(--background, white);
    position: absolute;
    right: var(--s1);
    top: var(--s1);
    cursor: pointer;
    z-index: 1000;
  }
  /* this just makes sure it overlaps w/ the button */
  .m__wrap {
    font-size: var(--s3);
    line-height: calc(7 * var(--s));
    position: absolute;
    right: 0;
    top: calc(-1 * var(--s));
  }
  /* offset menu with options */
  .m__wrap__list {
    background-color: var(--bitcoin-blue, rgb(17, 17, 51));
    position: relative;
    color: var(--bitcoin-blue, rgb(17, 17, 51));
    margin: var(--s1) var(--s1);
    padding-top: var(--s1-5);
    padding-bottom: var(--s2-5);
  }
  .m__wrap__list div {
    margin-top: var(--s1);
    margin-left: var(--s1);
    margin-right: var(--s1);
    white-space: nowrap;
    padding: var(--s0-1) var(--s1);
    color: var(--background, white);
  }
  .m__wrap__list__choice {
    padding: var(--s0-3) var(--s1);
    padding-top: var(--s0-1);
    cursor: pointer;
  }
  .selected {
    background-color: var(--brighter2, rgba(255, 255, 255, 0.2));
    border-radius: var(--s1);
  }
  .btnMenu svg {
    fill: var(--background, white);
    height: var(--s4);
    width: var(--s4);
  }
</style>
