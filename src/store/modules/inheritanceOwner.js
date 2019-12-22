import { whatWIF, whatAddress, ownerTx } from './../../bitcoin'; // bitcoin helper

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

  // values important for contracts
  contractValues: {
    // parts of existing contract
    ownerPrivateKeyWIF: '',
    address: '',
    scriptHex: '',
    networkChoice: '',
    addressType: '',

    // outputs to spend
    txid: '',
    vout: '',
    utxoValue: '',
    sumOfUTXO: '', // for future use, derived

    // destination information
    toAddress: '',
    toAmount: (0).toFixed(8),
    feeRate: '1', // (sat/vByte)
    changeAddress: '',
    feeAmount: '0', // derived
    changeAmount: '0', // derived
    vSize: '' // derived
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

const actions = {
  // changes contract values
  changeContractValues: ({ commit, dispatch }, payload) => {
    // update contract values
    commit('setContractValues', payload);
    // do necessary derivations
    dispatch('deriveSpendingInfo');
    // redo the ready/valid checks
    dispatch('updateStatus');
  },

  // derive input tx paramters (bitcoin calculations)
  deriveSpendingInfo ({ commit, state }) {
    const contract = state.contractValues;

    // sum all input utxo values, just 1 utxo at first
    const sumOfUTXO = contract.utxoValue;
    commit('setContractValues', { sumOfUTXO });

    // change address should be this contracts address so money isn't lost
    const changeAddress = contract.address;
    commit('setContractValues', { changeAddress });

    // attempt to build tx
    const roughTx = ownerTx(contract);

    // make sure amounts are consistent
    // priority: inputs & fee > target > change
    const vSize = roughTx ? roughTx.virtualSize() : 0;
    const fee = Math.floor(vSize * parseFloat(contract.feeRate));
    const inputs = Math.floor(1e8 * parseFloat(sumOfUTXO));
    let target = Math.floor(1e8 * parseFloat(contract.toAmount));

    let remaining = inputs - fee - target;
    if (remaining < 0) {
      // take sats out of target's to cover missing sats
      target = target + remaining;
      remaining = 0;
      // if target's amount is less than 0,
      // can't take it out of fee or tx might get stuck
      // ideally should warn to add more inputs w/ possibly different sigs but maybe in later version
      // for now best to have the negative sending value as a warning that not enough funds
    }

    // update state
    commit('setContractValues', {
      sumOfUTXO,
      vSize,
      feeAmount: (fee * 1e-8).toFixed(8),
      toAmount: (target * 1e-8).toFixed(8),
      changeAmount: (remaining * 1e-8).toFixed(8)
    });

    // recalculate the transaction with new parameters if last one worked
    if (roughTx) {
      const tx = ownerTx(contract);
      console.log('tx size in vbytes =', roughTx.virtualSize());
      console.log('Broadcast this to transact (hex):', tx.toHex());
    }
  },

  // update backup file data provided
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
    const isUtxoValue = !!state.contractValues.utxoValue;

    const isPage2Valid = isUtxoDone && isVoutDone && isUtxoValue;

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
  }
};

export default { namespaced, state, getters, actions, mutations };
