<template>
  <div class="anchor-tab" ref="anchorTabRef">
    <div class="anchor-tab-head head-real relative" :class="{ 'opacity-0': isSticky }" ref="realHeadRef">
      <div class="relative flex z-50 w-full">
        <div class="anchor-tab-item" ref="tabItemRef" v-for="(item, index) in items" :key="item.title"
          :class="{ active: activeIndex === index }" @click="e => handleTabClick(e, item, index)">{{ item.title }}</div>
      </div>
      <div class="anchor-tab-slider" :style="{ width: sliderWidth + 'px', left: sliderLeft + 'px' }">
        <slot name="sliderImg"></slot>
      </div>
    </div>
    <div class="anchor-tab-head head-sticky relative" :class="{ active: isSticky }">
      <div class="relative flex z-50 w-full">
        <div class="anchor-tab-item" ref="tabItemRef" v-for="(item, index) in items" :key="item.title"
          :class="{ active: activeIndex === index }" @click="e => handleTabClick(e, item, index)">{{ item.title }}</div>
      </div>
      <div class="anchor-tab-slider" :style="{ width: sliderWidth + 'px', left: sliderLeft + 'px' }">
        <slot name="sliderImg"></slot>
      </div>
    </div>
    <div class="anchor-tab-content" v-for="(item, index) in items" ref="tabContentRef">
      <slot name="content" :item="item" :isActive="activeIndex === index"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll, useTimeoutFn } from '@vueuse/core'

type column = {
  title: string
  contents: {
    desc: string
    image: string
  }[]
}
const props = withDefaults(defineProps<{
  items: column[]
  headWidth?: string
}>(), {
  headWidth: '1200px'
})


// 初始化
const activeIndex = ref(0)
const tabItemRef = ref()
const sliderWidth = ref(0)
const sliderLeft = ref(0)
function renderSlider() {
  let { offsetWidth, offsetLeft } = tabItemRef.value[activeIndex.value]
  sliderWidth.value = offsetWidth
  sliderLeft.value = offsetLeft
}

/** 点击事件 */
const isClicking = ref(false)
const { start, stop } = useTimeoutFn(() => {
  isClicking.value = false
}, 1000)

function handleTabClick(e: any, item: column, index: number) {
  isClicking.value = true
  start()

  sliderWidth.value = e.target.offsetWidth
  sliderLeft.value = e.target.offsetLeft
  activeIndex.value = index
  y.value = tabContentRef.value?.[index].offsetTop! - 64 - 56
}

// 滚动吸顶
const isSticky = ref(false)
const realHeadRef = ref<HTMLDivElement>()
const anchorTabRef = ref<HTMLDivElement>()
const tabContentRef = ref<HTMLDivElement[]>()
const { x, y } = useWindowScroll({ behavior: 'smooth' })
watch(y, () => {
  isSticky.value = (realHeadRef.value?.getBoundingClientRect().top! - 64 < 0) && (anchorTabRef.value?.getBoundingClientRect().bottom! > 64 + 56)

  if (!isSticky.value || isClicking.value) return

  for (let i = 0; i < tabContentRef.value?.length!; i++) {
    if (tabContentRef.value?.[i].getBoundingClientRect().bottom! > 64 + 56) {
      activeIndex.value = i
      renderSlider()
      break
    }
  }
})

onMounted(() => {
  renderSlider()
})

</script>

<style lang="less" scoped>
@height: 56px;

.anchor-tab {
  .anchor-tab-head {
    width: v-bind(headWidth);
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;

    &.head-real {
      margin-bottom: 64px;
      // transition: all ease 0.2s;
    }

    &.head-sticky {
      width: v-bind(headWidth);
      position: fixed;
      left: 50%;
      top: -56px;
      transform: translateX(-50%);
      z-index: 99;
      // transition: all ease 0.2s;

      &.active {
        top: 64px;
      }
    }

    .anchor-tab-item {
      flex: 1;
      min-width: 0;
      height: @height;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0, 0, 0, 0.65);
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;

      &.active {
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .anchor-tab-slider {
      position: absolute;
      left: 0;
      top: 0;
      height: @height;
      // background: linear-gradient(206deg, #d2edff 0%, #ffffff 50%, #e2dffb 100%);
      border-radius: 8px;
      z-index: 10;
      transition: all ease 0.5s;
    }
  }

  .anchor-tab-content {

    &+.anchor-tab-content {
      margin-top: 120px;
    }
  }
}
</style>