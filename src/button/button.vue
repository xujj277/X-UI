<template>
  <!--  用 CSS 解决 iconPosition 的问题 -->
  <button class="x-button"
          :class="{[`icon-${iconPosition}`]: true}"
          @click="$emit('click')"
  >
    <x-icon class="icon" v-if="icon && !loading" :name="icon"></x-icon>
    <x-icon class="loading icon" v-if="loading" name="loading"></x-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import Icon from '../icon'

export default {
  name: 'xButton',
  components: {
    'x-icon': Icon
  },
  props: {
    icon: {
      type: String,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator (value) {
        return !(value !== 'left' && value !== 'right')
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "var";
  .x-button {
    font-size: $font-size;
    height: $button-height;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background-color: $button-bg;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    &:hover {
      border-color: $border-color-hover;
    }
    &:active {
     background-color: $button-active-bg;
    }
    &:focus {
      outline: none;
    }
    > .icon {
      order: 1;
      margin-right: .1em;
    }
    > .content {
      order: 2;
    }
    &.icon-right {
      > .icon {
        order: 2;
        margin-right: 0;
        margin-left: .1em;
      }
      > .content {
        order: 1;
      }
    }
    .loading {
      @include spin;
    }
    
    & + & {
      margin-left: 4px;
    }
  }
</style>
