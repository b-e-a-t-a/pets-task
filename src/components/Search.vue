<template>
  <div class="Form__field">
    <label for="searchText">Search dog by name:</label>
    <div class="Form__input">
      <input
        id="searchText"
        type="text"
        name="searchText"
        placeholder="Start searching"
        :value="text"
        @keyup="search"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const text = computed(() => store.state.searchText);

const search = (e) => {
  store.commit("UPDATE_TEXT", e.target.value);
  store.dispatch("filterByName", e.target.value);
}

</script>

<style lang="sass" scoped>
@import "../assets/main.sass"
</style>