<!--
  文件描述：
  创建时间：2023/10/4 13:49
  创建人：gzh
-->
<template>
	<page-content>
		<n-card
			title="版本更新记录"
			size="small"
			:segmented="{
				content: true
			}"
		>
			<template #header-extra>
				<n-button type="primary" size="small" quaternary @click="newVersion">新增版本记录</n-button>
			</template>
			<n-scrollbar :style="{ maxHeight: `${height - 110}px` }" trigger="none">
				<n-timeline>
					<n-timeline-item :color="themeVars.primaryColor" line-type="dashed" v-for="item in 10" :key="item">
						<template #header>
							<h2>1.2.4</h2>
						</template>
						<template #default>
							<div style="width: 100%; display: flex; align-items: center">
								<h4>创建人：</h4>
								<n-text code> 管理员 </n-text>
								<h4 style="margin-left: 20px">更新时间：</h4>
								<n-text code> 2023-03-05 11:11:11 </n-text>
							</div>
							<div v-html="updateRecords" style="margin-top: 5px"></div>
						</template>
					</n-timeline-item>
					<n-timeline-item :color="themeVars.primaryColor"></n-timeline-item>
				</n-timeline>
			</n-scrollbar>
			<version-form ref="versionFormRef" />
		</n-card>
	</page-content>
</template>

<script setup>
import { useThemeVars } from "naive-ui";
import { useWindowSize } from "@/hooks/useWindowSize";
import VersionForm from "@/views/users/version/modal/versionForm.vue";

const { height } = useWindowSize();
defineOptions({ name: "version" });

const versionFormRef = ref();
const themeVars = useThemeVars();
const updateRecords = `<h3>体验优化</h3><p>【权益】在知识库成员人数超过限制时，提示中支持升级、续费会员或高级版团队</p><p>【编辑器】加载编辑器的同时会自动 focus 到输入框中</p><p>【知识库】首页卡片视图下显示完整标题 tooltip</p><p>【知识库】文档阅读页面目录根据设置的默认展示层级显示</p><p>【视觉】优化和统一所有列表以及菜单 hover 背景色</p><p><br></p><h3>Bug 修复</h3><p>【工作台】修复个人最近列表中空间的数据某些情况下串到个人下面问题</p><p>【空间】空间成员列表可以搜索到申请中和邀请中的成员</p><p>【空间】空间成员列表总人数记录移除申请中和邀请中的成员</p><p>【知识库】修复文档列表显示多余空白列表项的问题</p><p>【知识库】修复从文档阅读页左侧目录新建文档后发布，偶尔无法添加到目录的问题</p><p>【知识库】从工作台点击「从模板新建...」会创建多余一篇文档的问题</p><p>【知识库】修复有知识库权限的文档协作者无法看到目录的问题</p><p>【画板】修复偶尔无法出现「下载源文件」按钮的问题</p>`;

const newVersion = () => {
	versionFormRef.value.show();
};
</script>

<style scoped></style>
