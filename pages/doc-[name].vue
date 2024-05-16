<template>
  <h1 v-if="page?.title" class="text-center text-[32px] leading-[3] font-bold">{{ page?.title}}</h1>
  <UContainer>
    <UPage>
      <UPageBody prose>
        <ContentRenderer v-if="page?.body" :value="page" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'empty'
})

const route = useRoute()

// console.log('path', route.path)

// 获取md内容
const { data: page, status, error, pending } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  // throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

</script>