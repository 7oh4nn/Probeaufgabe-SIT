<script setup>
import {ref} from 'vue';
import {NavArrowRight} from "@iconoir/vue";

const tabs = [
  {
    id: 1,
    title: 'Tab 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto cumque, dolorum expedita facilis illum impedit ipsam iste perferendis praesentium.'
  },
  {
    id: 2,
    title: 'Tab 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto cumque, dolorum expedita facilis illum impedit ipsam iste perferendis praesentium.'
  },
  {
    id: 3,
    title: 'Tab 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto cumque, dolorum expedita facilis illum impedit ipsam iste perferendis praesentium.'
  }
]

const openTab = ref(0)

function toggleContent(event, index) {
  console.log(index)
}
</script>

<template>
  <ul class="accordion">
    <li v-for="(tab, index) in tabs" class="accordion__item">
      <button :id="`accordionitem-${index}`"
              class="accordion__toggle [ js-toggle ]"
              @click="openContent(index)"
              :data-tab-number="index"
              :aria-expanded="index === openTab ? 'true' : 'false'"
              :aria-controls="`content-${index}`">
        <NavArrowRight/>
        <span role="heading" aria-level="3">{{tab.title}}</span>
      </button>
      <div :id="`content-${index}`"
           class="accordion__content [ js-content ]"
           data-tab-number="1"
           role="region"
           :aria-labelledby="`accordionitem-${index}`"
           :aria-hidden="index === openTab ? 'false' : 'true'">
        <div class="accordion__content-inner [ js-content-height ]">
          <h4 class="h5">Here could be any content</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto cumque, dolorum expedita
            facilis illum impedit ipsam iste perferendis praesentium.</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.accordion {
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {

  }

  &__toggle {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 12px 16px;
    width: 100%;
    text-align: left;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--clr-grey-200);
    background-color: var(--clr-grey-100);

    span, svg {
      pointer-events: none;
    }

    svg {
      transition: transform 200ms ease-in-out;
    }

    &[aria-expanded="true"] {
      background-color: var(--clr-white);

      svg {
        transform: rotate(90deg);
      }
    }
  }
  &__content {
    height: auto;
    // open / close of accordion by changing max-height
    max-height: 0;

    overflow: hidden;

    /* Content Inner - max-height of content-area is set via outerHeight of this element */
    &-inner {

    }

    &[aria-hidden="false"] {
      // use css variables set by JS to open content on toggle to its max-height
      max-height: var(--content-toggle-item-max-height);
    }
  }
}
</style>