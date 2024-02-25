<template>
	<page-content :style="{ height: height + 'px' }">
		<div style="display: flex; justify-content: space-between; height: 100%">
			<n-card
				size="small"
				style="width: 200px; flex-shrink: 0"
				title="机构列表"
				:segmented="{
					content: true
				}"
				:content-style="{ overflow: 'auto', padding: '0 5px 5px 5px' }"
			>
				<n-tree
					show-line
					selectable
					:cancelable="false"
					:data="treeData"
					v-model:selected-keys="orgCode"
					:default-selected-keys="defaultSelect"
					:on-load="handleLoad"
					:render-label="treeRenderLabel"
					block-line
				/>
			</n-card>
			<n-card size="small" style="margin-left: 5px; width: calc(100% - 205px)">
				<vxe-table
					stripe
					:data="tableList"
					:height="height - 120"
					:loading="tableLoading"
					:size="tableSize"
					align="center"
					border="none"
					resizable
					row-id="id"
					show-header-overflow="title"
					show-overflow
					:row-config="{ isHover: true, isCurrent: true }"
				>
					<vxe-column field="id" show-overflow="title" title="ID" width="60px"></vxe-column>
					<vxe-column field="typeCode" min-width="100px" show-overflow="title" title="参数类型编码"></vxe-column>
					<vxe-column field="typeName" min-width="100px" show-overflow="title" title="参数类型名称"></vxe-column>
					<vxe-column field="paramConfig" min-width="200px" show-overflow="title" title="参数配置"></vxe-column>
					<vxe-column min-width="100px" show-overflow="title" title="参数值">
						<template #default="{ row }">
							<span v-if="orgCode[0]">
								{{ row.paramVal[orgCode[0]] }}
							</span>
						</template>
					</vxe-column>
					<vxe-column field="paramDescr" min-width="100px" show-overflow="title" title="参数描述"></vxe-column>
					<vxe-column title="操作" width="150px">
						<template #default="{ row }">
							<n-button style="margin-right: 10px" text type="warning" @click="deployParam(row)">配置</n-button>
						</template>
					</vxe-column>
				</vxe-table>
				<n-pagination
					v-model:page="page.currentPage"
					v-model:page-size="page.pageSize"
					:item-count="page.totalResult"
					:page-sizes="page.pageSizes"
					show-quick-jumper
					show-size-picker
					style="display: flex; justify-content: right; margin-top: 5px"
					@update:page="onChange"
					@update:page-size="onUpdatePageSize"
				>
					<template #suffix> 共 {{ page.totalResult }} 条数据</template>
				</n-pagination>
			</n-card>
		</div>
		<deploy-param-form ref="deployParamFormRef" @ok="getTableData" />
	</page-content>
</template>

<script setup>
import { h, ref } from "vue";
import useTableData from "@/hooks/useTableData";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getOrgList, getOrgInfoByCode } from "@/api/system/orgAdmin.js";
import { convertToTreeArray } from "@/utils/tree";
import { getOrgParamList } from "@/api/system/orgParams";
import useTable from "@/hooks/useTable";
import DeployParamForm from "@/views/system/orgParams/components/deploy-param-form.vue";
import { isJSONString } from "@/utils";

defineOptions({ name: "orgParamVal" });

const deployParamFormRef = ref();
const { tableSize } = useTable();
const { height } = useWindowSize();
const treeData = ref([]);
const defaultSelect = ref([]);
const orgCode = ref([]);

// eslint-disable-next-line no-unused-vars
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList, getTableData } = useTableData({
	requestMethod: getOrgParamList,
	formData: {},
	processTheData: data => {
		return data.map(item => {
			// console.log(item);
			if (item.paramVal && isJSONString(item.paramVal)) {
				return { ...item, paramVal: JSON.parse(item.paramVal) };
			}
			return { ...item };
		});
	}
});

const treeRenderLabel = ({ option }) => {
	// display: block; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;
	return h(
		"span",
		{
			style: {
				display: "block",
				overflow: "hidden",
				whiteSpace: "nowrap",
				textOverflow: "ellipsis"
			},
			title: option.label
		},
		option.label
	);
};

// 获取机构列表
const getOrg = () => {
	getOrgInfoByCode({ orgCode: null, ifDel: 0 }).then(res => {
		if (res.success) {
			treeData.value = res.result.map(item => {
				return { ...item, key: item.code, label: item.name };
			});
			treeData.value = convertToTreeArray(treeData.value);
			if (treeData.value && treeData.value.length > 0) {
				orgCode.value = [treeData.value[0].code];
			}
		}
	});
};
getOrg();

const handleLoad = node => {
	return new Promise(resolve => {
		getOrgList({ pcode: node.code })
			.then(res => {
				if (res.success) {
					if (res.result.length <= 0) {
						// eslint-disable-next-line no-param-reassign
						node.isLeaf = true;
					} else {
						// eslint-disable-next-line no-param-reassign
						node.children = res.result.map(item => {
							return { ...item, key: item.code, label: item.name, isLeaf: false };
						});
					}
				}
			})
			.finally(() => {
				resolve();
			});
	});
};

// 配置参数
const deployParam = row => {
	deployParamFormRef.value.open(row, orgCode.value[0]);
};
</script>

<style scoped>
::v-deep(.n-tree .n-tree-node) {
	padding: 6px 5px 2px 0;
}
</style>
