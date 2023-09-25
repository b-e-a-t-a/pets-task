<template>
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
    <button
      class="btn-basic btn-wide btn-primary"
      @click="openModal('buyPet', pet)"
    >
      buy
    </button>
  </div>
</template>

<script setup>
import { mapMutations } from "../mapState";

defineProps({
  pet: {
    type: Object,
    default: () => {}
  }
})
const { SET_MODAL_VISIBILITY, SET_MODAL_TITLE, SET_MODAL_PET} = mapMutations();

function openModal(modalName, pet) {

  SET_MODAL_VISIBILITY("visible");
  SET_MODAL_TITLE(modalName);
  SET_MODAL_PET(pet);
}

</script>

<style lang="sass" scoped>
@import "../assets/main.sass"
.pet-item
  p
    padding: .2rem .5rem
    border-bottom: 1px solid $color-border
    &:last-child
      border-bottom: none
.pet-button
  padding: .2rem .5rem
  border-top: 1px solid $color-border
</style>
