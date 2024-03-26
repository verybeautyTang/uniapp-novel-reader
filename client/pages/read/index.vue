<template>
	<view>
		 <web-view v-if="state.data" :src="state.data.path" />
	</view>
</template>
<!-- https://blog.csdn.net/qq_62809806/article/details/132555819 -->
<script lang="ts" setup>
	import { onHide, onReady, onLoad } from "@dcloudio/uni-app"
	import { reactive } from "vue"
	const state = reactive({
		data: {
			name: '',
			path: '',
		},
	})
	onLoad((option) => {
		state.data = JSON.parse(option.options);
		uni.setNavigationBarTitle({
			title: state.data.name
		})
	})
</script>

<style>

</style>