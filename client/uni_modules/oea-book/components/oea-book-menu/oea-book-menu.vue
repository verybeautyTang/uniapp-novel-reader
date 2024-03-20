<template>
  <view class="oea-book-menu anmt" :style="{ bottom: show ? '0' : hide_menuH(menuStyleConfig.height, '-'), zIndex: zIndex - 10 }">
    <oea-book-mlist
      :height="mlist_height"
      :style="{ color: menuStyleConfig.color, backgroundColor: menuStyleColor.bgColor, zIndex: zIndex - 10 }"
      :bottom="hide_menuH(menuStyleConfig.height)"
      :show="mlist_show"
    >
      <slot name="mlist">
        <view>
          <view>自定义菜单项目</view>
          <view>
            需要设置 参数 mlist_height
            <br />
            使用 slot 槽名为 mlist 使用
          </view>
        </view>
      </slot>
    </oea-book-mlist>
  </view>
  <view class="oea-book-menu anmt" :style="[menuStyleConfig, { bottom: show ? '0' : hide_menuH(menuStyleConfig.height, '-'), zIndex: zIndex }]">
    <!-- title -->
    <view class="oea-book-menu_title">
      <view class="oea-book-menu_title_cancelBtn">
        <view class="oea-book-menu_title_cancelBtn_btnBox">
          <oea-book-icon class="oea-book-menu_btn_item_icon" name="cancel" :size="menuStyleColor.titleIconSize" @click="cancel"></oea-book-icon>
        </view>
      </view>
      <view class="oea-book-menu_title_c">{{ _t('title') }}</view>
      <view class="oea-book-menu_title_saveBtn">
        <view class="oea-book-menu_title_saveBtn_btnBox">
          <oea-book-icon class="oea-book-menu_btn_item_icon" name="save" :size="menuStyleColor.titleIconSize" @click="saveConfigToStorage"></oea-book-icon>
        </view>
      </view>
    </view>
    <view :style="{ backgroundColor: menuStyleColor.bgColor }">
      <!-- size -->
      <view class="oea-book-menu_size">
        <view class="oea-book-menu_size_box">
          <view class="oea-book-menu_size_box_text">字体</view>
          <slider
            class="oea-book-menu_size_box_slider"
            :value="_cfg.fontSize"
            :min="_cfg.minFontSize"
            :max="_cfg.maxFontSize"
            @change="changeFontSize"
            @changing="changeFontSize"
            :activeColor="menuStyleColor.blockActiveColor"
            :backgroundColor="menuStyleColor.blockBackgroundColor"
            :block-color="menuStyleColor.blockColor"
            block-size="15"
          />
        </view>
        <view class="oea-book-menu_size_box">
          <view class="oea-book-menu_size_box_text">间距</view>
          <slider
            class="oea-book-menu_size_box_slider"
            :value="_cfg.lineHeight"
            :min="_cfg.minLineHeight"
            :max="_cfg.maxLineHeight"
            @change="changeLineHeight"
            @changing="changeLineHeight"
            :activeColor="menuStyleColor.blockActiveColor"
            :backgroundColor="menuStyleColor.blockBackgroundColor"
            :block-color="menuStyleColor.blockColor"
            block-size="15"
          />
        </view>
      </view>
      <!-- background -->
      <view class="oea-book-menu_background">
        <view class="oea-book-menu_background_title">背景</view>
        <view class="oea-book-menu_background_list">
          <view v-for="(item, index) in themeList" :key="index">
            <view v-if="item.name != 'night' && item.name != 'eye'" class="oea-book-menu_background_list_box" @click="themeChange(item)">
              <view
                :style="{ borderColor: _cfg.theme == item.name ? item.menuBorderActiveColor : item.bgColor, backgroundColor: item.bgColor }"
                class="oea-book-menu_background_list_box_color"
              ></view>
            </view>
          </view>
        </view>
      </view>
      <!-- icon btn -->
      <view class="oea-book-menu_btn">
        <view class="oea-book-menu_btn_item" :style="[item_width]">
          <view @click="emitBtn('listClick')">
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view class="oea-book-menu_btn_item_iconBox"><oea-book-icon class="oea-book-menu_btn_item_icon" name="list"></oea-book-icon></view>
            </view>
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view>{{ _t('list_btn_text') }}</view>
            </view>
          </view>
        </view>
        <view v-if="menuStyleColor.theme != 'night'" class="oea-book-menu_btn_item" :style="[item_width]">
          <view @click="themeListMap('night')">
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view class="oea-book-menu_btn_item_iconBox"><oea-book-icon class="oea-book-menu_btn_item_icon" name="month"></oea-book-icon></view>
            </view>
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view>{{ _t('night_btn_text') }}</view>
            </view>
          </view>
        </view>
        <view v-else class="oea-book-menu_btn_item" :style="[item_width]">
          <view @click="themeListMap('default')">
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view class="oea-book-menu_btn_item_iconBox"><oea-book-icon class="oea-book-menu_btn_item_icon" name="sun"></oea-book-icon></view>
            </view>
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view>{{ _t('day_btn_text') }}</view>
            </view>
          </view>
        </view>
        <view class="oea-book-menu_btn_item" :style="[item_width]">
          <view @click="themeListMap('eye')">
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view class="oea-book-menu_btn_item_iconBox"><oea-book-icon class="oea-book-menu_btn_item_icon" name="eye"></oea-book-icon></view>
            </view>
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view>{{ _t('eye_btn_text') }}</view>
            </view>
          </view>
        </view>
        <view class="oea-book-menu_btn_item" v-if="mlist_height > 0">
          <view @click="mlist_show = !mlist_show">
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view class="oea-book-menu_btn_item_iconBox"><oea-book-icon class="oea-book-menu_btn_item_icon" name="set"></oea-book-icon></view>
            </view>
            <view style="width: 100%; display: flex; justify-content: center; margin-bottom: 3px;">
              <view>{{ _t('more_btn_text') }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { initVueI18n } from '@dcloudio/uni-i18n';
import messages from '../../utils/i18n/index.js';
const { t } = initVueI18n(messages);

import menuCFG from '../../utils/config/oea-book-menu-config.js';

const storage_key = menuCFG.storage_key;

/**
 * oea-book-menu
 *
 * @description 菜单
 * @property {Boolean} show = [true|false] 是否显示
 *  @value true 显示
 *  @value false 不显示
 * @property {Number} zIndex
 * @property {Number} mlist_height 需要设置 参数 mlist_height。<br> 使用 slot 槽名为 mlist 使用。<br><br>\<template v-slot:mlist\><br>内容<br>\</template\>
 *
 */
export default {
  name: 'oea-book-menu',
  emits: ['closeMenu', 'cfgChange', 'listClick'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 50
    },
    mlist_height: {
      type: Number,
      default: 0
    },
    testConfig: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      if (this.mlist_show) this.mlist_show = false;
    }
  },
  computed: {
    list_btn_text() {
      return t('oea-book-menu.list_btn_text');
    },
    item_width() {
      if (this.mlist_height > 0) {
        return { width: '25%' };
      } else {
        return { width: '33.33%' };
      }
    }
  },
  data() {
    return {
      themeList: menuCFG.theme.list,
      _cfg: menuCFG.cfg,
      menuStyleConfig: menuCFG.menuStyleConfig,
      menuStyleColor: menuCFG.menuStyleColor,
      mlist_show: false
    };
  },
  mounted() {
    let data = uni.getStorageSync(storage_key);
    if (this.testConfig) data = null;
    if (data) {
      this.menuStyleConfig = data.menuStyleConfig;
      this.menuStyleColor = data.menuStyleColor;
      this._cfg = data.cfg;
    } else {
      uni.setStorageSync(storage_key, {
        menuStyleConfig: menuCFG.menuStyleConfig,
        menuStyleColor: menuCFG.menuStyleColor,
        cfg: menuCFG._cfg
      });
    }
    this.upDateConfig('cfgChange', false);
  },
  methods: {
    emitBtn(emitName) {
      this.$emit(emitName);
    },
    _t(text_name) {
      let str = 'oea-book-menu.' + text_name;
      return t(str);
    },
    hide_menuH(str, m = 'number') {
      if (typeof str == 'string') {
        if (m == 'number') return Number(str.substr(0, str.length - 2));
        if (m == '-') return 0 - Number(str.substr(0, str.length - 2)) + 'px';
      }
    },
    saveConfigToStorage() {
      if (this.show) {
        uni.setStorageSync(storage_key, {
          menuStyleConfig: this.menuStyleConfig,
          menuStyleColor: this.menuStyleColor,
          cfg: this._cfg
        });
        this.upDateConfig('closeMenu', false);
      }
    },
    cancel() {
      if (this.show) {
        let data = uni.getStorageSync(storage_key);
        if (data) {
          this.menuStyleConfig = data.menuStyleConfig;
          this.menuStyleColor = data.menuStyleColor;
          this._cfg = data.cfg;
        }
        this.upDateConfig('closeMenu', false);
      }
    },
    changeFontSize(e) {
      this._cfg.fontSize = e.detail.value;
      this._cfg.lineHeight = this._cfg.fontSize + 8;
      this.upDateConfig();
    },
    changeLineHeight(e) {
      if (this._cfg.fontSize < e.detail.value - 8) {
        this._cfg.lineHeight = e.detail.value;
        this.upDateConfig();
      }
    },
    themeListMap(name) {
      let theme = null;
      menuCFG.theme.list.map(d => {
        if (d.name == name) theme = d;
      });
      this.themeChange(theme);
    },
    themeChange(theme) {
      if (theme) {
        if (this._cfg.theme != theme.name) {
          this._cfg.theme = theme.name;
          this._cfg.pageBg = theme.bgColor;
          this._cfg.color = theme.color;

          this._cfg.navigationBarbackgroundColor = theme.navigationBarbackgroundColor;
          this._cfg.navigationBarFrontColor = theme.navigationBarFrontColor;

          this._cfg.mlistSwitchActiveColor = theme.menuBlockActiveColor;

          this.menuStyleColor.theme = theme.name;
          this.menuStyleColor.bgColor = theme.menuBgColor2;
          this.menuStyleColor.blockColor = theme.menuBlockColor;
          this.menuStyleColor.blockActiveColor = theme.menuBlockActiveColor;
          this.menuStyleColor.blockBackgroundColor = theme.menuBlockBackgroundColor;
          this.menuStyleColor.borderActiveColor = theme.menuBorderActiveColor;

          this.menuStyleConfig.color = theme.menuColor;
          this.menuStyleConfig.backgroundColor = theme.menuBgColor1;
          this.upDateConfig();
        }
      }
    },
    upDateConfig(emit = 'cfgChange', show = true) {
      if (!this._cfg) {
        this._cfg = menuCFG.cfg;
        this.menuStyleConfig = menuCFG.menuStyleConfig;
        uni.setStorageSync(storage_key, {
          menuStyleConfig: this.menuStyleConfig,
          menuStyleColor: this.menuStyleColor,
          cfg: this._cfg
        });
      }
      this.$emit(emit, { show: show, cfg: this._cfg });
    }
  }
};
</script>

<style lang="scss" scoped>
// @import url('../../utils/icon/iconfont.css');

.anmt {
  transition: all 0.5s;
}
.oea-book-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;

  &_title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 18px;

    &_icon {
      font-size: 25px;
    }

    &_cancelBtn {
      width: 20%;
      &_btnBox {
        width: 25px;
        height: 25px;
        margin-left: 8px;
      }
    }
    &_c {
      width: 60%;
      font-weight: bold;
      text-align: center;
    }
    &_saveBtn {
      width: 20%;
      display: flex;
      justify-content: flex-end;
      &_btnBox {
        width: 25px;
        height: 25px;
        margin-right: 8px;
      }
    }
  }

  &_size {
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 50px;

    &_box {
      width: 50%;
      display: flex;
      &_text {
        width: 30%;
        display: flex;
        align-items: center;
        padding-left: 22px;
      }
      &_slider {
        width: 70%;
      }
    }
  }
  &_background {
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 50px;
    &_title {
      width: 15%;
      padding-left: 22px;
    }
    &_list {
      width: 85%;
      display: flex;
      &_box {
        padding: 5px 5px 5px 5px;
        &_color {
          width: 35px;
          height: 30px;
          border-radius: 8px;
          border-style: solid;
          border-width: 1px;
        }
      }
    }
  }

  &_btn {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-top: 10px;
    &_item {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      &_iconBox {
        width: 25px;
        height: 25px;
      }
      &_icon {
        font-size: 25px;
      }
    }
  }
}
</style>
