"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const state = common_vendor.reactive({
      list: [],
      imageValue: []
    });
    common_vendor.onReady(() => {
      const list = common_vendor.index.getStorageSync("noval-list");
      console.log(list);
      if (list) {
        state.list = JSON.parse(list);
        common_vendor.index.request({
          //localhost也可以换成本地局域网ip地址,192.168.xxxx
          url: "http://localhost:3000/list",
          data: {
            path: state.list[0].path
          },
          method: "GET",
          success: (res) => {
            console.log(res.data);
          }
        });
      }
    });
    common_vendor.onHide(() => {
      common_vendor.index.setStorageSync("noval-list", JSON.stringify(state.list));
    });
    const readPassager = (item) => {
      common_vendor.index.navigateTo({ url: "../read/index?options=" + JSON.stringify(item) });
    };
    const fromPhone = () => {
      common_vendor.wx$1.getFileSystemManager();
      common_vendor.index.chooseFile({
        success: (res) => {
          res.tempFilePaths[0];
        }
      });
    };
    const fromWechat = () => {
      common_vendor.wx$1.chooseMessageFile({
        count: 10,
        type: "file",
        extension: [".pdf", ".doc", ".docx"],
        // 只能选择pdf和doc文件
        async success(res) {
          if (state.list.length) {
            const tempList = [...state.list];
            state.list = [...tempList, ...res.tempFiles];
          } else {
            state.list = res.tempFiles;
          }
          console.log(state.list.length);
          for (let i = 0; i < state.list.length; i++) {
            console.log(state.list[i].path, state.list[i].path.indexOf(".docx"));
            if (state.list[i].path.indexOf(".docx") > -1 || state.list[i].path.indexOf(".doc") > -1) {
              console.log("ssuhjshdg");
              common_vendor.wx$1.getFileSystemManager().readFile({
                filePath: state.list[i].path,
                encoding: "binary",
                success: (res2) => {
                  const arrayBuffer = res2.data;
                  const base64 = common_vendor.wx$1.arrayBufferToBase64(arrayBuffer);
                  const html = `<div>${base64}</div>`;
                  console.log(html);
                },
                fail: (err) => {
                  console.error("读取文件失败", err);
                }
              });
            }
          }
          common_vendor.index.showToast({
            title: "上传成功~"
          });
        },
        error(res) {
          console.log(res);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.list, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(($event) => readPassager(item), item.name),
            c: item.name,
            d: "1cf27b2a-0-" + i0
          };
        }),
        b: common_vendor.o(fromWechat),
        c: common_vendor.o(fromPhone)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/happyelements/study/uniapp-novel-reader/client/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
