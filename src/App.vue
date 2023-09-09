<script setup>
import PetsWorld from './components/PetsWorld.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="header">
      <h1>Pets you can buy</h1>
    </div>
  </header>

  <main>
    <Suspense>
      <PetsWorld />
      <template #fallback>
        ...Loading
      </template>
    </Suspense>
  </main>
</template>

<style lang="sass" scoped>
.logo
  display: block
  margin: 0 auto .5rem

.header
  text-decoration: none
  color: hsla(160, 100%, 37%, 1)
  transition: 0.4s
  h1
    text-align: center
    font-weight: 500
    font-size: 2.6rem
    line-height: 1.5
</style>
