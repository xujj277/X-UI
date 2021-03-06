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
      // 要包含 span 和 offset
      if(!(['span', 'offset'].indexOf(key) >= 0)) {
        valid = false
      }
    })
    return valid
  }
  export default {
    name: 'xCol',
    props: {
      span: [Number, String],
      // 偏移多少，空隙
      offset: [Number, String],
      // 处理页面变化，响应式的变化
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
    methods: {
      createClasses (obj, str = '') {
        if (!obj) return []
        let array = []
        if (obj.span) {
          array.push(`col-${str}${obj.span}`)
        }
        if (obj.offset) {
          array.push(`offset-${str}${obj.offset}`)
        }
        return array
      }
    },
    computed: {
      /**
       * 实现 span 的功能
       * @returns {...*|Array[]}
       */
      colClass () {
        let {span, offset, ipad, narrowPc, pc, widePc} = this
        return [
          ...this.createClasses({span, offset}),
          ...this.createClasses(ipad, 'ipad-'),
          ...this.createClasses(narrowPc, 'narrow-pc-'),
          ...this.createClasses(pc, 'pc-'),
          ...this.createClasses(widePc, 'wide-pc-'),
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
    /* scss 的 for 循环*/
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
    @media (min-width: 577px) {
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
    @media (min-width: 768px) {
      $class-prefix: col-narrow-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-narrow-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    @media (min-width: 993px) {
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
      $class-prefix: col-wide-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-wide-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
  }
</style>
