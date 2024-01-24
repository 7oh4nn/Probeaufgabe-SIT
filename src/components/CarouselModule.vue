<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import { NavArrowLeft, NavArrowRight } from '@iconoir/vue';
import TextMediaCard from '@/components/TextMediaCard.vue';

const settings = {
  // carousel settings
  itemsToShow: 1.5,
  itemsToScroll: 1
};

const breakpoints = {
  // breakpoints are mobile first
  // any settings not specified will fallback to the carousel settings
  // 768px and up
  480: {
    itemsToShow: 2.5
  },
  768: {
    itemsToShow: 3.5
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: 'start',
    itemsToScroll: 2
  }
};
</script>

<template>
  <carousel v-bind="settings" :breakpoints="breakpoints">
    <slide v-for="(slide, index) in 10" :key="slide">
      <TextMediaCard :index="index" />
    </slide>
    <template #addons>
      <navigation>
        <template #next>
          <NavArrowRight width="24" height="24" />
        </template>
        <template #prev>
          <NavArrowLeft width="24" height="24" />
        </template>
      </navigation>
    </template>
  </carousel>
</template>

<style lang="scss">
:root {
  --carousel-height: 100%;
  @media screen and (min-width: 1280px) {
    --carousel-height: 330px;
  }
  @media screen and (min-width: 1440px) {
    --carousel-height: 390px;
  }
}
.carousel {
  position: relative;
  padding: 0 8px;
  height: var(--carousel-height);

  &__viewport,
  &__track,
  &__slide {
    height: 100%;
  }

  &__slide {
    padding: 1rem 0.5rem;
  }

  &__prev,
  &__next {
    height: 100%;
    width: 32px;
    margin: 0;
    background-color: var(--clr-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

    @media screen and (min-width: 1280px) {
      width: 48px;
    }

    @media screen and (min-width: 1440px) {
      width: 56px;
    }

    svg {
      width: 24px;
      height: 24px;

      @media screen and (min-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }

    &:hover,
    &:focus {
      svg {
        color: var(--clr-brand-blue);
      }
    }

    &--disabled {
      display: none;
    }
  }
}
</style>
