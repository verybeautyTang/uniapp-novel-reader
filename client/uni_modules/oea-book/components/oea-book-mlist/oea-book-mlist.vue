<template>
  <view class="oea-book-mlist anmt" :style="{ height: height + 'px', bottom: show ? bottom + 'px' : bottom - height + 'px' }"><slot /></view>
</template>

<script>
export default {
  name: 'oea-book-mlist',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 200
    },
    testConfig: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.anmt {
  transition: all 0.1s;
}

.oea-book-mlist {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
