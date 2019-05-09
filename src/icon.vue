<template>
  <svg class="x-icon">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
  import './svg'
  export default {
    name: 'xIcon',
    props: ['name']
  }
</script>

<style lang="scss" scoped>
  .x-icon {
    width: 1em;
    height: 1em;
  }
</style>
