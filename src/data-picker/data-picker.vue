<template>
  <div class="x-date-picker" style="border: 1px solid red;" ref="wrapper">
    <x-popover position="bottom" :container="popoverContainer">
      <x-input type="text" :value="formattedValue"></x-input>
      <template slot="content">
        <div class="x-date-picker-pop" @selectstart.prevent>
          <div class="x-date-picker-nav">
            <span :class="c('preYear', 'navItem')" @click="onClickPrevYear">
              <x-icon name="leftleft"></x-icon>
            </span>
            <span :class="c('preMonth', 'navItem')" @click="onClickPrevMonth">
              <x-icon name="left"></x-icon>
            </span>
            <span :class="c('yearAndMonth')" @click="onClickMonth">
              <span>{{ display.year }}年</span>
              <span>{{ display.month + 1 }}月</span>
            </span>
            <span :class="c('nextMonth', 'navItem')" @click="onClickNextMonth">
              <x-icon name="right"></x-icon>
            </span>
            <span :class="c('nextYear', 'navItem')" @click="onClickNextYear">
              <x-icon name="rightright"></x-icon>
            </span>
          </div>
          <div class="x-date-picker-panels">
            <div class="x-date-picker-content">
              <template v-if="mode === 'month'">
                <div :class="c('selectMonth')">选择年和月</div>
              </template>
              <template v-else>
                <div :class="c('weekdays')">
                <span :class="c('weekday')" v-for="i in [1,2,3,4,5,6,0]" :key="i">
                  {{ weekdays[i] }}
                </span>
                </div>
                <div :class="c('row')" v-for="i in helper.range(1, 7)" :key="i">
                <span :class="[c('cell'), {
                  currentMonth: isCurrentMonth(getVisibleDay(i, j)),
                  selected: isSelected(getVisibleDay(i, j)),
                  today: isToday(getVisibleDay(i, j))
                }]"
                      v-for="j in helper.range(1, 8)"
                      :key="j"
                      @click="onClickCell(getVisibleDay(i, j))"
                >
                  {{ getVisibleDay(i, j).getDate() }}
                </span>
                </div>
              </template>
            </div>
          </div>
          <div class="x-date-picker-actions">
            <x-button @click="onClickToday">今天</x-button>
            <x-button @click="onClickClear">清除</x-button>
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
import XButton from '../button/button'

export default {
  name: 'XDataPicker',
  components: { XInput, XIcon, XPopover, XButton },
  directives: { ClickOutside },
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    value: {
      type: Date,
    },
  },
  data () {
    const [year, month] = helper.getYearMonthDate(this.value || new Date())
    return {
      mode: 'days',
      helper: helper,
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      popoverContainer: null,
      display: { year, month },
    }
  },
  mounted () {
    this.popoverContainer = this.$refs.wrapper
  },
  methods: {
    c (...classNames) {
      return classNames.map(className => `x-date-picker-${className}`)
    },
    onClickYears () {
      this.mode = 'years'
    },
    onClickMonth () {
      if (this.mode !== 'month') {
        this.mode = 'month'
      } else {
        this.mode = 'day'
      }
    },
    onClickCell (date) {
      if (this.isCurrentMonth(date)) {
        this.$emit('input', date)
      }
    },
    getVisibleDay (row, col) {
      return this.visibleDays[(row - 1) * 7 + col - 1]
    },
    isCurrentMonth (date) {
      const [year1, month1] = helper.getYearMonthDate(date)
      return year1 === this.display.year && month1 === this.display.month
    },
    isSelected (date) {
      if (!this.value) {return false}
      let [y, m, d] = helper.getYearMonthDate(date)
      let [y2, m2, d2] = helper.getYearMonthDate(this.value)
      return y === y2 && m === m2 && d === d2
    },
    isToday (date) {
      let [y, m, d] = helper.getYearMonthDate(date)
      let [y2, m2, d2] = helper.getYearMonthDate(new Date())
      return y === y2 && m === m2 && d === d2
    },
    onClickPrevYear () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addYear(oldDate, -1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
    onClickPrevMonth () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addMonth(oldDate, -1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
    onClickNextMonth () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addMonth(oldDate, 1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
    onClickNextYear () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addYear(oldDate, 1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
    onClickToday () {
      const now = new Date()
      const [year, month, day] = helper.getYearMonthDate(now)
      this.display = { year, month }
      this.$emit('input', new Date(year, month, day))
    },
    onClickClear () {
      this.$emit('input', undefined)
    }
  },
  computed: {
    visibleDays () {
      const date = new Date(this.display.year, this.display.month, 1)
      const first = helper.firstDayOfMonth(date)
      const last = helper.lastDayOfMonth(date)
      const [year, month, day] = helper.getYearMonthDate(date)
      let array = []
      let n = first.getDay()
      let x = first - (n === 0 ? 6 : n - 1) * 3600 * 24 * 1000
      for (let i = 0; i < 42; i++) {
        array.push(new Date(x + i * 3600 * 24 * 1000))
      }
      return array
    },
    formattedValue () {
      if (!this.value) {return ''}
      const [year, month, day] = helper.getYearMonthDate(this.value)
      return `${year}-${month + 1}-${day}`
    },
  },
}
</script>

<style lang='scss' scoped>
@import "var";

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
    cursor: not-allowed;
    border-radius: $border-radius;

    &.currentMonth {
      color: black;
      &:hover {
        background: $blue;
        cursor: pointer;
        color: white;
      }
    }
    &.selected {
      border: 1px solid $blue;
    }
    &.today {
      background: $grey;
    }
  }

  &-yearAndMonth {
    margin: auto;
  }

  &-nav {
    display: flex;
  }
  
  &-selectMonth {
    width: 224px;
    height: 224px;
  }
  
  &-actions {
    padding: 8px;
    text-align: right;
  } 
}
</style>
