<template>
  <div>
    <div class="section1">
      <div class="section-main">
        <p class="mt-[240px] text-[56px] font-bold">轻松办好每一场考试</p>
        <p class="mt-[20px] text-[24px]">结合前沿AI技术，为高校提供智能化考试解决方案</p>
        <div class="try-btn mt-[40px]" @click="navigateTo('/try')">免费试用</div>
      </div>
    </div>
    <div class="section2">
      <div class="section-main">
        <div class="section-title">引领考试新体验</div>
        <div class="section-content mt-[62px] flex">
          <div>
            <div class="indicators">
              <template v-for="(item, index) in section2List" :key="index">
                <div class="indicators-item" :class="{ active: index === section2Index }"
                  @click="section2Index = index">
                  <div class="flex items-center">
                    <img width="32px" :src="item.icon" alt="">
                    <span class="ml-[16px] text-[32px] leading-[40px]">{{ item.title }}</span>
                  </div>
                  <div class="desc flex opacity-0" :class="{ active: index === section2Index }">
                    <span class="desc-dot">·</span>
                    {{ item.desc }}
                  </div>
                </div>
              </template>
            </div>
            <div class="try-btn" @click="navigateTo('/try')">免费试用</div>
          </div>
          <div class="carousel">
            <img src="~/assets/img/mac-window.webp" alt="">
            <img class="gif-img" :src="section2List[section2Index].image" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="section3">
      <div class="section-main">
        <div class="section-title">高效考试解决方案</div>
        <div class="section-content">
          <AnchorTab class="mt-[64px]" :items="section3List">
            <template #sliderImg>
              <img class="h-full" src="~/assets/svg/tab1.svg" alt="">
            </template>
            <template #content="{ item, isActive }">
              <MySwiper class="swiper-item" :item="item" :autoPlay="isActive"></MySwiper>
            </template>
          </AnchorTab>
        </div>
      </div>
    </div>
    <div class="section4">
      <div class="section-main">
        <div class="section-title">覆盖各类考试场景</div>
        <div class="section-content mt-[60px]">
          <!-- <ClientOnly> -->
          <MySwiper2 :items="section4List"></MySwiper2>
          <!-- </ClientOnly> -->
        </div>
      </div>
    </div>
    <Footer style="background: #fff;"></Footer>
  </div>
</template>

<script lang="ts" setup>

const section2Index = ref(0)
const section2List = [
  {
    icon: '/svg/welcome-6.svg',
    title: 'AI批量出题',
    desc: '只需简单描述即可一键批量生成题目，出题从此不是一件难事',
    image: '/gif/6.gif'
  },
  {
    icon: '/svg/welcome-10.svg',
    title: '官方题库',
    desc: '大量题目开箱即用，创建试卷0成本。',
    image: '/gif/10.gif'
  },
  {
    icon: '/svg/welcome-4.svg',
    title: 'AI智能阅卷',
    desc: '对主观题进行智能分析，为教师提供判分参考，提高阅卷效率。',
    image: '/gif/4.gif'
  },
  {
    icon: '/svg/welcome-7.svg',
    title: '题目校对',
    desc: '题目数量太多？AI智能批量校对，让您只需要关注校对为错误的题目。',
    image: '/gif/7.gif'
  }
]

const section3List = [
  {
    title: '友好的考试界面',
    contents: [
      {
        desc: '题干支持<span>批注划线</span>，更符合线下考试习惯',
        image: '/img/1-1.webp'
      },
      {
        desc: '提供<span>计算器</span>，考试更加便利',
        image: '/img/1-2.webp'
      },
      {
        desc: '问答题支持<span>拍照上传答案</span>，打破文字答题的局限性',
        image: '/img/1-3.webp'
      }
    ]
  },
  {
    title: '智能化的AI出题',
    contents: [
      {
        desc: '输入题目描述或文字材料，<span>自动生成试题</span>',
        image: '/img/2-1.webp'
      },
      {
        desc: '根据正确答案，<span>智能生成干扰项</span>',
        image: '/img/2-2.webp'
      },
      {
        desc: '<span>一键转换题型</span>，扩充试题库',
        image: '/img/2-3.webp'
      },
      {
        desc: '<span>AI智能答题</span>，使出题有据可依',
        image: '/img/2-4.webp'
      }
    ]
  },
  {
    title: '强大的防作弊系统',
    contents: [
      {
        desc: '电脑和手机<span>双机位监考</span>，让作弊无处遁形',
        image: '/img/3-1.webp'
      },
      {
        desc: '合并<span>多场考试同时监考</span>，提高监考资源利用率',
        image: '/img/3-2.webp'
      },
      {
        desc: '利用<span>副屏监考</span>，充分利用多台显示器',
        image: '/img/3-3.webp'
      }
    ]
  },
  {
    title: '人性化的阅卷判分',
    contents: [
      {
        desc: '整卷和逐题<span>两种阅卷模式</span>，可根据个人习惯选择',
        image: '/img/4-1.webp'
      },
      {
        desc: '添加<span>联合阅卷人</span>，并行阅卷省时高效',
        image: '/img/4-2.webp'
      },
      {
        desc: '提供<span>护眼模式</span>，有效减轻长时间阅卷的视疲劳',
        image: '/img/4-3.webp'
      },
      {
        desc: '<span>AI辅助阅卷</span>，为判分提供快速有效的依据',
        image: '/img/4-4.webp'
      }
    ]
  },
  {
    title: '详细精准的结果评估',
    contents: [
      {
        desc: '<span>AI智能分析</span>整场考试结果，提供考试优化建议',
        image: '/img/5-1.webp'
      },
      {
        desc: '统计形式以<span>图表结合</span>，展示更加全面',
        image: '/img/5-2.webp'
      },
      {
        desc: '<span>分析考生的某场考试成绩</span>，辅助教师进行人才筛选',
        image: '/img/5-3.webp'
      },
      {
        desc: '<span>考生个人能力分析</span>，精准知晓考生的擅长科目',
        image: '/img/5-4.webp'
      }
    ]
  }
]

const section4List = [
  {
    title: '常规考试',
    desc: '多人常规线上考试',
    contents: ['统一的考试时间和试卷内容，保障考试公平公正', '严格的身份核验与监控机制，有效遏制作弊行', '详尽的考试分析报告，助教师全面把握考试情况'],
    image: '/img/6-1.webp'
  },
  {
    title: '学科竞赛',
    desc: '支持多学科竞赛',
    contents: ['提供在线编程和复杂编辑等功能，助力多学科竞赛', '逐题限时，增强竞赛的紧张感和竞争性', 'AI辅助阅卷，智能高效完成评分任务'],
    image: '/img/6-2.webp'
  },
  {
    title: '招聘笔试',
    desc: '岗位专属招聘笔试',
    contents: ['单人专属考试，组卷高效便捷', '随时随地参与，异国异地招聘无忧', '智能分析考试数据，候选人能力一目了然'],
    image: '/img/6-3.webp'
  },
  {
    title: '企业培训',
    desc: '企业内部培训与考核',
    contents: ['试卷内容固定，考试时间和地点灵活自由', '自动化的考试管理任务，降低培训的人力成本', '及时反馈考核结果，掌握培训情况'],
    image: '/img/6-4.webp'
  },
  {
    title: '课后测评',
    desc: '布置课后测评作业',
    contents: ['精准考察知识点，实现卷卷不同', '自动生成测评报告，无需人工干预', '及时反馈掌握情况，助力教师调整教学重点'],
    image: '/img/6-5.webp'
  }
]


</script>

<style lang="less" scoped>
.section1 {
  background: url(~/assets/img/banner.webp) no-repeat center;
  height: 704px;
}

.section2 {
  background: url(~/assets/img/2.webp) no-repeat center;
  height: 816px;
  background-color: #f5f5f5;

  .indicators {
    width: 392px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    min-height: 464px;


    .indicators-item {
      cursor: pointer;
      transition: all ease .5s;

      &:first-child {
        margin-top: 0 !important;
      }

      &:last-child {
        margin-bottom: 0 !important;
      }

      &.active {
        padding: 20px 16px;
        background: linear-gradient(270deg, #eff9ff, #ebedff);
        border-radius: 8px;
        box-shadow: 5px 6px 12px 0px rgba(0, 0, 0, 0.05);
        margin-bottom: 8px;
        margin-top: 8px;
      }

      .desc {
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.65);
        transition: all ease .5s;
        height: 0;
        width: 344px;

        &.active {
          opacity: 1;
          height: auto;
          margin-top: 16px;
        }

        .desc-dot {
          display: inline-block;
          color: @primary;
          font-weight: bold;
          margin-right: 10px;
        }
      }
    }
  }

  .carousel {
    margin-left: 156px;
    position: relative;

    .gif-img {
      position: absolute;
      z-index: 999;
      top: 64px;
      left: 24px;
      width: 604px;
      border-radius: 8px
    }
  }
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

.section4 {
  background: url(~/assets/img/bg.webp) no-repeat center;
  height: 836px;
}
</style>