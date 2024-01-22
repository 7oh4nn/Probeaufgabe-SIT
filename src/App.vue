<script setup>
import {onMounted} from 'vue';
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {useCounterStore} from '@/stores/counter.js'
import TabModule from '@/components/TabModule.vue'

const counter = useCounterStore();

// Read basket count if existing
onMounted
(() => {
  counter.readCount()
})

// safe basket count in session storage
window.addEventListener('beforeunload', counter.safeCount)
</script>

<template>
  <DefaultLayout>
    <TabModule />
  </DefaultLayout>
</template>

<style scoped lang="scss">

</style>
