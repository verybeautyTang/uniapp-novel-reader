"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const state = common_vendor.reactive({
      title: "hello",
      list: [],
      image: ""
    });
    common_vendor.onMounted(() => {
      const list = common_vendor.index.getStorageSync("noval-list");
      if (list) {
        state.list = JSON.parse(list);
      }
    });
    common_vendor.onUnmounted(() => {
      if (state.list) {
        common_vendor.index.setStorageSync("noval-list", JSON.stringify(state.list));
      }
    });
    const fromPhone = () => {
      common_vendor.index.chooseFile({
        count: 10,
        type: "file",
        extension: [".pdf", ".doc", ".docx"],
        // 只能选择pdf和doc文件
        success(res) {
          console.log("成功嘿嘿");
        },
        error(res) {
          console.log(res);
        }
      });
    };
    const fromWechat = () => {
      common_vendor.wx$1.chooseMessageFile({
        count: 10,
        type: "file",
        extension: [".pdf", ".doc", ".docx"],
        // 只能选择pdf和doc文件
        success(res) {
          console.log("成功嘿嘿");
        },
        error(res) {
          console.log(res);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(state.title),
        b: common_vendor.o(fromWechat),
        c: common_vendor.o(fromPhone),
        d: state.image
      }, state.image ? {
        e: state.image
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/uniapp-novel-reader/client/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
