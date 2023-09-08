import { createStore } from 'vuex';
// import { fetchPetsByStatus } from "../requests.js";
import axios from "axios";

export default createStore({
    state: {
      pets: [],
      loading: false,
      error: {
        state: false,
        message: null
      }
    },
    getters: {
      pets: (state) => state.pets,
      loading: (state) => state.loading,
      error: (state) => state.error,
    },
    actions: {
      getPetsByStatus({commit}, status) {
        commit('SET_LOADING', true);
        axios
          .get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`)
          .then(response => response.data)
          .then(pets => {
            commit("SET_PETS", pets);
            commit('SET_LOADING', false)
          })
          .catch(error => {
            commit('SET_LOADING', false)
            commit('SET_ERROR', { state: true, message: error.message })
          })
      }
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
    }
})
