<script setup>
import { defineProps } from 'vue'
import { useCartStore } from '@/stores/cartStore.js'

const cart = useCartStore();

const props = defineProps({
  product: {
    required: true,
    type: Object
  }
});
</script>

<template>
  <li class="product">
    <div class="product__image">
      <img :src="props.product.image1" :alt="props.product.title" />
    </div>
    <div class="product__details">
      <h3 class="product__title">{{ props.product.title }}</h3>
      <p class="product__desc">{{ props.product.description }}</p>
      <p class="product__price">{{ props.product.price }} €</p>
      <span class="product__count">Number: {{ cart.getCartProductsCount(product.id) }}</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
.product {
  display: grid;
  grid-template-columns: 50px auto;
  gap: 0 1rem;

  &:not(:first-of-type) {
    margin: 2rem 0 0;
  }

  &__image {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 0.5rem;
    margin-top: 7px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__details {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__title {
    grid-column: span 2;
    font-weight: bold;
  }

  &__desc {
    grid-column: span 2;
    margin: 0 0 0.5rem;
  }

  &__price {
    grid-column: 1;
    font-weight: bold;
  }

  &__count {
    grid-column: 2;
  }
}
</style>