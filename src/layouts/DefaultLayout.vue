<script setup>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import CartModal from '@/components/CartModal.vue'
</script>

<template>
  <PageHeader />
  <main>
    <slot />
  </main>
  <PageFooter />
  <CartModal />
</template>

<style scoped lang="scss">
main {
  max-width:  var(--size-max-content);
  margin: 0 auto;
  box-shadow: 0 2px 15px 4px rgba(0, 0, 0, 0.15);
}
</style>