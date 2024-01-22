import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  /* STATE */
  const count = ref(0)

  /* ACTION */
  // increment and decrement count
  const increment = () => count.value++
  const decrement = () => {
    if(count.value > 0) count.value--
  }
  // safe count in session storage
  const safeCount = () => {
    sessionStorage.setItem('basket-count', count.value)
  }
  // read basket-count from session storage
  const readCount = () => {
    const basketCount = sessionStorage.getItem('basket-count')
    if(basketCount) count.value = basketCount
  }

  return { count, increment, decrement, safeCount, readCount }
})
