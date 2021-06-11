export const modal = {
  namespaced: true,
  state: {
    modals: []
  },
  getters: {
    modalIsOpen: state => (state.modals.length >= 1),
    modalList: state => state.modals
  },
  mutations: {
    SET_MODAL(state, modal) {
      state.modals.push(modal);
    },
    CLOSE_MODAL(state) {
      state.modals.pop();
    }
  },
  actions: {
    setModal({commit, getters}, modal) {
      commit("SET_MODAL", modal);
      if (getters["modalIsOpen"]) {
        document.body.style.overflow = "hidden";
      }
    },
    closeModal({commit, getters}) {
      commit("CLOSE_MODAL");
      if (!getters["modalIsOpen"]) {
        document.body.style.overflow = "";
      }
    }
  },
}
