<template>
  <form @submit.prevent="submitForm()">
    <div>
      <!-- pet name -->
      <div class="Form__field">
        <label for="petName">Pet name</label>
        <div class="Form__input">
          <input
            id="petName"
            name="petName"
            type="text"
            :value="props.petValues.name"
            disabled
            class="disabled"
          >
        </div>
      </div>

      <!-- purchaseId -->
      <div class="Form__field">
        <label for="purchaseId">Purchase id</label>
        <div class="Form__input">
          <input
            id="purchaseId"
            name="purchaseId"
            type="number"
            v-model.number="purchaseId"
            disabled
            class="disabled"
          >
        </div>
      </div>

      <!-- petId -->
      <div class="Form__field">
        <label for="petId">Pet id</label>
        <div class="Form__input">
          <input
            id="petId"
            name="petId"
            type="number"
            :value="props.petValues.id"
            disabled
            class="disabled"
          >
        </div>
      </div>

      <!-- quantity -->
      <div class="Form__field">
        <label class="required" for="quantity">
          Quantity
        </label>
        <div class="Form__input">
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            max="10"
            v-model.number="quantity"
          >
        </div>
      </div>

      <!-- shipDate -->
      <div class="Form__field">
        <label class="required" for="shipDate">
          Ship date
        </label>
        <div class="Form__input">
          <input
            id="shipDate"
            name="shipDate"
            type="date"
            v-model="shipDate"
            :min="format(new Date(), 'yyyy-MM-dd')"
          >
        </div>
      </div>

      <!-- status -->
      <div class="Form__select">
        <label class="required" for="status-select">
          Status
        </label>
        <div class="Form__input">
          <select id="status-select" name="status" v-model="status">
            <option v-for="(option, key) in options" :key="'option-' + key">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <div class="Form__info">* required field</div>

    </div>

    <div class="modal-buttons">
      <button
        class="btn-default-medium btn-primary"
        @click="handleModalClosed"
      >
        Cancel
      </button>
      <button
        :disabled="!formValid"
        class="btn-default-medium btn-secondary"
        @click.prevent="submitForm"
      >
        Purchase
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { zonedTimeToUtc } from "date-fns-tz";
import { format } from "date-fns";
import { useStore } from "vuex";
import { mapActions } from "../mapState";

const store = useStore();

const props = defineProps({
  petValues: {
    type: Object,
    required: true
  }
});

const purchaseId = ref(Math.floor(100000000 + Math.random() * 900000000));
const quantity = ref(0);

const shipDate = ref(null);
const status = ref(null);
const options = reactive(["placed", "approved", "delivered"]);

const formValid = computed(() => {
  return Boolean(
    purchaseId.value &&
    props.petValues.id &&
    quantity.value && quantity.value > 0 &&
    shipDate.value &&
    status.value
  );
});

function handleModalClosed() {
  store.commit("SET_MODAL_VISIBILITY", "hidden");
}

const { setNewOrder, orderPet, getPetsByStatus, clearNewOrder } = mapActions();

async function submitForm() {
  const utcDate = zonedTimeToUtc(shipDate.value, "Europe/Berlin");
  const dto = {
    id: purchaseId.value,
    petId: props.petValues.id,
    quantity: quantity.value,
    shipDate: utcDate.toISOString(),
    status: status.value,
    complete: true,
  };
  Object.keys(dto).forEach(key => dto[key] === "" && delete dto[key]);

  // await store.dispatch("setNewOrder", dto);
  // await store.dispatch("orderPet");
  // await store.dispatch("getPetsByStatus", "available");
  // await store.dispatch("clearNewOrder");
  await setNewOrder(dto);
  await orderPet();
  await getPetsByStatus("available");
  await clearNewOrder("clearNewOrder");

  handleModalClosed();
}

</script>

<style lang="sass" scoped>
@import "../assets/main.sass"

.modal-buttons
  display: flex
  justify-content: space-between
  align-items: stretch
  flex-flow: row nowrap
  margin-top: 3rem
  button
    min-width: 30%
    text-transform: uppercase
</style>