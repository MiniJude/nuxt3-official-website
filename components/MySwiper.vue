<template>
  <div class="flex items-center justify-between">
    <div>
      <div class="text-gradient mb-[46px]">{{ item.title }}</div>
      <div v-for="(it, index) in item.contents" class="desc-item text-[18px] text-[rgba(0,0,0,0.65)]"
        :class="{ active: index === activeIndex }" v-html="`${index + 1}. ${it.desc}`" @click="handleClick(index)">
      </div>
      <div class="try-btn mt-[32px]" @click="navigateTo('/try')">免费试用</div>
    </div>
    <div class="w-[680px] h-[460px] overflow-hidden">
      <div class="h-full" :style="{ transform: `translateX(-${activeIndex * 680}px)` }"
        style="display: flex;transition: all ease .3s;">
        <img class="w-[680px] h-full" draggable="false" v-for="i in imgs" :src="i" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIntervalFn, useTimeoutFn } from '@vueuse/core'

const props = withDefaults(defineProps<{
  item: {
    title: string,
    contents: {
      desc: string
      image: string
    }[]
  }
  autoPlay?: boolean
}>(), {
  autoPlay: false
})

const imgs = computed(() => props.item.contents.map(it => it.image))

const activeIndex = ref(0)


function handleClick(index: number) {
  activeIndex.value = index

  if (props.autoPlay) {
    pause()
    start()
  }
}

// 自动轮播
const { isActive, pause, resume } = useIntervalFn(() => {
  activeIndex.value = (activeIndex.value + 1) % imgs.value.length
}, 3000, {
  immediate: false,
})

watch(() => props.autoPlay, (val, oldVal) => {
  val ? resume() : pause()
}, { immediate: true })

// 停止操作的倒计时 3+3=6秒后继续自动轮播
const { isPending, start, stop } = useTimeoutFn(() => {
  // console.log('重新启动定时器')
  resume()
}, 3000, {
  immediate: false
})


</script>

<style lang="less" scoped>
.text-gradient {
  font-size: 38px;
  font-weight: bold;
  /* 设置字体透明 */
  color: transparent;
  /* 设置线性渐变，从红色渐变到蓝色 */
  background-image: linear-gradient(321deg, #5dedf7 0%, #5491ff 24%, #835aff 47%, #8b54ff 60%, #faccf1 100%);
  /* 使用 -webkit-background-clip 属性将背景剪裁至文本形状 */
  -webkit-background-clip: text;
  /* 非Webkit内核浏览器需要使用标准前缀 */
  background-clip: text;
  /* 把当前元素设置为行内块，以便能够应用背景 */
  display: inline-block;
}

:deep(.desc-item) {
  position: relative;
  width: fit-content;
  cursor: pointer;
  overflow: hidden;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    left: -100%;
    bottom: 0;
    width: 100%;
    height: 2px;
    z-index: 9;
    transition: all 0.3s ease-in;
    background: linear-gradient(321deg, #5dedf7 0%, #5491ff 24%, #835aff 47%, #8b54ff 60%, #faccf1 100%);
  }

  &.active {
    &::after {
      left: 0;
    }
  }


  &+.desc-item {
    margin-top: 20px;
  }

  span {
    color: #000;
    font-weight: bold;
    position: relative;
    z-index: 9;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: -2px;
      z-index: -1;
      display: inline-block;
      width: calc(100% + 4px);
      height: 12px;
      background: linear-gradient(133deg, #d6edff 0%, #d9e2ff 53%, #d4d3ff 98%);
      border-radius: 3px;
    }
  }
}
</style>