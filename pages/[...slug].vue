<template>
  <UPage>
    <ul class="flex pt-[32px] pb-[24px]">
      <li v-for="(item, index) in breadcrumbs" class="text-[14px] leading-[20px]">

        <span v-if="index !== breadcrumbs.length - 1" style="color: rgba(0,0,0,0.45);">
          <span>{{ item.label }}</span>
          <span class="mx-[4px]">/</span>
        </span>
        <span v-else class="font-bold" style="color: rgba(0,0,0,0.85);">{{ item.label }}</span>
      </li>
    </ul>

    <UPageBody prose>
      <ContentRenderer v-if="page?.body" :value="page" />
    </UPageBody>

    <template v-if="page?.toc !== false" #right>
      <UContentToc :title="toc?.title" :links="page?.body?.toc?.links"></UContentToc>
    </template>
  </UPage>
</template>
<script setup lang="ts">

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc, seo } = useAppConfig()

// 面包屑
const { page: contentPage } = useContent()

const breadcrumbs: { label: string, to: string }[] = []
try {
  const pagePathExploded = contentPage.value._path.split('/')
  
  let tmpPagePath = ''
  
  for (const pagePathItem of pagePathExploded) {
    if (pagePathItem === '') continue
  
    tmpPagePath += `/${pagePathItem}`
  
    let path = await queryContent(tmpPagePath).only(['title', '_path']).findOne() as any
  
    breadcrumbs.push({
      label: path._dir?.title || path.title,
      to: path._path!
    })
  }
} catch (error) {
  // throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// 获取md内容
const { data: page, status, error, pending } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
// console.log('page:', page.value, status, error, pending)
if (!page.value) {
  // throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// useSeoMeta({
//   title: page.value.title,
//   ogTitle: `${page.value.title} - ${seo?.siteName}`,
//   description: page.value.description,
//   ogDescription: page.value.description
// })

// defineOgImage({
//   component: 'Docs',
//   title: page.value.title,
//   description: page.value.description
// })
</script>
