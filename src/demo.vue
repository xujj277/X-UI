<template>
  <div class="wrapper">
    <x-slides :selected.sync="selected">
      <x-slides-item name="1">
        <div class="box">1</div>
      </x-slides-item>
      <x-slides-item name="2">
        <div class="box">2</div>
      </x-slides-item>
      <x-slides-item name="3">
        <div class="box">3</div>
      </x-slides-item>
    </x-slides>
  </div>
</template>

<script>
  import XSlides from './slides/slides'
  import XSlidesItem from './slides/slides-item'
  export default {
    name: 'demo',
    components: { XSlides, XSlidesItem },
    data() {
      return {
        selected: undefined
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