<template>
  <transition name="modal-fade">
    <div class="modal-wrapper">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <slot name="loader" />

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

      </div>
    </div>
  </transition>

</template>

<script setup>
const emit = defineEmits(["close-modal"])

function handleModalClosed() {
  emit("close-modal")
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
  // width: 100vw
  // height: 100vh
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

  .modal-fade-enter-from,
  .modal-fade-leave-to
    opacity: 0

  .modal-fade-enter-active
  .modal-fade-leave-active
    transition: opacity .5s ease
</style>