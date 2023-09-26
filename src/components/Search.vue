<template>
  <h4>Search dog by name:</h4>
  <input
    type="text"
    placeholder="Start searching"
    v-model="text"
    @keyup="search"
  />
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const text = ref("");
const search = () => {
  store.dispatch("filterName", text.value);
}

</script>

<style lang="sass" scoped>
@import "../assets/main.sass"
</style>