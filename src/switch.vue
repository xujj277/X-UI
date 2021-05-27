<template>
  <div>
    <button :class="{checked: value}" @click="toggle"><span></span></button>
  </div>
</template>

<script>
export default {
  name: 'xSwitch',
  props: {
    value: {
      type: Boolean
    }
  },
  methods: {
    toggle () {
      this.$emit('update:value', !this.value)
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'var';
$h2: $button-height - 4px;
button {
  height: $button-height;
  width: $button-height*2;
  border: none;
  background: $grey;
  border-radius: $button-height/2;
  position: relative;
}

span {
  position: absolute;
  top: 2px;
  left: 2px;
  height: $h2;
  width: $h2;
  background: #fff;
  border-radius: $h2 / 2;
  transition: left 250ms;
}

button.checked {
  background: $blue;
}

button.checked > span {
  left: calc(100% - #{$h2} - 2px);
}

button:focus {
  outline: none;
}
</style>
