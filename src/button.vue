<template>
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
  import Icon from './icon'

export default {
  name: 'xButton',
  components: {
    'x-icon': Icon
  },
  props: {
    icon: {},
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

<style lang="scss">
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .x-button {
    font-size: var(--font-size);
    height: var(--button-height);
    padding: 0 1em;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background-color: var(--button-bg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    &:hover {
      border-color: var(--border-color-hover);
    }
    &:active {
     background-color: var(--button-active-bg);
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
      animation: spin 2s infinite linear;
    }
  }
</style>
