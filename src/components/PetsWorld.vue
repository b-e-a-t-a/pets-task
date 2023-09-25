<template>
  <section class="filters-wrapper">
    <p v-for="(filter, index) in filters" :key="index">
      <span
        @click="filterPets(filter)"
        :class="{ active: filter === activeFilter }"
      >{{ filter }}</span>
    </p>
  </section>

  <div v-if="loading" class="loader">
    <p>...LOADING</p>
  </div>

  <div v-else-if="error && error.state" class="error">
    <p>No data available</p>
  </div>

  <section v-if="pets">
    <ul class="pets-list">
      <li
        v-for="(pet, index) in pets"
        :key="index"
      >
        <PetListItem :pet="pet" />
      </li>
    </ul>

    <Teleport to="body">
      <Transition>
        <base-modal v-if="modalState.visibility === 'visible'">
          <template v-slot:header>
            <h2>{{ modalState.title }}</h2>
          </template>
          <template v-slot:body>
            <purchase-form
              :pet-values="modalState.data"
            />
          </template>
          <template v-slot:loader v-if="loading">
            ...LOADING
          </template>
        </base-modal>
      </Transition>
    </Teleport>
  </section>

  <TransitionGroup name="transform-translate">
    <Toast
      v-if="success"
      :title="'Pet order for id ' + modalState.data.id + ' has been placed successfully'"
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
import { reactive } from "vue";
import { useStore } from "vuex";
import BaseModal from "./BaseModal.vue";
import PurchaseForm from "./PurchaseForm.vue";
import Toast from "./Toast.vue";
import PetListItem from "./PetListItem.vue";
import { mapGetters } from "../mapState";

const store = useStore();

const filters = reactive(["available", "pending", "sold"]);

const { activeFilter,
    pets,
    loading,
    error,
    success,
    modal: modalState
  } = mapGetters();

function filterPets(status) {
  store.commit("SET_ACTIVE_FILTER", status);
  getPetsByStatus();
}

function getPetsByStatus()  {
  return store.dispatch("getPetsByStatus", activeFilter.value)
}

getPetsByStatus();

</script>

<style lang="sass" scoped>
@import "../assets/main.sass"

.filters-wrapper
  display: flex
  margin: 1rem auto
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

.loader, .error
  display: flex
  justify-content: center
  font-size: 2rem
  margin: 2rem auto
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