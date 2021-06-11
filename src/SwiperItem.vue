<template>
  <div class="swiper-item" ref="swiperItem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem',
}
</script>

<style lang='scss' scoped>
.swiper-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
