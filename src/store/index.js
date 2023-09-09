import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
      pets: [],
      loading: false,
      error: {
        state: false,
        message: null
      },
      success: false,
      newOrder: {},
      modal: {
        visibility: "hidden",
        title: "",
        data: {}
      },
      activeFilter: "available"
    },
    getters: {
      pets: (state) => state.pets,
      loading: (state) => state.loading,
      error: (state) => state.error,
      success: (state) => state.success,
      newOrder: (state) => state.newOrder,
      modal: (state) => state.modal,
      activeFilter: (state) => state.activeFilter,
    },
    actions: {
      getPetsByStatus({commit}, status) {
        commit("SET_LOADING", true);
        axios
          .get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`)
          .then(response => response.data)
          .then(pets => {
            commit("SET_PETS", pets);
            commit("SET_LOADING", false)
          })
          .catch(error => {
            commit("SET_LOADING", false)
            commit("SET_ERROR", { state: true, message: error.message })
          })
      },
      setNewOrder({ commit }, order) {
        commit("SET_NEW_ORDER", order);
      },
      clearNewOrder({ commit }) {
        commit("CLEAR_NEW_ORDER")
      },
      orderPet({commit, state}) {
        const order = state.newOrder;
        commit("SET_LOADING", true);
        commit("SET_SUCCESS", false);
        axios
          .post("https://petstore.swagger.io/v2/store/order", { order })
          .then(response => response.data)
          .then(() => {
            commit("ORDER_PET", order);
            commit("SET_LOADING", false);
            commit("SET_SUCCESS", true);
          })
          .catch(error => {
            commit("SET_LOADING", false);
            commit("SET_ERROR", { state: true, message: error.message });
          })
      },
    },
    mutations: {
      SET_PETS(state, pets) {
        state.pets = pets;
      },
      SET_LOADING(state, flag) {
        state.loading = flag
      },
      SET_ERROR(state, error) {
        state.error = error;
      },
      SET_SUCCESS(state, flag) {
        state.success = flag;
      },
      SET_NEW_ORDER(state, order) {
        state.newOrder = order;
      },
      CLEAR_NEW_ORDER(state) {
        state.newOrder = {};
      },
      ORDER_PET(state, orderObject) {
        console.log('state', state)
        console.log('orderObject', orderObject)
        //state.newOrder = {};
      },
      CLEAR_TOAST(state) {
        state.success = false;
        state.error = {
          state: false,
          message: null
        };
      },
      SET_MODAL_VISIBILITY(state, visibility) {
        state.modal.visibility = visibility;
      },
      SET_MODAL_TITLE(state, title) {
        switch (title) {
          case "buyPet":
            return state.modal.title = "Buy pet";
          default:
            return state.modal.title = "";
        }
      },
      SET_MODAL_PET(state, pet) {
        state.modal.data = pet;
      },
      SET_ACTIVE_FILTER(state, status) {
        state.activeFilter = status;
      }
    }
})
