<template>
  <button class="x-button" :class="{[`icon-${iconPosition}`]: iconPosition}"
          @click="$emit('click')">
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
  },
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
