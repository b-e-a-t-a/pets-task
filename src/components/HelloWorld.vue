<template>
  <section class="filters-wrapper">
    <p v-for="(filter, index) in filters" :key="index">
      <span
        @click="filterPets(filter)"
         :class="{ active: filter === activeFilter }"
      >{{ filter }}</span>
    </p>
  </section>

  <section v-if="pets">
    <ul class="pets-list">
      <li
        v-for="(pet, index) in pets"
        :key="index"
      >
        <article class="pet-item">
          <p v-if="pet.photoUrls">
            <img
              :src="pet.photuUrls"
              alt="pet photo"
              width="50"
              height="50"
            >
          </p>
          <p v-else>No photo available</p>
          <p>Id: {{ pet.id }}</p>
          <p>Name: {{ pet.name }}</p>
          <p>Category: {{ pet.category && pet.category.name}}</p>
          <p>Status: {{ pet.status }}</p>
        </article>
        <div v-if="pet.status === 'available'" class="pet-button">
          <button class="btn-basic btn-wide btn-primary" @click="openModal('buyPet', pet)">buy</button>
        </div>
      </li>
    </ul>

    <Teleport to="body">
      <base-modal v-if="modalState === 'visible'" @close-modal="closeModal">
        <template v-slot:header>
          <h2>{{ modalTitle }}</h2>
        </template>
        <template v-slot:body>
          <purchase-form
            :pet-values="selectedPet.value"
            @close-modal="closeModal"
            @submit="orderPet($event)"
        />
        </template>
      </base-modal>
    </Teleport>
  </section>

  <div v-else-if="state === 'loading'">
    <p>...LOADING</p>
  </div>
  <div v-else>
    <p>No data available</p>
  </div>

  <Toast
    v-if="toastState == 'ordered'"
    :title="'Pet order for id ' + selectedPet.value.id + ' has been placed successfully'"
    @closeToast="toastState = 'hidden'"
  />

  <Toast
    v-if="toastState == 'error'"
    error
    title="Something went wrong! Please try again"
    @closeToast="toastState = 'hidden'"
  />

  <Toast
    v-if="toastState == 'errorMessage'"
    error
    :title="error.value.message"
    @closeToast="toastState = 'hidden'"
  />
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { fetchPetsByStatus, placeOrderForPet } from "../requests.js";
import BaseModal from "./BaseModal.vue";
import PurchaseForm from "./PurchaseForm.vue";
import Toast from "./Toast.vue";


const filters = reactive(["available", "pending", "sold"]);
const activeFilter = ref("available");
const state = ref("loading");
const pets = ref(null);

const modalState = ref("hidden");
const activeModal = reactive({name: null, pet: null});
const selectedPet = reactive({});

const toastState = ref("hidden");
const error = reactive({});

function filterPets(status) {
  activeFilter.value = status;
  getPetsByStatus();
}

function getPetsByStatus() {
  return fetchPetsByStatus(activeFilter)
    .then(response => {
      pets.value = [...response.data];
      state.value = "loaded";
    })
    .catch(error => {
      state.value = error;
      console.log("error", error);
    })
}

getPetsByStatus();

function openModal(modalName, pet) {
  modalState.value = "visible";
  activeModal.value = {
    name: modalName,
    pet: pet
  };
  selectedPet.value = pet;
}

const modalTitle = computed(() => {
  switch (activeModal.value.name) {
    case "buyPet":
      return "Buy pet";
    default:
      return "";
  }
})

function closeModal() {
  modalState.value = "hidden";
}

function orderPet(order) {
  modalState.value = "loading";
  // activeModal.value = {};

  placeOrderForPet(order)
    .then(res => {
      const responseData = res.data;
      console.log('responseData', responseData);
      modalState.value = "hidden";
      toastState.value = "ordered";

      getPetsByStatus();

    })
    .catch(err => {
      error.value = err;
      console.log("error", error.value);

      modalState.value = "hidden";
      if (error.value.message) {
        toastState.value = "errorMessage";
      } else {
        toastState.value = "error";
      }
    })

}
</script>

<style lang="sass" scoped>
@import "../assets/main.sass"

.filters-wrapper
  display: flex
  margin-bottom: 1rem
  p
    margin-right: 1rem
  span
    font-weight: 500
    font-size: .9rem
    padding: 2px
    cursor: pointer
    &.active
      padding: 5px 10px
      background: $color-secondary
      color: $color-white
      border-radius: 15px

.pets-list
  margin: 0
  padding: 0
  list-style: none
  li
    position: relative
    border: 1px solid $color-primary
    margin-bottom: 1rem
.pet-item
  p
    padding: .2rem .5rem
    border-bottom: 1px solid $color-border
    &:last-child
      border-bottom: none
.pet-button
  padding: .2rem .5rem
  border-top: 1px solid $color-border

@media (min-width: 1024px)
  .pets-list
    text-align: center

</style>