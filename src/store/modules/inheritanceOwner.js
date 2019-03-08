import { whatWIF, whatAddress } from './../../bitcoin'; // bitcoin helper

// inheritanceOwner
const namespaced = true;
const state = {
  // page title - used for navigation
  // valid - whether content passes the validity checks
  // usable - whether can navigate to it
  pages: [
    { pageTitle: 'Input backup', valid: true, usable: true },
    { pageTitle: 'Destination', valid: true, usable: false },
    { pageTitle: 'Transact', valid: true, usable: false }
  ],
  file: '',
  // 0 none, 1+ are pages
  pageSelected: 1,
  contractValues: {
    ownerKey: '',
    networkChoice: '',
    addressType: '',
    contractAddress: '',
    scriptHex: ''
  },
  issues: []
};

const getters = {
  // returns pageSelected
  getPageSelected: state => state.pageSelected,

  // returns latest file
  getFile: state => state.file,
  // return all contractValues
  // getContractValuesIC: state => state.contractValues,

  // return all pages info
  getPagesInfo: state => state.pages

  // returns daysDelay
  // getDelayIC: state => state.contractValues.daysDelay
};

const actions = {
  // change file
  changeFile ({ commit }, payload) {
    commit('setFile', payload);
  },
  // if contract not initialized, generate first keys
  // initializeIC ({ commit, state, dispatch }) {
  //   if (!state.contractValues.ownerKey || !state.contractValues.heirKey) {
  //     const ownerKey = newWIF(state.contractValues.networkChoice);
  //     const heirKey = newWIF(state.contractValues.networkChoice);
  //     commit('setContractValues', { ownerKey, heirKey });
  //     // redo the ready/valid checks
  //     dispatch('updatePageStatusIC');
  //   }
  // },
  // if keys are invalid for this network, it will update them
  // updateKeysIfInvalid ({ commit, state, dispatch }) {
  //   const isOwnerKeyValid = isWifValid({
  //     wif: state.contractValues.ownerKey,
  //     networkChoice: state.contractValues.networkChoice
  //   });
  //   const isHeirKeyValid = isWifValid({
  //     wif: state.contractValues.heirKey,
  //     networkChoice: state.contractValues.networkChoice
  //   });
  //   if (!isOwnerKeyValid) {
  //     const ownerKey = newWIF(state.contractValues.networkChoice);
  //     commit('setContractValues', { ownerKey });
  //   }
  //   if (!isHeirKeyValid) {
  //     const heirKey = newWIF(state.contractValues.networkChoice);
  //     commit('setContractValues', { heirKey });
  //   }
  //   dispatch('updatePageStatusIC');
  // },

  // look at contract values and update their type & if pages are valid & usable
  updateStatus ({ commit, state }) {
    // reset issues
    let issues = {};
    // check network & validity of the private key WIF
    const keyNetwork = whatWIF(state.contractValues.ownerKey);
    if (!keyNetwork) { issues.ownerKey = true; }
    // check network & validity of the address
    const addressNetwork = whatAddress(state.contractValues.contractAddress);
    if (!addressNetwork) { issues.address = true; }
    // check if networks are a match & defined
    const areNetworksValid = (keyNetwork === addressNetwork);
    if (!areNetworksValid) { issues.networkMatch = true; }
    // update state
    commit('setContractValues', {
      networkChoice: (areNetworksValid && keyNetwork) ? keyNetwork : ''
    });

    // should check if p2sh or p2wsh address
    // and then update state
    const address = state.contractValues.contractAddress;
    let addressType;
    if (address.substring(0, 1) === '3') { addressType = 'p2sh'; }
    if (address.substring(0, 1) === '2') { addressType = 'p2sh'; }
    if (address.substring(0, 2) === 'bc') { addressType = 'p2wsh'; }
    if (address.substring(0, 2) === 'tb') { addressType = 'p2wsh'; }
    commit('setContractValues', { addressType });

    // check page 1
    const isPage1Valid = areNetworksValid && keyNetwork && addressNetwork;

    // update pages
    commit('setPageStatus', { pageNumber: 1, valid: isPage1Valid, usable: true });
    commit('setPageStatus', { pageNumber: 2, valid: true, usable: isPage1Valid });

    // update issues
    commit('setIssues', issues);
  },
  // change pageSelected to given page if next page is usable
  changePage ({ commit, state }, newPage) {
    const pageObject = state.pages[newPage - 1];
    if (pageObject) {
      if (pageObject.usable) {
        commit('setPage', newPage);
      }
    }
  },
  changeContractValues: ({ commit, dispatch }, payload) => {
    // update contract values
    commit('setContractValues', payload);
    // redo the ready/valid checks
    dispatch('updateStatus');
  }
};

// setters
const mutations = {
  // set file contents as a string
  setFile: (state, payload) => {
    state.file = payload;
  },
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
  },
  setIssues: (state, payload) => {
    state.issues = payload;
  }
};

export default { namespaced, state, getters, actions, mutations };
