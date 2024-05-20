<template>
    <div class="try-page">
        <div class="text-[48px] font-bold leading-[60px] mb-[84px]">轻松办好每一场考试</div>
        <div class="flex justify-center gap-[132px]">
            <div class="box-empty teacher-box">
                <div class="box" @click="navigateTo('/apply-for-trial')">
                    <div class="text-[32px] leading-[48px] text-[rgba(0,0,0,0.85)] font-bold">我是教师</div>
                    <div class="mt-[16px] text-[16px] leading-[32px]">副标题副标题副标题副标题副标题副标题</div>
                    <div class="try-icon">
                        立即体验
                        <img class="ml-[5px]" src="@/assets/svg/arrow.svg" alt="">
                    </div>
                </div>
                <img class="bg" src="@/assets/img/teacher-big.webp" alt="">
            </div>
            <div class="box-empty student-box">
                <div class="box">
                    <div class="text-[32px] leader-[48px] text-[rgba(0,0,0,0.85)] font-bold">我是学生</div>
                    <div class="mt-[16px] text-[16px] leading-[32px]">副标题副标题副标题副标题副标题副标题</div>
                    <div class="try-icon">
                        立即体验
                        <img class="ml-[5px]" src="@/assets/svg/arrow.svg" alt="">
                    </div>
                    <div class="test-type-wrapper">
                        <div class="test-type-item" v-for="item in list" @click="imitationExam(item)">{{ item.label }}</div>
                    </div>
                </div>
                <img class="bg" src="@/assets/img/teacher-big.webp" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const list = [
    {
        label: '整卷考试',
        stupid: ''
    },
    {
        label: '逐题考试',
        stupid: ''
    },
    {
        label: '单题限时',
        stupid: ''
    },
]

const token = ref('')
const studentId = ref('')
async function search() {
    try {

        const response = await $fetch('/api/v1/portal/studenttryout', {
            method: 'POST'
        }) as any

        if (response.code === 1000) {
            const { access_token, stupids, stuid } = response.data
            token.value = access_token
            studentId.value = stuid
            list.forEach((item, index) => {
                item.stupid = stupids[index]
            })
        } else {
            message.error(response.msg);
        }

    } catch (error) {
        message.error('网络异常')

    } finally {
    }
}

onMounted(() => {
    search()
})


// 模拟考试
async function imitationExam(item: any) {
  let baseUrl: string
  if (location.href.includes('localhost') || location.href.includes('192.168')) {
    baseUrl = 'https://localhost:9001/'
  } else if (location.href.includes('teacher-preview')) {
    baseUrl = 'https://preview.exam.isrc.ac.cn/'
  } else {
    baseUrl = 'https://exam.isrc.ac.cn/'
  }
  try {
    window.open(
      `${baseUrl}#/pretest?id=${item.stupid}&stuid=${studentId.value}&token=${token.value}&stuname=游客同学`,
      '_blank'
    )
  } catch (error) {
    // do nothing
  }
}


</script>

<style lang="less" scoped>
.try-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('@/assets/img/bg2.webp') no-repeat center;

    .box-empty {
        position: relative;
        width: 420px;
        height: 460px;
        cursor: pointer;

        .box {
            position: absolute;
            border-radius: 25px;
            inset: 0;
            padding: 32px 24px 32px 40px;
            z-index: 2;
            transition: all ease .1s;

            &::before {
                display: block;
                content: '';
                border: 2px solid transparent;
                background: #fff border-box;
                mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                border-radius: inherit;
                pointer-events: none;
            }

            .try-icon {
                position: absolute;
                left: 40px;
                bottom: 48px;
                font-size: 16px;
                line-height: 32px;
                color: rgba(0, 0, 0, .65);
                display: flex;
                align-items: center;
            }
        }

        &.teacher-box {
            .box {
                background: url('@/assets/img/teacher-small.webp') no-repeat 145px 192px,
                    rgba(255, 255, 255, 0.50);
            }

            .bg {
                right: 251px;
            }
        }

        &.student-box {
            .box {
                background: url('@/assets/img/student-small.webp') no-repeat 145px 192px,
                    rgba(255, 255, 255, 0.50);
            }

            .bg {
                left: 252px;
            }
        }

        .bg {
            opacity: 0;
            position: absolute;
            top: 42px;
            z-index: 1;
            transition: all ease .1s;
        }

        &:hover {

            .box {
                backdrop-filter: blur(10px);

                &::before {
                    background: linear-gradient(180deg, #858cff, transparent) border-box;
                }
            }

            &.teacher-box {
                .box {
                    background: url('@/assets/img/teacher-small.webp') no-repeat 145px 192px, rgba(84, 120, 238, 0.08) !important;
                }
            }

            &.student-box {
                .box {
                    background: url('@/assets/img/student-small.webp') no-repeat 145px 192px, rgba(84, 120, 238, 0.08) !important;
                }

                .test-type-wrapper {
                    opacity: 1;
                }

                .try-icon {
                    opacity: 0;
                }
            }



            .bg {
                opacity: 1;
            }
        }
    }

    .test-type-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 40px;
        opacity: 0;

        .test-type-item {
            width: 132px;
            height: 48px;
            color: @primary;
            font-size: 20px;
            line-height: 28px;
            background: rgba(84, 120, 238, 0.20);
            border-radius: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all ease .1s;

            &:hover {
                background: @primary;
                color: #fff;
            }
        }
    }
}
</style>