<template>
  <div>
    <x-pager :total-page="1" :current-page.sync="currentPage"></x-pager>
  </div>
</template>

<script>
  import XPager from './pager'
  export default {
    name: 'demo',
    components: { XPager },
    data() {
      return {
        currentPage: 1
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

  html {
    --font-size: 14px;
  }

  body {
    font-size: var(--font-size);
  }
</style>