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
				<n-button type="primary" size="small" quaternary @click="newVersion" v-action:versionEdit>新增版本记录</n-button>
			</template>
			<n-scrollbar :style="{ maxHeight: `${height - 140}px`, minHeight: `${height - 140}px` }" trigger="none">
				<n-timeline>
					<n-timeline-item :color="themeVars.primaryColor" line-type="dashed" v-for="(item, index) in versionList" :key="item.id">
						<template #header>
							<div style="width: 100%; display: flex; justify-content: space-between">
								<h2>{{ item.versionCode }}</h2>
								<div style="padding-right: 30px" v-action:versionEdit>
									<n-button strong secondary circle type="warning" size="small" title="编辑" @click="handleEdit(item)">
										<template #icon>
											<n-icon size="small"><edit-outlined /></n-icon>
										</template>
									</n-button>
									<n-popconfirm @positive-click="handlePositiveClick(item, index)">
										<template #trigger>
											<n-button strong secondary circle type="error" size="small" title="删除" style="margin-left: 15px">
												<template #icon>
													<n-icon><delete16-regular /></n-icon>
												</template>
											</n-button>
										</template>
										请问是否确认要删除此版本记录？
									</n-popconfirm>
								</div>
							</div>
						</template>
						<template #default>
							<div style="width: 100%; display: flex; align-items: center">
								<h4>创建人：</h4>
								<n-text code> {{ item.createUserName }} </n-text>
								<h4 style="margin-left: 20px">更新时间：</h4>
								<n-text code> {{ item.releaseDate }} </n-text>
							</div>
							<div v-html="item.releaseNotes" style="margin-top: 5px"></div>
						</template>
					</n-timeline-item>
					<n-timeline-item :color="themeVars.primaryColor"></n-timeline-item>
				</n-timeline>
			</n-scrollbar>
			<div style="width: 100%; text-align: center; height: 30px">
				<n-button ghost type="primary" @click="handleClick" v-if="pageNo < pageTotal">加载更多</n-button>
			</div>
			<version-form ref="versionFormRef" @ok="handleOk" />
		</n-card>
	</page-content>
</template>

<script setup>
import { EditOutlined } from "@vicons/antd";
import { useThemeVars } from "naive-ui";
import { Delete16Regular } from "@vicons/fluent";
import { useWindowSize } from "@/hooks/useWindowSize";
import VersionForm from "@/views/users/version/modal/versionForm.vue";
import { delVersion, getPageList } from "@/api/users/version";

const { height } = useWindowSize();
defineOptions({ name: "version" });

const versionFormRef = ref();
const themeVars = useThemeVars();
const pageNo = ref(1);
const pageTotal = ref(0);
const versionList = ref([]);
const newVersion = () => {
	versionFormRef.value.show();
};

const getData = () => {
	getPageList({ pageNo: pageNo.value, pageSize: 20, releaseStatus: 1 }).then(res => {
		if (res.success) {
			pageTotal.value = res.result.totalPage;
			pageNo.value = res.result.pageNo;
			versionList.value = [...versionList.value, ...res.result.data];
		}
	});
};

const handleOk = () => {
	pageNo.value = 1;
	versionList.value = [];
	getData();
};

const handleClick = () => {
	pageNo.value += 1;
	getData();
};

getData();

const handlePositiveClick = (row, index) => {
	delVersion({ id: row.id }).then(res => {
		if (res.success) {
			versionList.value.splice(index, 1);
		}
	});
};

const handleEdit = row => {
	versionFormRef.value.edit(row);
};
</script>

<style scoped></style>
