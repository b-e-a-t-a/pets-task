import { computed } from "vue";
import { useStore } from "vuex";


export const mapGetters = () => {
  const store = useStore();

  return Object.fromEntries(
    Object.keys(store.getters).map( getter => {
      return [getter, computed(() => store.getters[getter])];
    })
  )
}

export const mapActions = () => {
  const store = useStore();
  if (!store) return;

  return Object.fromEntries(
    Object.keys(store._actions).map( action => {
      return [action, value => store.dispatch(action, value)];
    })
  )
}

export const mapMutations = () => {
  const store = useStore();
  if (!store) return;

  return  Object.fromEntries(
    Object.keys(store._mutations).map( mutation => {
      return [mutation, value => store.commit(mutation, value)];
    })
  )
}