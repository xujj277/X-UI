<template>
  <button class="x-button" :class="[`icon-${iconPosition}`, `x-theme-${theme}`, `x-size-${size}`]"
          @click="$emit('click')" :disabled="disabled">
    <x-icon class="icon" :name="icon" v-if="!loading && icon"></x-icon>
    <x-icon name="loading" class="icon loading" v-if="loading"></x-icon>
    <span class="content"><slot></slot></span>
  </button>
</template>

<script>
import xIcon from '../icon'

export default {
  name: 'xButton',
  components: { xIcon },
  props: {
    icon: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator (value) {
        return value === 'left' || value === 'right'
      },
    },
    theme: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: 'normal',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import "var";

$active-color: #3a8ee6;
$focus-danger-red: #ff7875;

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
  cursor: pointer;
  box-sizing: border-box;
  white-space: nowrap;

  &:hover,
  &:focus {
    color: $blue;
    border-color: #c6e2ff;
    background: #eef5fe;
  }

  &:active {
    color: $active-color;
    border-color: $active-color;
    outline: none;
  }

  &:focus {
    outline: none;
  }

  &.x-size-big {
    font-size: 24px;
    height: 48px;
    padding: 0 16px;
  }
  &.x-size-small {
    font-size: 12px;
    height: 20px;
    padding: 0 4px;
  }

  &.x-theme-link {
    border-color: transparent;
    box-shadow: none;
    color: $blue;

    &:hover,
    &:focus {
      color: lighten($blue, 10%);
    }
  }

  &.x-theme-text {
    border-color: transparent;
    box-shadow: none;
    color: inherit;

    &:hover,
    &:focus {
      background: darken(white, 5%);
    }
  }

  &.x-theme-primary {
    background: #579ef8;
    color: #fff;
    border-color: #409eff;

    &:hover,
    &:focus {
      background: #66b1ff;
      border-color: #66b1ff;
    }

    &:active {
      background: $active-color;
      border-color: $active-color;
      color: #fff;
    }
    &[disabled] {
      color: #fff;
      background-color: #a0cfff;
      border-color: #a0cfff;
    }
  }

  &.x-theme-danger {
    background: $red;
    border-color: $red;
    color: white;

    &:hover,
    &:focus {
      background: $focus-danger-red;
      border-color: $focus-danger-red;
    }

    &:active {
      background: #dd6161;
      border-color: #dd6161;
    }
    &[disabled] {
      color: white;
      background-color: #fab6b6;
      border-color: #fab6b6;
    }
  }
  
  &.x-theme-button {
    &[disabled] {
      background-color: #fff;
      border-color: #ebeef5;
    }
  }

  &.x-theme-link, &.x-theme-text {
    &[disabled] {
      cursor: not-allowed;
      color: grey;
      background-color: transparent;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    color: grey;
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
