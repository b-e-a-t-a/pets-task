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
          <button class="btn-basic btn-wide btn-primary" @click="openModal('buyPet', pet)">
            buy
          </button>
        </div>
      </li>
    </ul>

    <Teleport to="body">
      <Transition name="transform-translate">
        <base-modal v-if="modalState === 'visible'">
          <template v-slot:header>
            <h2>{{ modalTitle }}</h2>
          </template>
          <template v-slot:body>
            <purchase-form
              :pet-values="selectedPet.value"
          />
          </template>
        </base-modal>
      </Transition>
    </Teleport>
  </section>

  <div v-if="loading" class="loader">
    <p>...LOADING</p>
  </div>

  <div v-else-if="error && error.state" class="error">
    <p>No data available</p>
  </div>

  <TransitionGroup name="transform-translate">
    <Toast
      v-if="success"
      :title="'Pet order for id ' + selectedPet.value.id + ' has been placed successfully'"
    />
    <Toast
      v-if="error && error.state && !error.message"
      error
      title="Something went wrong! Please try again"
    />
    <Toast
      v-if="error && error.state && error.message"
      error
      :title="error.message"
    />
  </TransitionGroup>



</template>

<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import BaseModal from "./BaseModal.vue";
import PurchaseForm from "./PurchaseForm.vue";
import Toast from "./Toast.vue";

const store = useStore();

const filters = reactive(["available", "pending", "sold"]);
const activeFilter = computed(() => store.getters.activeFilter);
const pets = computed(() => {
  return store.getters.pets
});
const loading = computed(() => store.getters.loading);
const error = computed(() => store.getters.error);
const success = computed(() => store.getters.success);
const modalState = computed(() => store.getters.modal);

const activeModal = reactive({name: null, pet: null});
const selectedPet = reactive({});

function filterPets(status) {
  store.commit("SET_ACTIVE_FILTER", status);
  getPetsByStatus();
}

function getPetsByStatus()  {
  return store.dispatch("getPetsByStatus", activeFilter.value)
}

getPetsByStatus();

function openModal(modalName, pet) {
  store.commit("SET_MODAL_VISIBILITY", "visible");
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

.loader, .error
  display: flex
  justify-content: center
  font-size: 2rem
.error
  color: $color-danger

.v-enter-active,
.v-leave-active
  transition: opacity 1s ease

.v-enter-from,
.v-leave-to
  opacity: 0

.transform-translate
  &-enter-active,
  &-leave-to
    opacity: 0
    transform: translateY(100%)

@media (min-width: 1024px)
  .pets-list
    text-align: center

</style>