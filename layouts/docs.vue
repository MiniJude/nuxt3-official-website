<template>
  <Header></Header>
  <div class="guide-page">
    <div class="search-wrapper">
      <h1 class="text-[32px] leading-[48px] mb-[24px] font-bold">常见问题</h1>
      <UInput class="search-ipt" icon="i-heroicons-magnifying-glass-20-solid" size="xl" color="white" :trailing="false"
        placeholder="请输入关键词" :ui="{ rounded: 'rounded-[32px]', icon: { leading: { padding: { xl: 'px-[24px]' } } } }"
        @click="toggleContentSearch" />
    </div>

    <UContainer>
      <UPage>
        <template #left>
          <UAside>
            <UNavigationTree :links="mapContentNavigation(navigation!)" />
          </UAside>
        </template>
        <slot />
      </UPage>
    </UContainer>

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" hide-color-mode />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
const { toggleContentSearch } = useUIState()

const navigation = inject<Ref<NavItem[]>>('navigation')

// console.log('inject navigation:', navigation)

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false
})

</script>

<style lang="less" scoped>
.guide-page {
  height: 100vh;

  .search-wrapper {
    height: 280px;
    padding-top: 64px;
    background: url('@/assets/img/bg4.webp') no-repeat center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :deep(.search-ipt) {
      width: 640px;
      height: 64px;

      input {
        height: 100%;
        padding-left: 52px;
      }
    }
  }
}
</style>