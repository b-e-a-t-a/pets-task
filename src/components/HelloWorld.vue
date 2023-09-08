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
          <p>Id: {{ pet.id }}</p>
          <p>Category: {{ pet.category && pet.category.name}}</p>
          <p>Name: {{ pet.name }}</p>
          <p v-if="pet.photuUrls">
            <img :src="pet.photuUrls"/>
          </p>
          <p v-else>No photo available</p>
          <p>Status: {{ pet.status }}</p>
        </article>
        <div v-if="pet.status === 'available'">
          <button class="btn-basic btn-wide btn-primary" @click="openModal('buyPet', pet)">buy</button>
        </div>
      </li>
    </ul>
  </section>
  <div v-else-if="state === 'loading'">
    <p>...LOADING</p>
  </div>
  <div v-else>
    <p>No data available</p>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { fetchPetsByStatus } from "../requests.js";


const filters = reactive(["available", "pending", "sold"]);
const activeFilter = ref("available");
const state = ref("loading");
const pets = ref(null);

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
  console.log('modal opened', modalName, pet);
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
    font-size: 0.9rem
    cursor: pointer
    &.active
      padding: 5px
      background: $color-secondary
      color: $color-white
      border-radius: 4px

.pets-list
  margin: 0
  padding: 0
  list-style: none
  li
    position: relative
    padding-bottom: .5rem
    border-bottom: 1px solid $color-border
  &:last-child
    border-bottom: none
</style>