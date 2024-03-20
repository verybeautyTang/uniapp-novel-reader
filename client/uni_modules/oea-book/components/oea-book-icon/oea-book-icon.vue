<template>
  <view v-if="name" class="iconfont" :class="'icon-book-' + name" :style="[_size, _color]"></view>
</template>

<script>
export default {
  name: 'oea-book-icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    _size() {
      if (this.size != 0) {
        if (typeof this.size == 'number') {
          return {
            fontSize: this.size + 'px'
          };
        } else if (typeof this.size == 'string') {
          if (this.size.indexOf('px') > 0)
            return {
              fontSize: this.size
            };
          else {
            return {
              fontSize: this.size + 'px'
            };
          }
        }
      }
    },
    _color() {
      if (this.color != '') {
        return {
          color: this.color
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import url('../../utils/icon/iconfont.css');
</style>
