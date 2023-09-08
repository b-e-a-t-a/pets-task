import { createStore } from 'vuex';
// import { fetchPetsByStatus } from "../requests.js";
import axios from "axios";

export default createStore({
    state: {
      pets: []
    },
    getters: {
      pets: (state) => state.pets
    },
    actions: {
      getPetsByStatus({commit}, status) {
        axios
          .get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`)
          .then(response => response.data)
          .then(pets => {
            commit("SET_PETS", pets);
            // state.value = "loaded";
          })
          .catch(error => {
            alert(error);
            // state.value = error;
            console.log("error", error);
          })
      }
    },
    mutations: {
      SET_PETS(state, pets) {
        state.pets = pets;
      },
    }
})
