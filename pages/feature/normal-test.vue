<template>
  <div>
    <div class="section1" ref="section1Ref">
      <div class="section-main">
        <p class="mt-[243px] text-[48px] font-bold leading-[84px]">常规考试｜全面覆盖通用考试场景</p>
        <p class="mt-[17px] text-[24px]">根据考试特殊需求，提供四种考试模式，基本涵盖所有考试场景</p>
        <div class="try-btn mt-[39px]" @click="navigateTo('/try')">免费试用</div>
      </div>
    </div>
    <div class="section2-wrapper" ref="section2WrapperRef">
      <div class="section2" :style="section2Style">
        <div class="section-main !w-full h-full flex flex-col">
          <div class="section-title">流程清晰，轻松组织一场考试</div>
          <div class="scroll-tabs">
            <div class="tabs">
              <template v-for="(tab, tabIndex) in section2List">
                <div class="tab-item"
                  :class="{ active: tabIndex === 0 || (tabIndex / 4 < - progress) || section3Ref?.getBoundingClientRect()?.top! < windowHeight }"
                  @click="handleClick(tabIndex)">{{ tab.title }}</div>
                <div v-if="tabIndex !== section2List.length - 1" class="progress-line"
                  :style="{ background: `linear-gradient(to right, rgba(0, 0, 0, .85) ${getLineRate(tabIndex)}%, rgba(0, 0, 0, .45) ${getLineRate(tabIndex)}% 100%)` }">
                </div>
              </template>
            </div>
            <div class="content-wrapper"
              :style="{ transform: `translateX(calc(${baseTranslateX}px + ${progress * 200}vw ))` }">
              <div class="flex gap-[40px]">
                <div class="content-item" v-for="tab in section2List">
                  <img style="width: 50vw;" :src="tab.image" alt="" draggable="false">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section3" ref="section3Ref">
      <div class="section-main">
        <div class="section-title">多种模式，满足不同场景需求</div>
        <div class="section-content">
          <AnchorTab class="mt-[64px]" :items="section3List" headWidth="900px">
            <template #sliderImg>
              <img class="h-full" src="~/assets/svg/tab2.svg" alt="">
            </template>
            <template #content="{ item }">
              <MySwiperSimple class="swiper-item" :item="item"></MySwiperSimple>
            </template>
          </AnchorTab>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize, useWindowScroll } from '@vueuse/core';
const section1Ref = ref<HTMLElement>()

const section2List = [
  { title: '创建考试', image: '/img/7-1.webp' },
  { title: '发放试卷', image: '/img/7-2.webp' },
  { title: '监考', image: '/img/7-3.webp' },
  { title: '阅卷', image: '/img/7-4.webp' },
  { title: '发布成绩', image: '/img/7-5.webp' },
]

const { width: windowWidth, height: windowHeight } = useWindowSize()

const baseTranslateX = ref(0)
function setBaseTranslateX() {
  baseTranslateX.value = (windowWidth.value - 1200) / 2
}
watch(windowWidth, setBaseTranslateX)
onMounted(() => {
  setBaseTranslateX()
})

const section2WrapperRef = ref<HTMLElement>()
const section2Style = ref<any>({
  position: 'relative',
  top: 0,
})
const { x: scrollX, y: scrollY } = useWindowScroll()
const progress = ref(0)
function getLineRate(tabIndex: number) {
  return Math.min(Math.max((-progress.value / 0.25 - tabIndex) * 100, 0), 100)
}


watch(scrollY, () => {
  // 最多左移四张
  if (section1Ref.value!.getBoundingClientRect().bottom < 0 && section3Ref.value!.getBoundingClientRect().top > windowHeight.value) {
    progress.value = section1Ref.value!.getBoundingClientRect().bottom / (4 * windowHeight.value)

    section2Style.value = {
      position: 'fixed',
      top: 0,
    }
  } else if (section1Ref.value!.getBoundingClientRect().bottom > 0) {
    section2Style.value = {
      position: 'absolute',
      top: 0,
    }
  } else {
    section2Style.value = {
      position: 'absolute',
      bottom: 0
    }
  }
})
function handleClick(index: number) {
  window.scrollTo({
    top: section2WrapperRef.value!.offsetTop + 2 + windowHeight.value * index,
    behavior: 'smooth'
  })
}


const section3Ref = ref<HTMLElement>()
const section3List = [
  {
    title: '整卷考试',
    contents: [
      {
        desc: '更贴合<span>线下考试习惯</span>，适用多数考试场景',
        image: '/img/8-1.webp'
      },
      {
        desc: '考生可统览整张试卷，<span>自主决定</span>作答顺序',
        image: '/img/8-1.webp'
      },
    ]
  },
  {
    title: '逐题展示',
    contents: [
      {
        desc: '单次<span>仅展示一道题目</span>，考试页面简单明了',
        image: '/img/8-2.webp'
      },
      {
        desc: '降低其他题目干扰，有助于考生<span>集中注意力</span>',
        image: '/img/8-2.webp'
      },
    ]
  },
  {
    title: '单题限时',
    contents: [
      {
        desc: '每题<span>限制作答时间</span>，满足特殊考试场景',
        image: '/img/8-3.webp'
      },
      {
        desc: '帮助考生<span>合理分配考试时间</span>，更好把控考试节奏',
        image: '/img/8-3.webp'
      },
    ]
  },
]

</script>

<style lang="less" scoped>
.section1 {
  background: url(~/assets/img/banner2.webp) no-repeat center;
  // background-size: 100%;
  height: 704px;
}

.section2-wrapper {
  height: calc(500vh);
  position: relative;
}

.section2 {
  background: url(~/assets/img/bg.webp) no-repeat center;
  background-size: cover;
  height: 100vh;
}

.section3 {
  padding-bottom: 80px;
  background-color: #f8faff;

  .anchor-tab-content {
    &:nth-child(2n) {
      .swiper-item {
        flex-direction: row-reverse
      }
    }
  }
}


.scroll-tabs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  flex: 1;

  .tabs {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 55px;
    position: relative;

    .progress-line {
      position: relative;
      flex: 1;
      top: 50%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.45);
    }

    .tab-item {
      display: flex;
      justify-content: center;
      width: 140px;
      height: 36px;
      border-radius: 19px;
      border: 1px solid rgba(0, 0, 0, 0.45);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      position: relative;
      transition: all ease .2s;
      cursor: pointer;

      &.active {
        background-color: rgba(0, 0, 0, 0.85);
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .content-wrapper {
    user-select: none;
    .content-item {
      background: rgba(255, 255, 255, 0.50);
      border-radius: 16px;
      flex-shrink: 0;
    }
  }
}
</style>