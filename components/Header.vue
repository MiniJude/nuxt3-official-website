<template>
    <div class="common-header">
        <div class="logo-box">
            <img src="~/assets/svg/admin-logo.svg" alt="">
            <span>图灵智考</span>
        </div>
        <div class="nav">
            <ULink class="nav-item" v-slot="{ isActive }" to="/">
                <span :class="{ active: isActive }">首页</span>
            </ULink>

            <UDropdown :items="items" mode="click" :popper="{ placement: 'bottom-start' }"
                :ui="{ padding: '', divide: '', item: { padding: '' } }">
                <!-- <NuxtLink class="nav-item" v-slot="{ isActive }" to="/"> -->
                <span class="nav-item flex items-center" :class="{ 'font-bold': route.path.includes('feature') }">产品功能
                    <UIcon class="ml-[4px]" name="i-heroicons-chevron-down" />
                </span>

                <!-- </NuxtLink> -->
                <template #item="{ item }">
                    <div class="h-[50px] pl-[20px] flex items-center">
                        <img width="20" class="mr-[8px]" :src="item.icon" alt="">
                        <span class="text-[16px] leading-[24px]" style="color: rgba(0,0,0,0.85);">{{ item.label
                            }}</span>
                    </div>
                </template>
            </UDropdown>
            <ULink class="nav-item" v-slot="{ isActive }" to="/teacher-guide/account-manage">
                <span :class="{ active: isActive }">操作指南</span>
            </ULink>
        </div>
        <div class="btn-wrapper">
            <div class="btn w-[120px]" @click="navigateTo('/try')">免费试用</div>
            <div class="btn w-[92px] ml-[16px]">登录</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const items = [
    [{
        label: '常规考试',
        icon: '/svg/normal-test.svg',
        href: '/feature/normal-test'
    }], [{
        label: '能力测评（内测中）',
        icon: '/svg/ability-test.svg',
        href: '/feature/ability-test',
        disabled: true
    }]
]


</script>

<style lang="less">
.common-header {
    width: 100%;
    margin: 0 auto;
    max-width: 1920px;
    height: 64px;
    background-color: hsla(0, 0%, 100%, .3);
    backdrop-filter: blur(10px) opacity(1);
    display: flex;
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 0;
    transform: translateX(-50%);

    .logo-box {
        display: flex;
        align-items: center;
        width: 360px;
        padding-left: 57px;

        span {
            font-size: 20px;
            margin-left: 8px;
            font-weight: bold;
        }
    }

    .nav {
        flex: 1;
        display: flex;

        .nav-item {
            margin-right: 48px;
            height: 100%;
            display: flex;
            align-items: center;

            span {
                font-size: 16px;

                &.active {
                    font-weight: bold;
                }
            }
        }
    }

    .btn-wrapper {
        width: 360px;
        display: flex;
        align-items: center;

        .btn {
            cursor: pointer;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            border: 1px solid @primary;
            font-size: 16px;
            color: @primary;

            &:first-child {
                background-color: @primary;
                color: #fff;
            }
        }
    }
}
</style>
