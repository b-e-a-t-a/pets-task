<template>
  <div
    class="Toast"
    role="alert"
    :class="{ error: error }"
  >
    <div class="Toast__container">
      <h3 v-if="title">
        <i v-if="error">!!!</i>
        {{ title }}
      </h3>
      <section class="Toast__content">
        <slot name="content" />
      </section>
      <button class="btn-close" @click="handleToastClosed">
        <span> X </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

defineProps({
  title: {
    type: String,
    required: true
  },
  error: {
    type: Boolean,
    required: false
  }
});

setTimeout(() => handleToastClosed(), 5000);

function handleToastClosed() {
  store.commit("CLEAR_TOAST");
}
</script>

<style lang="sass" scoped>
@import "../assets/main.sass"

.Toast
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background: $color-primary-light
  padding: 2.5rem 0
  transition: all .3s
  z-index: 10000
  &__container
    display: flex
    justify-content: space-between
    align-items: center
    h3
      padding-left: 1rem
      font-weight: 600
  span
    color: $color-black
    font-size: 1.5rem
  button
    border: none
    position: absolute
    top: .8rem
    right: .8rem
    &:hover, &:active
      border: none
      span
        color: $color-white

  &.error
    background-color: $color-black
    color: $color-primary-light
    border: 1px solid $color-primary-light
    span
      color: $color-primary-light
      font-size: 1.5rem
    button
      &:hover, &:active
        span
          color: $color-primary-super-light
</style>