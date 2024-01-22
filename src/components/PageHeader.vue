<script setup>
import { useCounterStore } from '@/stores/counter.js';
import lidlLogo from '@/assets/logo.svg';
import { SimpleCart } from '@iconoir/vue';

const counter = useCounterStore()
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <img :src="lidlLogo" alt="Lidl Logo Deutschland">
    </div>
    <button class="header__cart">
      <SimpleCart width="32" height="32" />
      <span class="header__cart-count" :class="counter.count > 0 ? 'show' : ''">
        {{ counter.count }}
      </span>
    </button>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px;
  background-color: var(--clr-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  &__logo {
    display: flex;
  }

  &__cart {
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &__cart-count {
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
    transition: transform 130ms ease-in-out, opacity 130ms ease-in-out;

    &.show {
      display: block;
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>