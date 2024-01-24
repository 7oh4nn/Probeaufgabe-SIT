<script setup>
import { useCartStore } from '@/stores/cartStore.js';

const cart = useCartStore();

const props = defineProps({
  id: {
    required: true,
    type: Number
  },
  title: {
    required: true,
    type: String
  }
});
</script>

<template>
  <button @click="cart.addItem(props.id)" class="btn btn--primary" :title="props.title">
    <span>
      {{ title }}
    </span>
    <slot />
  </button>
</template>

<style lang="scss">
.btn {
  &:active {
  }
}
</style>
