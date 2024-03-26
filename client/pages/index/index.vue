<template>
	<view class="container">
		<view class="container-content">
			<uni-card class="content-item" v-for="item in state.list" :key="item.name">
				<text class="content-name" @click="readPassager(item)">{{item.name}}</text>
			</uni-card>
		</view>
		<view class="container-footer">
			<view class="container-footer-left" @click="fromWechat">从微信导入</view>
			<!-- 			<uni-file-picker v-model="state.imageValue" fileMediatype="video" mode="grid" @select="select"
				@progress="progress" @success="success" @fail="fail" /> -->
			<view class="container-footer-right" @click="fromPhone">从手机导入</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	// 引入pdfjs-dist库
	// import * as pdfjsLib from 'pdfjs-dist';
	import { reactive } from "vue"
	import { onHide, onReady } from "@dcloudio/uni-app"
	const state = reactive({
		list: [],
		imageValue: []
	})
	onReady(() => {
		// 判断页面是否有缓存的数据，如果有就渲染出来，如果没有就算了
		const list = uni.getStorageSync("noval-list");
		console.log(list)
		if (list) {
			// 因为存储的时候是string类型，且JSON.Stringfy,所以这里需要这样一下哈
			state.list = JSON.parse(list);
			uni.request({
				//localhost也可以换成本地局域网ip地址,192.168.xxxx
				url: 'http://localhost:3000/list',
				data: {
					path: state.list[0].path
				},

				method: 'GET',
				success: (res) => {
					console.log(res.data);
				}
			})
		}
	})
	onHide(() => {
		uni.setStorageSync("noval-list", JSON.stringify(state.list));
	})

	// 获取上传状态
	const select = (e) => {
		console.log('选择文件：', e)
	}
	// 获取上传进度
	const progress = (e) => {
		console.log('上传进度：', e)
	}

	// 上传成功
	const success = (e) => {
		console.log('上传成功')
	}

	// 上传失败
	const fail = (e) => {
		console.log('上传失败：', e)
	}


	const readPassager = (item : any) => {
		uni.navigateTo({ url: "../read/index?options=" + JSON.stringify(item) });
	};

	const fromPhone = () => {
		let getFile = wx.getFileSystemManager()

		uni.chooseFile({
			success: (res) => {
				const filePath = res.tempFilePaths[0];
				// this.uploadFile(filePath);
			}
		});
	}

	const fromWechat = () => {
		wx.chooseMessageFile({
			count: 10,
			type: "file",
			extension: [".pdf", ".doc", ".docx"], // 只能选择pdf和doc文件
			async success(res) {
				if (state.list.length) {
					const tempList = [...state.list]
					state.list = [...tempList, ...res.tempFiles];
				} else {
					state.list = res.tempFiles;
				}
				console.log(state.list.length);
				for (let i = 0; i < state.list.length; i++) {
					console.log(state.list[i].path, state.list[i].path.indexOf('.docx'))
					if (state.list[i].path.indexOf('.docx') > -1 || state.list[i].path.indexOf('.doc') > -1) {
						console.log('ssuhjshdg')
						wx.getFileSystemManager().readFile({
							filePath: state.list[i].path,
							encoding: 'binary',
							success: (res) => {
								const arrayBuffer = res.data;
								const base64 = wx.arrayBufferToBase64(arrayBuffer as any);
								const html = `<div>${base64}</div>`;  // 将文件内容转换为 HTML 格式
								console.log(html)
							},
							fail: (err) => {
								console.error('读取文件失败', err);
							}
						});
					} else {
						// 设置PDF.js的worker路径
						// pdfjsLib.GlobalWorkerOptions.workerSrc = 'path/to/pdfjs.worker.js';
						// extractTextFromPDF(state.list[i].path);
					}
				}
				uni.showToast({
					title: "上传成功~"
				});
			},
			error(res) {
				console.log(res);
			}
		})
	}
	// 提取PDF文件中的文字
	function extractTextFromPDF(pdfUrl) {
		// 使用PDF.js加载PDF文件
		pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
			// 遍历每一页
			for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
				pdf.getPage(pageNum).then(function (page) {
					// 获取页面的文本内容
					page.getTextContent().then(function (textContent) {
						// 遍历页面的文本块
						textContent.items.forEach(function (textItem) {
							// 提取文字内容
							console.log(textItem.str);
						});
					});
				});
			}
		}).catch(function (error) {
			console.error('Error loading PDF: ' + error);
		});
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.container-footer {
		display: flex;
		align-items: center;
		// justify-content: space-around;
		position: absolute;
		bottom: 0px;
		border-top: 1px solid #9f9f9f;
		width: 100%;
		padding: 0 10px;

		.container-footer-left {
			color: #000000;
			text-align: center;
			padding: 10px 0;
			border-right: 1px solid #9f9f9f;
			flex: 0.5;
		}

		.container-footer-right {
			color: #000000;
			text-align: center;
			padding: 10px 0;
			flex: 0.5;
		}
	}
</style>