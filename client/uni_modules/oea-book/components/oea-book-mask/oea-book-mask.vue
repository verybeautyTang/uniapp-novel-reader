<template>
  <view class="oea-book-mask" :style="{ zIndex: zIndex, display: show ? '' : 'none' }" @click="emitBtn('click')"></view>
</template>

<script>
export default {
  name: 'oea-book-make',
  emits: ['click'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    emitBtn(emitName) {
      this.$emit(emitName);
    }
  }
};
</script>

<style scoped lang="scss">
.oea-book-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(97, 97, 93, 0.5);
}
</style>
