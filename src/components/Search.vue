<template>
  <h4>Search dog by name:</h4>
  <input
    type="text"
    placeholder="Start searching"
    :value="text"
    @keyup="search"
  />
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const text = computed(() => store.state.text);

const search = (e) => {
  store.commit("UPDATE_TEXT", e.target.value);
  store.dispatch("filterByName", e.target.value);
}

</script>

<style lang="sass" scoped>
@import "../assets/main.sass"
</style>