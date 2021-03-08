<template>
  <div class="x-date-picker" style="border: 1px solid red;" ref="wrapper">
    <x-popover position="bottom" :container="x">
      <x-input type="text" :value="formattedValue"></x-input>
      <template slot="content">
        <div class="x-date-picker-pop">
          <div class="x-date-picker-nav">
            <span :class="c('preYear', 'navItem')"><x-icon name="leftleft"></x-icon></span>
            <span :class="c('preMonth', 'navItem')"><x-icon name="left"></x-icon></span>
            <span :class="c('yearAndMonth')">
              <span @click="onClickYears">2020年</span>
              <span @click="onClickMonth">8月</span>
            </span>
            <span :class="c('nextMonth', 'navItem')"><x-icon name="right"></x-icon></span>
            <span :class="c('nextYear', 'navItem')"><x-icon name="rightright"></x-icon></span>
          </div>
          <div class="x-date-picker-panels">
            <div v-if="mode === 'years'" class="x-date-picker-content">年</div>
            <div v-else-if="mode === 'months'" class="x-date-picker-content">月</div>
            <div v-else class="x-date-picker-content">
              <div :class="c('weekdays')">
                <span :class="c('weekday')" v-for="i in [1,2,3,4,5,6,0]" :key="i">
                  {{ weekdays[i] }}
                </span>
              </div>
              <div :class="c('row')" v-for="i in helper.range(1, 7)" :key="i">
                <span :class="[c('cell'), {currentMonth: isCurrentMonth(getVisibleDay(i, j))}]"
                      v-for="j in helper.range(1, 8)"
                      :key="j"
                      @click="onClickCell(getVisibleDay(i, j))"
                >
                  {{ getVisibleDay(i, j).getDate() }}
                </span>
              </div>
            </div>
          </div>
          <div class="x-date-picker-actions">
            <button>清除</button>
          </div>
        </div>
      </template>
    </x-popover>
  </div>
</template>

<script>
import helper from '@/data-picker/helper'
import XInput from '@/input'
import XIcon from '../icon'
import XPopover from '../popover'
import ClickOutside from '../click-outside'

export default {
  name: 'XDataPicker',
  components: { XInput, XIcon, XPopover },
  directives: { ClickOutside },
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    return {
      mode: 'days',
      helper: helper,
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      x: null,
    }
  },
  mounted () {
    this.x = this.$refs.wrapper
  },
  methods: {
    c (...classNames) {
      return classNames.map(className => `x-date-picker-${className}`)
    },
    onBlurInput () {
      console.log(1)
    },
    onFocusInput () {
      console.log(2)
    },
    onClickYears () {

    },
    onClickMonth () {},
    onClickCell (date) {
      if (this.isCurrentMonth(date)) {
        this.$emit('input', date)
      }
    },
    getVisibleDay (row, col) {
      return this.visibleDays[(row - 1) * 7 + col - 1]
    },
    isCurrentMonth (date) {
      const [year1, month1] = helper.getYearMonthDay(date)
      const [year2, month2] = helper.getYearMonthDay(this.value)
      return year1 === year2 && month1 === month2
    }
  },
  computed: {
    visibleDays () {
      const date = this.value
      const first = helper.firstDayOfMonth(date)
      const last = helper.lastDayOfMonth(date)
      let array = []
      const [year, month, day] = helper.getYearMonthDay(date)
      let n = first.getDay()
      let x = first - (n === 0 ? 6 : n - 1) * 3600 * 24 * 1000
      for (let i = 0; i < 42; i++) {
        array.push(new Date(x + i * 3600 * 24 * 1000))
      }
      return array
    },
    formattedValue () {
      const [year, month, day] = helper.getYearMonthDay(this.value)
      return `${year}-${month+1}-${day}`
    }
  },
}
</script>

<style lang='scss' scoped>
.x-date-picker {

  &-popWrapper {
    padding: 0;
  }

  ::v-deep .x-popover-content-wrapper {
    padding: 0;
  }

  &-cell, &-weekday, &-navItem {
    width: 32px;
    height: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  
  &-cell {
    color: grey;
    
    &.currentMonth {
      color: black;
    }
  }

  &-yearAndMonth {
    margin: auto;
  }

  &-nav {
    display: flex;
  }
}
</style>
