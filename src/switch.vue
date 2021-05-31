<template>
  <div>
    <button class="x-switch"
            :class="{'x-checked': value, 'x-switch-wave': isWaveShow}"
            @click="toggle"
            :disabled="disabled"
            :style="{background: bgColor}"
    >
      <span></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'xSwitch',
  data () {
    return {
      isWaveShow: false,
      waveFn: undefined
    }
  },
  props: {
    value: {
      type: Boolean
    },
    activeColor: {
      type: String,
      default: 'blue'
    },
    inactiveColor: {
      type: String,
      default: 'grey'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isWaveAnimation: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.waveFn = this.createWaveAnimation(this.isWaveAnimation)
    this.waveFn.onCreate()
  },
  methods: {
    toggle () {
      this.$emit('update:value', !this.value)
      this.waveFn.onToggle()
    },
    createWaveAnimation (isWaveAnimation) {
      const _this = this
      if (!isWaveAnimation) {
        return {
          onCreate() {},
          onToggle() {},
        }
      }
      let style = document.createElement('style')
      return {
        onCreate () {
          document.getElementsByTagName('head')[0].appendChild(style)
        },
        onToggle () {
          _this.isWaveShow = true
          let keyframes = `
            @keyframes x-switch-pulse {\
              0% {\
                box-shadow: 0 0 0 0 ${!_this.value ? _this.activeColor : _this.inactiveColor};\
              }\
            }`
          style.innerHTML = keyframes
        }
      }
    }
  },
  computed: {
    bgColor () {
      return this.value ? this.activeColor : this.inactiveColor
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'var';
$h2: $button-height - 4px;
.x-switch {
  height: $button-height;
  width: $button-height*2;
  border: none;
  background: $grey;
  border-radius: $button-height/2;
  position: relative;
  cursor: pointer;
  
  &-wave {
    &::before {
      height: $button-height;
      width: $button-height*2;
      border: none;
      border-radius: $button-height/2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      box-shadow: 0 0 0 5px transparent;
      animation: x-switch-pulse 1s;
    }

    &:active::before {
      animation: none;
    }
  }
  
  &[disabled] {
    cursor: not-allowed;
    opacity: .6;
  }

  > span {
    position: absolute;
    top: 2px;
    left: 2px;
    height: $h2;
    width: $h2;
    background: white;
    border-radius: $h2 / 2;
    transition: left 250ms;
  }

  &.x-checked > span {
    left: calc(100% - #{$h2} - 2px);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: transparent;
    box-shadow: 0 0 5px 2.5px hsla(190, 20%, 91%, 0.4);
  }

  & + & {
    margin-left: 8px;
  }
}
</style>
