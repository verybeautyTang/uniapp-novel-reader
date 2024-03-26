"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const state = common_vendor.reactive({
      data: {
        name: "",
        path: ""
      }
    });
    common_vendor.onLoad((option) => {
      state.data = JSON.parse(option.options);
      common_vendor.index.setNavigationBarTitle({
        title: state.data.name
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.data
      }, state.data ? {
        b: state.data.path
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/happyelements/study/uniapp-novel-reader/client/pages/read/index.vue"]]);
wx.createPage(MiniProgramPage);
