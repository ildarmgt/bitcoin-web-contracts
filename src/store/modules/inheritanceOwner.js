import { whatWIF, whatAddress } from './../../bitcoin'; // bitcoin helper

// inheritanceOwner
const namespaced = true;
const state = {
  // page title - used for navigation
  // valid - whether content passes the validity checks
  // usable - whether can navigate to it
  pages: [
    { pageTitle: 'Input backup', valid: true, usable: true },
    { pageTitle: 'From where', valid: true, usable: false },
    { pageTitle: 'To where', valid: true, usable: false },
    { pageTitle: 'Transaction', valid: true, usable: false }
  ],
  file: undefined,
  // 0 none, 1+ are pages
  pageSelected: 1,
  contractValues: {
    ownerPrivateKeyWIF: '',
    networkChoice: '',
    addressType: '',
    address: '',
    scriptHex: '',
    txid: '',
    vout: '',
    value: ''
  },
  issues: {}
};

const getters = {
  // returns pageSelected
  getPageSelected: state => state.pageSelected,

  // returns latest file
  getFile: state => state.file,

  // return all contractValues
  getContractValues: state => state.contractValues,

  // return all pages info
  getPagesInfo: state => state.pages,

  // get issues
  getIssues: state => state.issues
};

const actions = {
  // change file
  changeFile ({ commit }, payload) {
    commit('setFile', payload);
  },

  // look at contract values and update their type & if pages are valid & usable
  updateStatus ({ commit, state }) {
    // page 1 checks

    // page 1: check network & validity of the private key WIF
    // returns if there's key issue & which network it is
    const keyNetwork = whatWIF(state.contractValues.ownerPrivateKeyWIF);
    commit('setIssues', {
      ownerPrivateKeyWIF: !keyNetwork,
      ownerPrivateKeyWIFInfo: keyNetwork
    });

    // page 1: check network & validity of the address
    const addressNetwork = whatAddress(state.contractValues.address);
    commit('setIssues', {
      address: !addressNetwork,
      addressInfo: addressNetwork
    });

    // page 1: check if networks are a match & defined
    const doNetworksMatch = (keyNetwork === addressNetwork);
    commit('setIssues', { addressNetwork: !doNetworksMatch });

    // page 1: update state if known from above
    commit('setContractValues', {
      networkChoice: (doNetworksMatch && keyNetwork) ? keyNetwork : ''
    });

    // page 1: should check if p2sh or p2wsh address
    // and then update state
    const address = state.contractValues.address;
    let addressType;
    if (address.substring(0, 1) === '3') { addressType = 'p2sh'; }
    if (address.substring(0, 1) === '2') { addressType = 'p2sh'; }
    if (address.substring(0, 2) === 'bc') { addressType = 'p2wsh'; }
    if (address.substring(0, 2) === 'tb') { addressType = 'p2wsh'; }
    commit('setContractValues', { addressType });

    // page 1: finalize page 1
    const isPage1Valid = keyNetwork && addressNetwork && doNetworksMatch;

    // page 2

    const isUtxoDone = !!state.contractValues.txid;
    const isVoutDone = !!state.contractValues.vout;

    const isPage2Valid = isUtxoDone && isVoutDone;

    // update pages
    commit('setPageStatus', {
      pageNumber: 1,
      valid: isPage1Valid,
      usable: true
    });
    commit('setPageStatus', {
      pageNumber: 2,
      valid: isPage2Valid,
      usable: isPage1Valid
    });
    commit('setPageStatus', {
      pageNumber: 3,
      valid: true,
      usable: isPage2Valid
    });
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

  // changes contract values
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
    state.issues = { ...state.issues, ...payload };
  }
};

export default { namespaced, state, getters, actions, mutations };
