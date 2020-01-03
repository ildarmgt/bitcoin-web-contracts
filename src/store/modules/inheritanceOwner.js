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
    daysLocked: '',

    // outputs to spend
    txid: '',
    vout: '',
    utxoValue: '',
    sumOfUTXO: '', // for future use, derived
    spending: true, // use spending utxo or not
    change: true, // use change utxo to reset timer
    showForm: false, // show form if not first time

    // destination information
    toAddress: '',
    toAmount: '0',
    feeRate: '1', // (sat/vByte)
    changeAddress: '',
    feeAmount: '0', // derived
    changeAmount: '0', // derived
    vSize: 100, // derived

    // buffer of current tx
    tx: ''
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
  },
  setContractValues: (state, payload) => {
    state.contractValues = { ...state.contractValues, ...payload };
  },
  setIssues: (state, payload) => {
    state.issues = { ...state.issues, ...payload };
  }
};

// complicated action
const actions = {
  // changes contract values
  changeContractValues: ({ commit, dispatch, state }, payload) => {
    // re-add reset output unless the change is to remove it
    // payload.reset = (payload.reset === false) ? !true : true;
    // update contract values, the main purpose of this action
    commit('setContractValues', payload);
    // some derived values have to be updated as well:
    // do necessary derivations
    dispatch('deriveSpendingInfo');
    dispatch('deriveFromLastData');
    // test tx & rederive
    commit('setContractValues', { tx: ownerTx(state.contractValues) });
    dispatch('deriveFromLastData');
    // now real tx derivation
    commit('setContractValues', { tx: ownerTx(state.contractValues) });
    // update page status
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

    // tx building choices on which outputs to keep to save space and fees
    if (!contract.spending) {
      // remove remaining balance from toAmount
      // and put all instead into changeAmount (for fee estimat)
      commit('setContractValues', {
        toAmount: '0',
        change: true
      });
    }
  },

  deriveFromLastData ({ commit, state }) {
    const contract = state.contractValues;

    // make sure amounts are consistent
    // priority: inputs & fee > target > change
    const tx = contract.tx;
    const vSize = tx ? tx.virtualSize() : contract.vSize;
    let minFee = Math.floor(vSize * parseFloat(contract.feeRate));
    const inputs = Math.floor(1e8 * parseFloat(contract.sumOfUTXO));
    let target = Math.floor(1e8 * parseFloat(contract.toAmount));

    let remaining = Math.floor(inputs - minFee - target);
    if (remaining < 0 || !contract.change) {
      // take sats out of target's to cover missing sats.
      // similarly if coins aren't to be reset, add to target
      target = Math.floor(target + remaining);
      remaining = 0;
    }

    // update state
    commit('setContractValues', {
      vSize,
      feeAmount: (minFee * 1e-8).toFixed(8),
      toAmount: (target * 1e-8).toFixed(8),
      changeAmount: (remaining * 1e-8).toFixed(8)
    });
  },
  // update backup file data provided
  changeFile ({ commit }, payload) {
    commit('setFile', payload);
  },

  // look at contract values and update their type & if pages are valid & usable
  updateStatus ({ commit, state }) {
    const contract = state.contractValues;
    // page 1 checks

    // page 1: check network & validity of the private key WIF
    // returns if there's key issue & which network it is
    const keyNetwork = whatWIF(contract.ownerPrivateKeyWIF);
    commit('setIssues', {
      ownerPrivateKeyWIF: !keyNetwork,
      ownerPrivateKeyWIFInfo: keyNetwork
    });

    // page 1: check network & validity of the address
    const addressNetwork = whatAddress(contract.address);
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
    const address = contract.address;
    let addressType;
    if (address.substring(0, 1) === '3') { addressType = 'p2sh'; }
    if (address.substring(0, 1) === '2') { addressType = 'p2sh'; }
    if (address.substring(0, 2) === 'bc') { addressType = 'p2wsh'; }
    if (address.substring(0, 2) === 'tb') { addressType = 'p2wsh'; }
    commit('setContractValues', { addressType });

    // is relative locktime not blank?
    const isRelativeLockTime = !!contract.relativeLockTime;
    commit('setIssues', { relativeLockTime: !isRelativeLockTime });
    // is script hex not blank?
    const isScriptHex = !!contract.scriptHex;
    commit('setIssues', { scriptHex: !isScriptHex });

    // page 1: finalize page 1
    const isPage1Valid = (
      keyNetwork &&
      addressNetwork &&
      doNetworksMatch &&
      isRelativeLockTime &&
      isScriptHex
    );

    // page 2

    const isUtxoDone = !!contract.txid;
    const isVoutDone = !!contract.vout;
    const isUtxoValue = !!contract.utxoValue;

    const isPage2Valid = isUtxoDone && isVoutDone && isUtxoValue;

    // page 3
    const isToAddressDone = !!contract.toAddress;
    const isChangeAmountDone = !!contract.changeAmount;
    const isFeeRateDone = !!contract.feeRate;
    const isToAmountEnough = parseFloat(contract.toAmount) > 0;
    const isChangeAmountEnough = parseFloat(contract.changeAmount) > 0;
    const isFeeRateEnough = parseFloat(contract.feeRate) > 0;
    const isTxReady = !!contract.tx;

    const isPage3Valid = (
      (isToAddressDone || !contract.spending) &&
      (isChangeAmountDone || !contract.change) &&
      isFeeRateDone &&
      (isToAmountEnough || isChangeAmountEnough) &&
      isFeeRateEnough &&
      isTxReady
    );
    // console.log(
    //   (isToAddressDone || !contract.spending),
    //   (isChangeAmountDone || !contract.change),
    //   isFeeRateDone,
    //   (isToAmountEnough || isChangeAmountEnough),
    //   isFeeRateEnough,
    //   isTxReady
    // );

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
      valid: isPage3Valid,
      usable: isPage2Valid
    });
    commit('setPageStatus', {
      pageNumber: 4,
      valid: true,
      usable: isPage3Valid
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
