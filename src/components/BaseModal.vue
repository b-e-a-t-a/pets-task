<template>
  <div class="modal-wrapper">
    <div
      class="modal"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <header class="modal-header" id="modalTitle">
        <slot name="header" />
        <button
          type="button"
          class="btn-close"
          aria-label="Handle close modal"
          @click="handleModalClosed"
        >
          x
        </button>
      </header>

      <section class="modal-body" id="modalDescription">
        <slot name="body" />
      </section>

      <section class="modal-loader">
        <slot name="loader" />
      </section>

     </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();

function handleModalClosed() {
  store.commit("SET_MODAL_VISIBILITY", "hidden");
}
</script>

<style lang="sass" scoped>
@import "../assets/main.sass"

.modal-wrapper
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  .modal
    width: 500px
    background: $color-white
    box-shadow: 2px 2px 20px 1px
    overflow-x: auto
    display: flex
    flex-direction: column
  .modal-header
    display: flex
    justify-content: space-between
    padding: 20px 30px
    position: relative
    border-bottom: 1px solid $color-border
    color: $color-secondary
  .modal-body
    position: relative
    padding: 20px 30px
  .modal-loader
    display: flex
    justify-content: center
    color: $color-primary-light
    font-size: 1.2rem

  @media (max-width: 768px)
    .modal
      max-width: 80vw
    .modal-header, .modal-body
      padding: 10px 15px

  @media (max-width: 322px)
    .modal
      width: 90vw
</style>