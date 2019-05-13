<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  let validator = (value) => {
    let keys = Object.keys(value)
    let valid = true
    keys.forEach(key => {
      if(!['span', 'offset'].includes(key)) {
        valid = false
      }
    })
    return valid
  }
  export default {
    name: 'xCol',
    props: {
      span: [Number, String],
      offset: [Number, String],
      narrowPc: { type: Object, validator },
      pc: { type: Object, validator },
      widePc: { type: Object, validator },
      ipad: { type: Object, validator },
    },
    data () {
      return {
        gutter: 0
      }
    },
    computed: {
      colClass () {
        let {span, offset, ipad, narrowPc, pc, widePc} = this
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`,
          ...(ipad ? [`col-ipad-${ipad.span}`] : []),
          ...(narrowPc ? [`col-narrowPc-${narrowPc.span}`] : []),
          ...(pc ? [`col-pc-${pc.span}`] : []),
          ...(widePc ? [`col-widePC-${widePc.span}`] : []),
        ]
      },
      colStyle () {
        return {
          paddingLeft: this.gutter/2 + 'px',
          paddingRight: this.gutter/2 + 'px'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .col {
    $class-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
    @media (min-width: 577px) and (max-width: 768px) {
      $class-prefix: col-ipad-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-ipad-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    @media (min-width: 768px) and (max-width: 992px) {
      $class-prefix: col-narrow-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-narrow-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    @media (min-width: 993px) and (max-width: 1200px) {
      $class-prefix: col-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    @media (min-width: 1201px) {
      $class-prefix: col-widePc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-widePc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
  }
</style>
