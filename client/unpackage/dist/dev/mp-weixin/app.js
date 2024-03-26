"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/read/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/happyelements/study/uniapp-novel-reader/client/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
