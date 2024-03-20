<template>
  <view
    class="oea-book anmt"
    :style="{ maxWidth: width + 'px', minHeight: minHeight + 'px', backgroundColor: cfg.pageBg, color: cfg.color, top: customNavBar ? navBarHeight : '0' }"
  >
    <!-- 状态栏 1 -->
    <view class="state_top" :style="{ backgroundColor: cfg.pageBg, top: _navBar || customNavBar ? navBarHeight : '0' }">
      <view class="h-5">{{ title }}</view>
      <view class="h-5 end">
        <slot name="state_right_top">
          <view @click="menu_show = !menu_show">{{ test.menu_title }}</view>
        </slot>
      </view>
    </view>
    <!-- 状态栏 2 -->
    <view class="state_bottom" :style="{ backgroundColor: cfg.pageBg }">
      <view class="h-5">
        <slot name="state_bottom_left">{{ test.phone_state }}</slot>
      </view>
      <view class="h-5 end">
        <slot name="state_bottom_right">{{ test.article_state }}</slot>
      </view>
    </view>
    <!-- menu -->
    <oea-book-menu :mlist_height="menu_more_height" :show="menu_show" @cfgChange="upDateConfig" @closeMenu="closeMenu" :zIndex="50" @listClick="emitBtn('listClick')">
      <template v-slot:mlist>
        <view class="oea-book_mlist" :style="{ height: menu_more_height + 'px' }">
          <!-- icon btn -->
          <view class="oea-book_mlist_btn">
            <view
              class="oea-book_mlist_btn_item"
              v-for="(item, index) in menu_more_data.btnList"
              :key="index"
              :style="{ display: item.show ? '' : 'none', width: 100 / menu_more_data.btnList.length + '%' }"
            >
              <view @click="emitBtn(item.emit, item.emitData)">
                <view style="text-align: center;"><oea-book-icon :name="item.icon" size="20"></oea-book-icon></view>
                <view style="text-align: center;padding-top: 4px;">{{ item.text }}</view>
              </view>
            </view>
          </view>
          <!-- switch btn -->
          <view class="oea-book_mlist_switch_box">
            <view class="oea-book_mlist_switch_box_item">
              <view class="h-5 flex">
                <view class="h-6 text">格式化</view>
                <view class="h-4 end">
                  <switch
                    :disabled="_data == null"
                    :checked="data_decode"
                    @change="data_decode = !data_decode"
                    :color="cfg.mlistSwitchActiveColor"
                    style="transform:scale(0.7)"
                  ></switch>
                </view>
              </view>
              <view class="h-5 flex">
                <view class="h-6 text">去导航栏</view>
                <view class="h-4 end">
                  <switch :disabled="!delete_navBar_state" @change="delete_navBar" :color="cfg.mlistSwitchActiveColor" style="transform:scale(0.7)"></switch>
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </oea-book-menu>
    <oea-book-mask :show="menu_show" :zIndex="10" @click="_maskClick"></oea-book-mask>

    <!-- 内容 -->
    <view class="oea-book_c" style="word-break: break-all;" :style="{ minHeight: height - 40 + 'px', lineHeight: cfg.lineHeight + 'px', fontSize: cfg.fontSize + 'px', zIndex: 1 }">
      <slot v-if="_data == null"></slot>
      <text v-if="_data != null && data_decode" :decode="data_decode" space="ensp">{{ _data }}</text>
      <view v-if="_data != null && !data_decode">{{ _data }}</view>
    </view>
  </view>
</template>

<script>
/**
 * oea-book
 *
 * @description 小说页面模板 手机页面模板
 * @property {String} title 文章标题
 * @property {String} pageTitle 页面标题
 * @property {Boolean} maskClick = [true|false] Mask 点击是否有效
 * @property {Boolean} navBar = [true|false] 原生导航栏标志
 * @property {Boolean} customNavBar = [true|false] 自定义导航栏标志
 * @property {String} navBarHeight 导航栏高度 String
 *
 */

import m_list from '../../utils/config/oea-book-mlist-config.js';

export default {
  name: 'oea-book',
  emits: ['navigationBarConfig', 'listClick', 'deleteNavBar', 'open', 'openFile'],
  props: {
    title: {
      type: String,
      default: ''
    },
    pageTitle: {
      type: String,
      default: ''
    },
    data: {
      type: [Object, String, Number],
      default: null
    },
    data_decode: {
      type: Boolean,
      default: false
    },
    maskClick: {
      type: Boolean,
      default: true
    },
    // 有导航栏的话，请开启这个 （h5可以自动检测）
    navBar: {
      type: Boolean,
      default: false
    },
    // 有自定义导航栏的话，请开启这个
    customNavBar: {
      type: Boolean,
      default: false
    },
    // 导航栏的高度, 原生导航栏 高度为 44px
    navBarHeight: {
      type: String,
      default: '44px'
    }
  },
  computed: {
    minHeight() {
      if (this.customNavBar) {
        return this.height - this.remove_px(this.navBarHeight);
      } else {
        return this.height;
      }
    }
  },
  data() {
    return {
      _data: this.data,
      menu_show: false,
      menu_more_height: 120, // 更多菜单 的内容高度
      menu_more_data: m_list,
      sysInfo: uni.getSystemInfoSync(),
      _navBar: this.navBar,
      delete_navBar_temp: '',
      delete_navBar_state: false,
      width: 0,
      height: 0,
      navigationBarbackgroundColor: '#ffffff',
      navigationBarFrontColor: '#000000',

      cfg: {
        pageBg: '#fff'
      },

      test: {
        menu_title: '菜单',
        article_state: '文章状态',
        phone_state: '手机状态'
      }
    };
  },
  mounted() {
    // #ifdef H5
    // 自动检测是否存在导航栏，当前仅适用于 H5 ，其它待测试
    if (!this._navBar) {
      if (document.querySelector('uni-page-head')) this._navBar = true;
      else this._navBar = false;
    }
    // 当 原生导航栏 或 自定义导航栏存在的时候 可以删除导航
    if (this._navBar || this.customNavBar) this.delete_navBar_state = true;

    // #endif

    this.width = this.sysInfo.windowWidth;
    if (this._navBar) this.height = this.sysInfo.windowHeight;
    else this.height = this.sysInfo.screenHeight;

    this.upNavigationBarColor();
    this.upNavigationBarTitle();
  },
  watch: {
    pageTitle() {
      this.upNavigationBarTitle()
    },
    data() {
      this._data = this.data;
    },
    navigationBarFrontColor() {
      // 原生导航栏 自动随主题改变，非原生导航栏则创建事件
      if (!this.customNavBar || this._navBar) this.upNavigationBarColor();
      else
        this.emitBtn('navigationBarConfig', {
          navigationBarbackgroundColor: this.navigationBarbackgroundColor,
          navigationBarFrontColor: this.navigationBarFrontColor
        });
    }
  },
  methods: {
    log(e) {
      if (process.env.NODE_ENV === 'development') console.log(e);
    },

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓ mlist
    delete_navBar(e) {
      let del = e.detail.value;
      // 自定义导航栏
      if (this.customNavBar) {
        this.emitBtn('deleteNavBar', { hide: del });
        return;
      }
      // #ifdef H5
      // 删除原生导航栏
      if (this._navBar && del && this.delete_navBar_temp == '') {
        this.delete_navBar_temp = 'none';
        this._navBar = false;
        this.height = this.sysInfo.screenHeight;
        document.getElementsByTagName('uni-page-head')[0].style.display = 'none';
      }
      // 恢复原生导航栏
      if (!del && this.delete_navBar_temp == 'none') {
        this.delete_navBar_temp = '';
        this._navBar = true;
        this.height = this.sysInfo.windowHeight;
        document.getElementsByTagName('uni-page-head')[0].style.display = '';
      }
      // #endif
    },

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓ menu
    _maskClick() {
      if (this.maskClick) {
        if (this.menu_show) this.menu_show = false;
      }
    },
    emitBtn(emitName, data = null) {
      this.log(emitName, data);
      if (data) this.$emit(emitName, data);
      else this.$emit(emitName);
    },
    closeMenu(e) {
      this.menu_show = e.show;
      this.upDateConfig(e);
    },
    upDateConfig(e) {
      this.log(e);
      this.cfg = e.cfg;
      this.navigationBarbackgroundColor = this.cfg.navigationBarbackgroundColor;
      this.navigationBarFrontColor = this.cfg.navigationBarFrontColor;
    },
    upNavigationBarColor() {
      uni.setNavigationBarColor({
        backgroundColor: this.navigationBarbackgroundColor,
        frontColor: this.navigationBarFrontColor
      });
    },
    upNavigationBarTitle() {
      if (this.pageTitle) {
        uni.setNavigationBarTitle({
          title: this.pageTitle
        });
      }
    },
    remove_px(str, m = 'number') {
      if (typeof str == 'string') {
        if (m == 'number') return Number(str.substr(0, str.length - 2));
        if (m == '-') return 0 - Number(str.substr(0, str.length - 2)) + 'px';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.anmt {
  transition: all 0.5s;
}

.oea-book {
  position: relative;
  &_c {
    padding: 18px 8px 18px 8px;
  }

  &_mlist {
    // btn
    &_btn {
      display: flex;

      &_item {
        width: 20%;
        height: 80px;
        display: flex;
        font-size: 14px;
        justify-content: center;
        align-items: center;
      }
    }

    // switch
    &_switch_box {
      width: 100%;
      position: absolute;
      bottom: 5px;
      &_item {
        height: 35px;
        display: flex;
        align-items: center;
      }
    }
  }
}

.state {
  &_top {
    display: flex;
    height: 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  &_bottom {
    display: flex;
    height: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.text {
  padding-left: 12px;
}
.flex {
  display: flex;
  align-items: center;
}
.h-5 {
  width: 50%;
}
.h-6 {
  width: 60%;
}
.h-4 {
  width: 40%;
}
.h-3 {
  width: 33.33%;
}
.end {
  display: flex;
  justify-content: flex-end;
}
</style>
