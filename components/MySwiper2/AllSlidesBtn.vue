<template>
  <div>
    <div class="tabs relative">
      <div class="tab-item" ref="tabItemRef" v-for="(item, index) in items" :key="item.title"
        :class="{ active: activeIndex === index }" @click="e => handleTabClick(e, index)">
        {{ item.title }}
      </div>
      <div class="tab-slider" :style="{ width: sliderWidth + 'px', left: sliderLeft + 'px' }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  items: any
  activeIndex: number
}>()

const emits = defineEmits<{ (e: 'update:activeIndex', index: number): void }>()


const swiper = useSwiper()
// 初始化
const tabItemRef = ref()
const sliderWidth = ref(0)
const sliderLeft = ref(0)
function renderSlider() {
  let { offsetWidth, offsetLeft } = tabItemRef.value[props.activeIndex]
  sliderWidth.value = offsetWidth
  sliderLeft.value = offsetLeft
}
watch(() => props.activeIndex, renderSlider)


/** 点击事件 */
function handleTabClick(e: any, index: number) {
  sliderWidth.value = e.target.offsetWidth
  sliderLeft.value = e.target.offsetLeft
  emits('update:activeIndex', index)
  swiper.value?.slideToLoop(index)
}

onMounted(() => {
  renderSlider()
})
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 69px;

  .tab-item {
    width: 140px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    cursor: pointer;
  }

  .tab-slider {
    position: absolute;
    bottom: -8px;
    height: 2px;
    width: 140px;
    background: #000;
    transition: all ease 0.3s;
  }
}
</style>