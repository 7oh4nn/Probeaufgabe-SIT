<script setup>
import { onMounted } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useCartStore } from '@/stores/cartStore.js';
import TabModule from '@/components/TabModule.vue';
import ContentGrid from '@/components/ContentGrid.vue';
import TabModulePanel from '@/components/TabModulePanel.vue';

const cart = useCartStore();
const products = cart.allProducts;
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
