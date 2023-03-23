<template>
	<div class="logo" @click="$router.push('/')">
		<!--		<logo width="32" height="32" :title="SYSTEM_NAME" :class="{ 'mr-2': !collapsed }" v-if="collapsed"></logo>-->
		<img :src="Logo" alt="" :title="SYSTEM_NAME" :class="{ 'mr-2': !collapsed }" />
		<h2 class="title" v-if="!collapsed">{{ SYSTEM_NAME }}</h2>
	</div>
</template>

<script setup>
// import { useThemeVars } from "naive-ui";
import Logo from "@/assets/images/logo.svg?url";

defineProps({
	collapsed: {
		type: Boolean
	}
});

// eslint-disable-next-line no-unused-vars
// const themeVars = useThemeVars(); // 全局公共CSS变量
const SYSTEM_NAME = import.meta.env.VITE_SYSTEM_NAME; // 系统标题
</script>

<style lang="less" scoped>
.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	line-height: 48px;
	overflow: hidden;
	white-space: nowrap;
	cursor: pointer;

	img {
		width: auto;
		height: 30px;
	}

	.title {
		margin: 0;
		padding: 0;
		font-size: 16px;
		letter-spacing: 1px;
		margin-left: 10px;
		//font-family: blazed;
		font-family: 思源雅黑;
	}
}
</style>
