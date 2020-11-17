<template>
  <svg class="x-icon" @click="$emit('click', $event)">
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
