const state = {
  pages: [
    { title: 'Will Timer', ready: false },
    { title: 'Owner Key', ready: false },
    { title: 'Heir Key', ready: false },
    { title: 'Back up', ready: false }
  ]
};

const getters = {

};

const actions = {
  updatePageStatus ({ commit }, pageIndex, status) {
    // change state
    commit('setPageStatus', pageIndex, status);
  }
};

// setters
const mutations = {
  setPageStatus: (state, pageIndex, status) => {
    state[pageIndex].ready = status;
  }
};

export default { state, getters, actions, mutations };
