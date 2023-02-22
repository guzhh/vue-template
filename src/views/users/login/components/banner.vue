<template>
	<div class="banner">
		<div class="banner-inner">
			<n-carousel show-arrow class="carousel" autoplay>
				<div :key="item.slogan" class="carousel-item" v-for="item in carouselItem">
					<div class="carousel-title">{{ item.slogan }}</div>
					<div class="carousel-sub-title">{{ item.subSlogan }}</div>
					<img class="carousel-image" :src="item.image" />
				</div>
			</n-carousel>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

import { useThemeVars } from "naive-ui";
import bannerImage from "@/assets/images/login-banner.png";

defineOptions({ name: "Banner" });

const carouselItem = computed(() => [
	{
		slogan: "接入盘古Java通用权限控制",
		subSlogan: "包含机构、科室、角色、用户、资源的全套权限控制",
		image: bannerImage
	},
	{
		slogan: "开箱即用的高质量模板",
		subSlogan: "丰富的的页面模板，覆盖大多数典型业务场景",
		image: bannerImage
	},
	{
		slogan: "内置了常见问题的解决方案",
		subSlogan: "组件库，路由配置，状态管理应有尽有",
		image: bannerImage
	}
]);

// 全局公共变量
// eslint-disable-next-line no-unused-vars
const themeVars = useThemeVars();
</script>

<style lang="less" scoped>
.banner {
	display: flex;
	align-items: center;
	justify-content: center;

	&-inner {
		width: 100%;
		height: 100%;
	}
}

.carousel {
	height: 100%;

	&-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	&-title {
		//color: v-bind("themeVars.baseColor");
		color: #f7f8fa;
		font-weight: 500;
		font-size: 20px;
		line-height: 28px;
	}

	&-sub-title {
		margin-top: 8px;
		//color: v-bind("themeVars.codeColor");
		color: #86909c;
		font-size: 14px;
		line-height: 22px;
	}

	&-image {
		width: 240px;
		margin-top: 40px;
	}
}
</style>
