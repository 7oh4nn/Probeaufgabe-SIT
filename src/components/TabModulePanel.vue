<script setup>
import { inject, onMounted, onUnmounted, ref } from 'vue';
import { NavArrowRight } from '@iconoir/vue';

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  index: {
    required: true,
    type: Number
  }
});

const openTabMaxHeight = ref(0);
const accordionInner = ref([]);

const register = inject('accordion-register');
const { expanded, toggle, unregister } = register();

function setCurrentMaxHeight() {
  openTabMaxHeight.value = accordionInner.value.clientHeight;
}

function handleClick() {
  toggle();
  setCurrentMaxHeight(props.index);
}

onMounted(() => {
  openTabMaxHeight.value = 10000; // some random big number as first value
});

onUnmounted(unregister);
</script>

<template>
  <button
    :id="`tabModuleItem-${index}`"
    class="tab-module__toggle"
    @click="handleClick"
    :aria-expanded="expanded ? 'true' : 'false'"
    :aria-controls="`tabModuleContent-${index}`"
  >
    <NavArrowRight />
    <span role="heading" aria-level="3">
      {{ title }}
    </span>
  </button>
  <div
    :id="`tabModuleContent-${index}`"
    class="tab-module__content"
    role="region"
    :style="expanded ? `max-height: ${openTabMaxHeight}px` : ''"
    :aria-labelledby="`accordionitem-${index}`"
    :aria-hidden="expanded ? 'false' : 'true'"
  >
    <div class="accordion__content-inner" ref="accordionInner">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-module {
  // no code here
  &__toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    padding: 12px 16px;

    font-size: 1.2rem;
    text-align: left;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--clr-grey-300);
    background-color: var(--clr-grey-200);
    cursor: pointer;

    transition:
      background-color 200ms ease-in-out,
      color 200ms ease-in-out;

    @media screen and (min-width: 768px) {
      padding: 16px 24px;
      font-size: 1.6rem;
    }

    @media screen and (min-width: 1280px) {
      position: absolute;
      bottom: var(--carousel-height);
      left: 16px;
      width: max-content;
      font-size: 1.6rem;
      border-radius: 6px 6px 0 0;
      border: none;
      z-index: 9;

      svg {
        display: none;
      }
    }

    &:hover,
    &:focus-visible {
      color: var(--clr-brand-blue);
      background-color: var(--clr-white);
    }

    span,
    svg {
      pointer-events: none;
    }

    svg {
      width: 18px;
      height: 18px;
      margin-right: 8px;
      transition: transform 200ms ease-in-out;

      @media screen and (min-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }

    &[aria-expanded='true'] {
      background-color: var(--clr-white);
      color: var(--clr-brand-blue);
      cursor: default;

      svg {
        transform: rotate(90deg);
      }
    }
  }

  &__content {
    height: auto;
    // open / close of accordion by changing max-height
    max-height: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    visibility: hidden;
    transition:
      max-height 300ms ease-in-out,
      visibility 0ms ease 300ms;

    @media screen and (min-width: 1280px) {
      max-height: 100% !important;
    }

    &:not(:first-of-type) {
      @media screen and (min-width: 1280px) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    /* Content Inner - max-height of content-area is set via outerHeight of this element */
    &-inner {
      border-bottom: 4px solid var(--clr-grey-200);
    }

    &[aria-hidden='false'] {
      // use css variables set by JS to open content on toggle to its max-height
      max-height: var(--content-toggle-item-max-height);
      visibility: visible;
      transition:
        max-height 300ms ease-in-out,
        visibility 0ms ease;

      @media screen and (min-width: 1280px) {
        opacity: 1;
      }
    }
  }
}
</style>
