<template>
	<default-view>
		<page-content :style="{ height: height - 5 + 'px', overflow: 'auto' }">
			<n-card size="small" style="margin-bottom: 5px">
				<span style="font-size: 18px; margin-right: 5px">版本号:</span>
				<a
					href="https://github.com/guzhh/vue-template"
					style="font-size: 18px; text-decoration: none"
					target="_blank"
					title="获取源码"
					>{{ packageJson.version }}</a
				>
			</n-card>
			<n-card size="small" style="margin-bottom: 5px" title="依赖">
				<n-descriptions :column="6" bordered label-placement="top">
					<n-descriptions-item v-for="(item, index) in dependencies" :key="index" :label="item.key"
						>{{ item.value }}
					</n-descriptions-item>
				</n-descriptions>
			</n-card>
			<n-card size="small" style="margin-bottom: 5px" title="开发依赖">
				<n-descriptions :column="6" bordered label-placement="top">
					<n-descriptions-item v-for="(item, index) in devDependencies" :key="index" :label="item.key"
						>{{ item.value }}
					</n-descriptions-item>
				</n-descriptions>
			</n-card>
			<n-card size="small" style="margin-bottom: 5px" title="参考项目">
				<n-descriptions :column="1" bordered label-placement="top">
					<n-descriptions-item label="arco-design-pro-vue">
						<a href="https://github.com/arco-design/arco-design-pro-vue" target="_blank"
							>https://github.com/arco-design/arco-design-pro-vue</a
						>
					</n-descriptions-item>
					<n-descriptions-item label="admin-work">
						<a href="https://github.com/qingqingxuan/admin-work" target="_blank">https://github.com/qingqingxuan/admin-work</a>
					</n-descriptions-item>
				</n-descriptions>
			</n-card>
		</page-content>
	</default-view>
</template>

<script setup>
import DefaultView from "@/layout/default-view.vue";
import packageJson from "../../../package.json";
import { useWindowSize } from "@/hooks/useWindowSize.js";

defineOptions({ name: "projectDependency" });
const { height } = useWindowSize();
const fun = obj => {
	const array = [];
	// eslint-disable-next-line guard-for-in,no-restricted-syntax
	for (const key in obj) {
		array.push({
			key,
			value: obj[key]
		});
	}
	return array;
};
const dependencies = fun(packageJson.dependencies); // 依赖
const devDependencies = fun(packageJson.devDependencies); // 生产依赖
</script>

<style scoped></style>
