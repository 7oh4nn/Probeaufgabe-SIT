<script setup>
import AddToCart from '@/components/AddToCart.vue'
import CarouselModule from '@/components/CarouselModule.vue'
import { CartPlus } from '@iconoir/vue'

const product = defineProps({
  id: Number,
  title: String,
  description: String,
  price: Number,
  image1: String,
  image2: String
})
</script>

<template>
  <div class="grid-content">
    <div class="product">
      <img :src="product.image1" :alt="`Image of ${product.title}`" />
      <img :src="product.image2" :alt="`Another image of ${product.title}`" />
      <AddToCart :id="product.id" title="Add to cart">
        <slot name="icon">
          <CartPlus />
        </slot>
      </AddToCart>
    </div>
    <CarouselModule />
  </div>
</template>

<style scoped lang="scss">
.grid-content {
  display: flex;
  flex-direction: column;

  .product {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;

    @media screen and (min-width: 480px) {
      grid-template-columns: 3fr 2fr;
    }

    .btn {
      position: absolute;
      top: 16px;
      left: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
    }
  }
}
</style>
