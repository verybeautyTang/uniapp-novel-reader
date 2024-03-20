<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{state.title}}</text>
		</view>
		<view @click="fromWechat">从微信导入</view>
		<view @click="fromPhone">从手机导入</view>
		<image v-if="state.image" :src="state.image" />
	</view>
</template>

<script lang="ts" setup>
	import { reactive, onMounted, onUnmounted } from 'vue'
	const state = reactive({
		title: 'hello',
		list: [],
		image: '',
	})
	onMounted(() => {
		// 判断页面是否有缓存的数据，如果有就渲染出来，如果没有就算了
		const list = uni.getStorageSync('noval-list');
		if (list) {
			// 因为存储的时候是string类型，且JSON.Stringfy,所以这里需要这样一下哈
			state.list = JSON.parse(list)
		}
	})
	onUnmounted(() => {
		// 这里缓存数据【防止数据丢失的情况】
		if (state.list) {
			uni.setStorageSync('noval-list', JSON.stringify(state.list));
		}
	})

	const fromPhone = () => {
		// uni.showToast({
		// 	title: '我是从手机导入',
		// 	duration: 2000
		// })
		// 看这个后续。谢谢
		// https://blog.csdn.net/weixin_44133004/article/details/121118162
		// 语音合成:https://www.php.cn/faq/572531.html
		// 语音播放： https://uniapp.dcloud.net.cn/api/media/audio-context.html#createinneraudiocontext
		uni.chooseFile({
			count: 10,
			type: 'file',
			extension: ['.pdf', '.doc', '.docx'], // 只能选择pdf和doc文件
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res;
				console.log('成功嘿嘿');
				// uni.showToast({
				// 	title: tempFilePaths,
				// 	duration: 2000
				// })
			},
			error(res) {
				console.log(res);
			}
		})
	}

	const fromWechat = () => {
		wx.chooseMessageFile({
			count: 10,
			type: 'file',
			extension: ['.pdf', '.doc', '.docx'], // 只能选择pdf和doc文件
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res;
				console.log('成功嘿嘿');
				// uni.showToast({
				// 	title: tempFilePaths,
				// 	duration: 2000
				// })
			},
			error(res) {
				console.log(res);
			}
		})
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
</style>