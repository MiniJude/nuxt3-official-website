<template>
  <div class="footer">
    <div class="footer-main">
      <div>
        <div class="logo-box">
          <img src="~/assets/svg/admin-logo.svg" alt="">
          <span>图灵智考</span>
        </div>
        <div class="qrcode-box">
          <div v-for="item in qrcodeList" class="qrcode-item">
            <img :src="item.src" :key="item.label" alt="" class="w-[100px] h-[100px] rounded-[8px]">
            <span class="text-[14px]mt-[8px] text-[rgba(0,0,0,0.85)]">{{ item.label }}</span>
          </div>
        </div>
      </div>
      <UDivider orientation="vertical" class="ml-[116px] mr-[116px]" />
      <div class="flex gap-[120px]">
        <div class="link-box flex flex-col" v-for="item in linkList">
          <div class="text-[16px] font-bold text-[rgba(0,0,0,0.85)] leading-[24px] mb-[24px]">{{ item.title }}</div>
          <div class="mb-[16px]" v-for="(link, index) in item.links">
            <ULink v-bind="link">
              <span class="text-[14px] text-[rgba(0,0,0,0.85)] leading-[22px] whitespace-nowrap" :class="{ 'text-[gray]': link.disabled }">{{ link.label }}</span>
            </ULink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const qrcodeList = [
  { label: '微信公众号', src: '/svg/qrcode.svg' },
  { label: '抖音号', src: '/svg/qrcode.svg' },
]

const linkList: any[] = [
  {
    title: '产品',
    links: [
      { label: '常规考试', to: '/feature/normal-test' },
      { label: '能力测评（内测中）', to: '/feature/ability-test', disabled: true },
    ]
  },
  {
    title: '服务支持',
    links: [
      { label: '操作指南', to: '/teacher-guide/account-manage' },
      { label: '发版说明', to: '/doc-releases', target: '_blank' },
      { label: '法律声明', to: '/doc-legal-statement', target: '_blank' },
      { label: '隐私保护声明', to: '/doc-privacy-agreement', target: '_blank' },
    ]
  },
  // {
  //   title: '关于',
  //   links: [
  //     { label: '关于我们', to: '/about' },
  //   ]
  // },
  {
    title: '联系我们',
    links: [
      { label: '邮箱：turingexam@iscas.con' },
      { label: '电话：123456789' },
    ]
  },
]

</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  max-width: 1920px;
  background: linear-gradient(135deg, #e0ebfd, #edf3fe 30%, #e2dffb);

  .footer-main {
    margin: 0 auto;
    width: 1200px;
    padding: 80px 0 117px;
    display: flex;

    .logo-box {
      display: flex;
      align-items: center;

      span {
        font-size: 20px;
        margin-left: 8px;
        font-weight: bold;
      }
    }

    .qrcode-box {
      display: flex;
      margin-top: 22px;

      .qrcode-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        &+.qrcode-item {
          margin-left: 24px;
        }
      }
    }
  }
}
</style>