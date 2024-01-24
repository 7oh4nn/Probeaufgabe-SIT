<script setup>
const props = defineProps({
  index: {
    type: Number
  }
});
</script>

<template>
  <div class="card">
    <div class="card__media">
      <img :src="`https://picsum.photos/32${props.index}/32${props.index}`" alt="" />
    </div>
    <div class="card__content">
      <span>Link</span>
    </div>
    <a href="#"><span class="sr-only">Link</span></a>
  </div>
</template>

<style lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: var(--clr-grey-100);
  overflow: hidden;
  transition: box-shadow 200ms ease-in-out;

  &__media {
    width: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 200ms ease-in-out;
    }
  }

  &__content {
    width: 100%;
    color: var(--clr-black);
    padding: 12px 6px;
    text-align: left;

    @media screen and (min-width: 768px) {
      padding: 18px 12px;
      font-size: 1.8;
    }

    span {
      font-weight: bold;
    }
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:focus-within {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

    .card__media {
      img {
        transform: scale(1.05);
      }
    }

    .card__content {
      color: var(--clr-brand-blue);
    }
  }
}
</style>
