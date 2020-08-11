<template>
  <div>
    <x-nav :selected.sync="selected" style="margin: 20px;">
      <x-nav-item name="home">首页</x-nav-item>
      <x-sub-nav name="about">
        <template slot="title">关于</template>
        <x-nav-item name="culture">企业文化</x-nav-item>
        <x-nav-item name="developers">开发团队</x-nav-item>
        <x-sub-nav name="contact">
          <template slot="title">联系电话</template>
          <x-nav-item name="wechat">微信</x-nav-item>
          <x-nav-item name="qq">QQ</x-nav-item>
          <x-nav-item name="phone">手机</x-nav-item>
        </x-sub-nav>
      </x-sub-nav>
      <x-nav-item name="hire">招聘</x-nav-item>
    </x-nav>
    <x-nav :selected.sync="selected" vertical style=" margin: 220px;">
      <x-nav-item name="home">首页</x-nav-item>
      <x-sub-nav name="about">
        <template slot="title">关于</template>
        <x-nav-item name="culture">企业文化</x-nav-item>
        <x-nav-item name="developers">开发团队</x-nav-item>
        <x-sub-nav name="contact">
          <template slot="title">联系电话</template>
          <x-nav-item name="wechat">微信</x-nav-item>
          <x-nav-item name="qq">QQ</x-nav-item>
          <x-nav-item name="phone">手机</x-nav-item>
        </x-sub-nav>
      </x-sub-nav>
      <x-nav-item name="hire">招聘</x-nav-item>
    </x-nav>
  </div>
</template>

<script>
  import XNav from './nav/nav'
  import XNavItem from './nav/nav-item'
  import XSubNav from './nav/sub-nav'
  export default {
    name: 'demo',
    components: { XNav, XNavItem, XSubNav },
    data() {
      return {
        selected: ['home']
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /*:root {*/
  /*  --button-height: 32px;*/
  /*  --font-size: 14px;*/
  /*  --button-bg: #fff;*/
  /*  --button-active-bg: #eee;*/
  /*  --border-radius: 4px;*/
  /*  --color: #999;*/
  /*  --border-color: #999;*/
  /*  --border-color-hover: #666;*/
  /*}*/

  html {
    --font-size: 14px;
  }

  body {
    font-size: var(--font-size);
  }
  img {
    max-width: 14px;
  }

  .wrapper {
    margin: 40px;
  }

  .box {
    width: 100%;
    height: 150px;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }
</style>