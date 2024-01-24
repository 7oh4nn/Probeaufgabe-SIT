<script setup>
import lidlLogo from '@/assets/logo.svg';
import ClientCart from '@/components/ClientCart.vue';
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__logo">
        <img :src="lidlLogo" alt="Lidl Logo Deutschland" />
      </div>
      <ClientCart />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;

  padding: 12px 16px;
  background-color: var(--clr-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  z-index: 999;

  @media screen and (min-width: 768px) {
    padding: 8px 16px;
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: var(--size-max-content);
    margin: 0 auto;
  }

  &__logo {
    display: flex;
    width: 80px;
    height: 80px;

    @media screen and (min-width: 768px) {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
