const state = {
  pages: [
    { pageTitle: 'Will Timer', ready: false },
    { pageTitle: 'Owner Key', ready: false },
    { pageTitle: 'Heir Key', ready: false },
    { pageTitle: 'Back up', ready: false }
  ],
  // 0 none, 1+ are pages
  pageSelected: 1
};

const getters = {
  getPageSelected: state => state.pageSelected
};

const actions = {
  // change a page's readiness status
  updatePageStatus ({ commit }, { pageIndex, status }) {
    commit('setPageStatus', { pageIndex, status });
  },
  // change pageSelected to given page
  changePage ({ commit }, newPage) {
    commit('setPage', newPage);
  }
};

// setters
const mutations = {
  // set each page title & status
  setPageStatus: (state, { pageIndex, status }) => {
    state.pages[pageIndex].ready = status;
  },
  // set value for pageSelected
  setPage: (state, newPage) => {
    const oldPage = state.pageSelected;
    const maxPage = state.pages.length + 1;
    // change first to 0 so change is detected by all the components
    state.pageSelected = 0;
    state.pageSelected = (newPage <= maxPage) ? newPage : oldPage;
  }
};

export default { state, getters, actions, mutations };
