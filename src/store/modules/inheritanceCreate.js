import { isWifValid, newWIF } from './../../bitcoin'; // bitcoin helper

// Inheritance Contract [Create] (IC)
const namespaced = true;
const state = {
  // page title - used for navigation
  // valid - whether content passes the validity checks
  // usable - whether can navigate to it
  pages: [
    { pageTitle: 'Will Timer', valid: false, usable: true },
    { pageTitle: 'Owner Key', valid: false, usable: true },
    { pageTitle: 'Heir Key', valid: false, usable: true },
    { pageTitle: 'Contract', valid: true, usable: false }
  ],
  // 0 none, 1+ are pages
  pageSelected: 1,
  contractValues: {
    daysDelay: '1',
    ownerPrivateKeyWIF: '',
    heirPrivateKeyWIF: '',
    networkChoice: '',
    addressType: ''
  }
};

const getters = {
  // returns pageSelected
  getPageSelectedIC: state => state.pageSelected,

  // return all contractValues
  getContractValuesIC: state => state.contractValues,

  // return all pages info
  getPagesInfoIC: state => state.pages,

  // returns daysDelay
  getDelayIC: state => state.contractValues.daysDelay
};

const actions = {
  // if contract not initialized, generate first keys
  initializeIC ({ commit, state, dispatch }) {
    if (!state.contractValues.ownerPrivateKeyWIF || !state.contractValues.heirPrivateKeyWIF) {
      const ownerPrivateKeyWIF = newWIF(state.contractValues.networkChoice);
      const heirPrivateKeyWIF = newWIF(state.contractValues.networkChoice);
      commit('setContractValues', { ownerPrivateKeyWIF, heirPrivateKeyWIF });
      // redo the ready/valid checks
      dispatch('updatePageStatusIC');
    }
  },
  // if keys are invalid for this network, it will update them
  updateKeysIfInvalid ({ commit, state, dispatch }) {
    const isOwnerKeyValid = isWifValid({
      wif: state.contractValues.ownerPrivateKeyWIF,
      networkChoice: state.contractValues.networkChoice
    });
    const isHeirKeyValid = isWifValid({
      wif: state.contractValues.heirPrivateKeyWIF,
      networkChoice: state.contractValues.networkChoice
    });
    if (!isOwnerKeyValid) {
      const ownerPrivateKeyWIF = newWIF(state.contractValues.networkChoice);
      commit('setContractValues', { ownerPrivateKeyWIF });
    }
    if (!isHeirKeyValid) {
      const heirPrivateKeyWIF = newWIF(state.contractValues.networkChoice);
      commit('setContractValues', { heirPrivateKeyWIF });
    }
    dispatch('updatePageStatusIC');
  },
  // look at contract values and update valid & usable for each page
  // change a page's readiness status
  updatePageStatusIC ({ commit, state }) {
    const { networkChoice } = state.contractValues;
    // check daysDelay
    const isDaysValid = state.contractValues.daysDelay <= 388;
    // check owner key
    const isOwnerKeyValid = isWifValid({
      wif: state.contractValues.ownerPrivateKeyWIF,
      networkChoice: networkChoice
    });
    // check heir key
    const isHeirKeyValid = isWifValid({
      wif: state.contractValues.heirPrivateKeyWIF,
      networkChoice: networkChoice
    });

    // update pages
    commit('setPageStatus', { pageNumber: 1, valid: isDaysValid, usable: true });
    commit('setPageStatus', { pageNumber: 2, valid: isOwnerKeyValid, usable: true });
    commit('setPageStatus', { pageNumber: 3, valid: isHeirKeyValid, usable: true });
    if (isDaysValid && isOwnerKeyValid && isHeirKeyValid) {
      commit('setPageStatus', { pageNumber: 4, valid: true, usable: true });
    } else {
      commit('setPageStatus', { pageNumber: 4, valid: false, usable: false });
    }
  },
  // change pageSelected to given page if next page is usable
  changePageIC ({ commit, state }, newPage) {
    const pageObject = state.pages[newPage - 1];
    if (pageObject) {
      if (pageObject.usable) {
        commit('setPage', newPage);
      }
    }
  },
  updateContractValuesIC: ({ commit, dispatch }, payload) => {
    // update contract values
    commit('setContractValues', payload);
    // redo the ready/valid checks
    dispatch('updatePageStatusIC');
  }
};

// setters
const mutations = {
  // set each page title & valid/usable status
  setPageStatus: (state, { pageNumber, valid, usable }) => {
    state.pages[pageNumber - 1].valid = valid;
    state.pages[pageNumber - 1].usable = usable;
  },
  // set value for pageSelected
  setPage: (state, newPage) => {
    // change first to 0 so change is detected by all the components
    state.pageSelected = 0;
    state.pageSelected = newPage;
    // const oldPage = state.pageSelected;
    // const maxPage = state.pages.length + 1;
    // state.pageSelected = 0;
    // state.pageSelected = (newPage <= maxPage) ? newPage : oldPage;
  },
  setContractValues: (state, payload) => {
    state.contractValues = { ...state.contractValues, ...payload };
  }
};

export default { namespaced, state, getters, actions, mutations };
