<script setup>
import { ref, provide, computed, onMounted } from 'vue'

const expanded = ref(null)
const firstItemId = ref(null);

provide('accordion-register', () => {
  const id = Symbol()

  onMounted(() => {
    // Set the first item as expanded initially
    if (!firstItemId.value) {
      firstItemId.value = id;
      expanded.value = id;
    }
  });

  return {
    expanded: computed(() => expanded.value === id),

    toggle() {
      expanded.value = expanded.value === id ? expanded.value : id
    },

    unregister() {
      if (expanded.value === id) {
        expanded.value = null
      }
    }
  }
})
</script>

<template>
  <div class="tab-module">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tab-module {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>