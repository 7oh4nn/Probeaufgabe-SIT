<script setup>
import { provide, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore.js'
import { SimpleCart, Xmark } from '@iconoir/vue'

const cart = useCartStore()
const cartModalOpen = ref(false)

function toggleCartModal() {
  cart.cartModalOpen = !cart.cartModalOpen
}

</script>

<template>
  <button class="client-cart" :class="cart.cartModalOpen ? 'modal-open' : ''" @click="toggleCartModal">
    <SimpleCart v-if="!cart.cartModalOpen" width="32" height="32" />
    <Xmark v-else width="32" height="32" />
    <Transition v-if="!cart.cartModalOpen" name="bounce" mode="out-in">
      <span :key="cart.cartItems.length" class="client-cart__count" :class="cart.cartItems.length > 0 ? 'show' : ''">
        {{ cart.cartItems.length }}
      </span>
    </Transition>
  </button>
</template>

<style lang="scss" scoped>
.client-cart {
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;

  .bounce-enter-active {
    animation: bounce-in 300ms;
  }

  &__count {
    position: absolute;
    top: 0;
    left: 50%;
    width: 24px;
    height: 24px;
    padding: 3px;

    color: var(--clr-white);
    background-color: var(--clr-brand-blue);
    border-radius: 50%;
    border: 2px solid var(--clr-white);

    font-size: 12px;
    text-align: center;
    font-weight: bold;

    transform: scale(0.5);
    opacity: 0;
    transition: transform 150ms cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 130ms ease-in-out;

    @media screen and (min-width: 768px) {
      font-size: 16px;
      left: 60%;
      top: -10px;
      padding: 5px;
      width: 32px;
      height: 32px;
    }

    &.show {
      display: block;
      opacity: 1;
      transform: scale(1);
    }
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>