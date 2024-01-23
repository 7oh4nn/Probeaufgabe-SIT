import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import productsData from '@/assets/products.json'

export const useCartStore = defineStore('cart', () => {
  /* STATE */
  const cartItems = ref([]);
  const allProducts = productsData;
  const cartModalOpen = ref(false);

  /* ACTION */
  // increment and decrement count
  const addItem = (id) => {
    cartItems.value.push(id)
  }

  const removeItem = (id) => {
    const index = cartItems.value.indexOf(id)
    if (index > -1) cartItems.value.splice(index, 1)
  }

  // safe itemsIDs in session storage
  const safeCartIDs = () => {
    sessionStorage.setItem('cart-items', JSON.stringify(cartItems.value))
  }

  // read cart-count from session storage
  const readCartIDs = () => {
    const items = sessionStorage.getItem('cart-items')
    if (items) cartItems.value = JSON.parse(items)
  }

  // get product details by ID
  const getCartProductsDetails = (ID) => {
    return allProducts.find(product => product.id === ID)
  }

  // get number of same products in cart
  const getCartProductsCount = (ID) => {
    return cartItems.value.filter(item => item === ID).length
  }

  // clear cart
  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    allProducts,
    cartModalOpen,
    addItem,
    removeItem,
    safeCartIDs,
    readCartIDs,
    getCartProductsCount,
    getCartProductsDetails,
    clearCart
  }
})
