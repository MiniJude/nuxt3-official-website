<template>
    <div class="my-swiper2">
        <Swiper ref="swiper" @realIndexChange="onRealIndexChange" :loop="true">
            <MySwiper2AllSlidesBtn :items="items" v-model:activeIndex="activeIndex"></MySwiper2AllSlidesBtn>
            <SwiperSlide v-for="item in items">
                <div class="flex items-center justify-between h-full">
                    <div>
                        <div class="text-[40px] leading-[48px] mb-[40px] text-[rgba(0,0,0,0.85)]">{{ item.desc }}</div>
                        <p v-for="text in item.contents"
                            class="text-[16px] leading-[32px] text-[rgba(0,0,0,0.65)] flex items-center">
                            <span
                                class="inline-block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.65)] mr-[10px]"></span>
                            {{ text }}
                        </p>
                        <div class="try-btn mt-[42px]" @click="navigateTo('/try')">免费试用</div>
                    </div>
                    <img height="282" :src="item.image" alt="">
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    items: {
        title: string
        desc: string
        contents: string[]
        image: string
    }[]
}>()


const activeIndex = ref(0)


// 轮播
const swiper = ref()
function onRealIndexChange(swiper: any) {
    // console.log(swiper.realIndex)
    activeIndex.value = swiper.realIndex
}

</script>
<style lang="less" scoped>
.swiper {
    display: flex;
    flex-direction: column-reverse;
}

.my-swiper2 {
    .swiper-slide {
        // width: 1200px;
        height: 466px;
        background: rgba(255, 255, 255, 0.50);
        border: 3px solid;
        border-image: linear-gradient(180deg, #ffffff, rgba(255, 255, 255, 0.30)) 3 3;
        border-radius: 16px;
        padding: 0 72px 0 48px;
    }
}
</style>