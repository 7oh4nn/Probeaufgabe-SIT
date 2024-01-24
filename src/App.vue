<script setup>
import { onMounted, onUnmounted } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useCartStore } from '@/stores/cartStore.js';
import TabModule from '@/components/TabModule.vue';
import ContentGrid from '@/components/ContentGrid.vue';
import TabModulePanel from '@/components/TabModulePanel.vue';

const cart = useCartStore();
const products = cart.allProducts;

// Create the WebSocket on component mount
onMounted(() => {
  cart.connectWebSocket();
});

onUnmounted(() => {
  cart.disconnectWebSocket();
});
</script>

<template>
  <DefaultLayout>
    <TabModule>
      <TabModulePanel
        v-for="(product, index) in products"
        :key="product.id"
        :title="product.title"
        :index="index"
      >
        <ContentGrid v-bind="product" :index="index" />
      </TabModulePanel>
    </TabModule>
  </DefaultLayout>
</template>

<style scoped lang="scss"></style>
