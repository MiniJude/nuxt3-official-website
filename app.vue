<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
provide('navigation', navigation)
// console.log('provide navigation:', navigation)

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
