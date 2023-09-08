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
    <template></template>
    <ul class="pets-list">
      <li>list</li>
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

const filters = reactive(["available", "pending", "sold"]);
const activeFilter = ref("available");
const state = ref("loading");
const pets = ref(null);

function filterPets(status) {
  activeFilter.value = status;
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
    border-bottom: 1px solid $color-border
  &:last-child
    border-bottom: none
</style>