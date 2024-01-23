<script setup>
import emptyCart from '@/assets/undraw_empty_cart_co35.svg'
import { ref, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore.js'
import AddToCart from '@/components/AddToCart.vue'

const cart = useCartStore()
const productsInCart = ref([])
let uniqueIds = null

watch(() => cart.cartModalOpen, (newValue) => {
    if (newValue === true) {
      uniqueIds = new Set(cart.cartItems)
      uniqueIds.forEach(id => {
        productsInCart.value.push(cart.getCartProductsDetails(id))
      })
    } else {
      productsInCart.value = []
    }
  }
)

function clearCart() {
  cart.clearCart()
  cart.cartModalOpen = false
}
</script>

<template>
  <Transition>
    <div v-if="cart.cartModalOpen" class="cart-modal">
      <div class="cart-modal__inner">
        <h2>Ihr Einkaufswagen</h2>
        <ul v-if="productsInCart.length" class="cart-modal__products">
          <li v-for="product in productsInCart" class="product" :key="product.id">
            <div class="product__image">
              <img :src="product.image1" :alt="product.title" />
            </div>
            <div class="product__details">
              <h3>{{ product.title }}</h3>
              <p>{{ product.price }} €</p>
              <span>Anzahl: {{ cart.getCartProductsCount(product.id) }}</span>
            </div>
          </li>
        </ul>
        <button v-if="productsInCart.length" @click="clearCart" class="cart-modal__clear btn btn--secondary">Warenkorb
          leeren
        </button>
        <div v-else class="cart-modal__empty">
          <p>... ist leer.</p>
          <img :src="emptyCart" alt="Illustration of a man with an empty shopping cart" width="120"
               class="cart-modal__empty" />
        </div>

        <span v-if="productsInCart.length" class="cart-modal__count">
          {{ cart.cartItems.length }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  &__inner {
    position: absolute;
    top: max(340px, 50%);
    left: 50%;

    width: clamp(300px, 80vw, 480px);
    height: max-content;
    max-height: 70vh;

    overflow: auto;

    transform: translate(-50%, -50%);
    background-color: var(--clr-white);
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.3);


    h2 {
      color: var(--clr-brand-blue);
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin: 0 0 1rem 0;
    }
  }

  &__products {
    list-style: none;
    margin: 0;
    padding: 0;

    .product {
      display: grid;
      grid-template-columns: 50px auto;
      gap: 0 1rem;

      &:not(:first-of-type) {
        margin-top: 1rem;
      }

      &__image {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 0.5rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      h3 {
        font-weight: bold;
      }
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      margin-top: 1rem;
    }
  }

  &__clear {
    margin-top: 1rem;
  }

  &__count {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 42px;
    height: 42px;
    padding: 6px;

    color: var(--clr-white);
    background-color: var(--clr-brand-blue);
    border-radius: 50%;
    border: 2px solid var(--clr-white);

    font-size: 1rem;
    text-align: center;
    font-weight: bold;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>