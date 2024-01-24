import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import productsData from '@/assets/products.json';

export const useCartStore = defineStore('cart', () => {
  /* STATE */
  const cartItems = ref([]);
  const allProducts = productsData;
  const cartModalOpen = ref(false);
  const socket = ref(null);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received data from server:', data);

    // Assuming the server sends the entire cartItems array
    cartItems.value = data.cartItems;
  };

  /* ACTION */
  // Create the WebSocket on component mount
  onMounted(() => {
    console.log('Creating WebSocket');
    socket.value = new WebSocket('ws://localhost:3000');

    cartItems.value = [];

    // Request the current cartItems from the server
      socket.onopen = () => {
      socket.send('request-cartItems');
    };

    // Handle incoming messages from the server
    socket.value.onmessage = (event) => {
      const data = event.data

      try {
        // Try parsing the message as JSON
        const jsonData = JSON.parse(data);

        // Check if the message is a response to the cartItems request
        if (jsonData && jsonData.cartItems) {
          console.log('Received cartItems from server:', jsonData.cartItems);
          cartItems.value = jsonData.cartItems;
        }
      } catch (error) {
        // Handle non-JSON messages
        console.log('Received non-JSON message from server:', data);
      }
    };
  });

  // increment and decrement count
  const addItem = (id) => {
    cartItems.value.push(id);

    safeCartIDs();
  };

  const removeItem = (id) => {
    const index = cartItems.value.indexOf(id);
    if (index > -1) cartItems.value.splice(index, 1);

    safeCartIDs();
  };

  const safeCartIDs = () => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      const message = JSON.stringify(cartItems.value);
      socket.value.send(message);
    }
  };

  // get product details by ID
  const getCartProductsDetails = (ID) => {
    return allProducts.find((product) => product.id === ID);
  };

  // get number of same products in cart
  const getCartProductsCount = (ID) => {
    return cartItems.value.filter((item) => item === ID).length;
  };

  // clear cart
  const clearCart = () => {
    cartItems.value = [];
    safeCartIDs();
  };

  return {
    cartItems,
    allProducts,
    cartModalOpen,
    addItem,
    removeItem,
    safeCartIDs,
    socket,
    getCartProductsCount,
    getCartProductsDetails,
    clearCart
  };
});
