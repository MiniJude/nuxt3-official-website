<template>
  <div class="relative">
    <Header></Header>
    <slot />
    <span class="copyright">京ICP备05046678号-21</span>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(0,0,0,0.45);
  font-size: 12px;
}
</style>