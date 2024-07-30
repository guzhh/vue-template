<template>
	<page-content style="display: flex; justify-content: space-between">
		<n-card size="small" style="width: 290px">
			<template #header>参数分类</template>
			<template #header-extra>
				<n-button size="small" style="margin-left: 10px" type="primary" @click="dictModalRef.open({ code: 'PARAM_CLASS' })"
					>新增分类</n-button
				>
			</template>
			<vxe-table
				stripe
				resizable
				row-id="id"
				border="none"
				show-overflow
				align="center"
				:data="dictList"
				:size="tableSize"
				ref="xTableRef"
				:height="height - 120"
				show-header-overflow="title"
				@radio-change="radioChangeEvent"
				:filter-config="{ showIcon: false }"
				:row-config="{ isHover: true, isCurrent: true }"
				:radio-config="{ trigger: 'row' }"
			>
				<vxe-column type="radio" width="60">
					<template #header>
						<vxe-button type="text" @click="clearRadioRowEevnt" :disabled="!selectRow">取消</vxe-button>
					</template>
				</vxe-column>
				<!--				<vxe-column field="name" min-width="100px" show-overflow="title" title="参数分类"></vxe-column>-->
				<vxe-colgroup title="参数分类">
					<vxe-column field="name" :filters="nameOptions" :filter-method="nameFilterMethod">
						<template #header="{ column }">
							<n-input
								:key="index"
								size="small"
								v-model:value="option.data"
								v-for="(option, index) in column.filters"
								@keyup.enter="confirmFilterEvent(option)"
								placeholder="按回车筛选"
							/>
						</template>
					</vxe-column>
				</vxe-colgroup>
			</vxe-table>
			<DictModal ref="dictModalRef"></DictModal>
		</n-card>
		<n-card size="small" title="参数列表" style="width: calc(100% - 300px)">
			<template #header>
				<n-input
					size="small"
					style="width: 300px"
					v-model:value="searchForm.query"
					placeholder="参数编码/参数名称/参数值/参数描述"
					@keydown.enter.prevent="resetTableList"
				/>
				<n-button size="small" type="primary" @click="resetTableList" style="margin-left: 10px"> 查询</n-button>
				<n-button size="small" type="default" @click="reset" style="margin-left: 10px"> 重置</n-button>
			</template>
			<template #header-extra>
				<n-button size="small" style="margin-right: 10px" type="primary" @click="addParam">新增参数</n-button>
				<n-button size="small" style="margin-right: 20px" @click="clearAndRebuild">清除重建</n-button>
				<n-tooltip>
					<span>刷新</span>
					<template #trigger>
						<n-icon size="17" @click="resetTableList">
							<Refresh />
						</n-icon>
					</template>
				</n-tooltip>
				<n-divider vertical />
				<n-tooltip>
					<span>密度</span>
					<template #trigger>
						<n-popselect v-model:value="tableSize" :options="tableSizeOptions" trigger="click">
							<n-icon size="17">
								<AutoFitHeight20Filled />
							</n-icon>
						</n-popselect>
					</template>
				</n-tooltip>
				<n-divider vertical />
			</template>
			<vxe-table
				stripe
				ref="paramTableRef"
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
				keep-source
				:valid-config="{ msgMode: 'full' }"
				:edit-rules="validRules"
				:edit-config="{
					trigger: 'dblclick',
					mode: 'row',
					showStatus: true
				}"
			>
				<vxe-column field="id" show-overflow="title" title="ID" width="50px"></vxe-column>
				<vxe-column
					field="paramClassName"
					min-width="100px"
					show-overflow="title"
					title="参数分类"
					:edit-render="{ autofocus: '.vxe-input--inner', defaultValue: '' }"
				>
					<template #edit="{ row }">
						<!--						<vxe-input v-model="row.paramClassName" type="text" size="large" placeholder="参数分类" />-->
						<dict-select
							dictCode="PARAM_CLASS"
							placeholder="参数分类"
							v-model:value="row.paramClassCode"
							v-model:name="row.paramClassName"
						></dict-select>
					</template>
				</vxe-column>
				<vxe-column
					field="paramCode"
					min-width="100px"
					show-overflow="title"
					title="参数编码"
					:edit-render="{ name: 'VxeInput' }"
				>
					<template #edit="{ row }">
						<vxe-input v-model="row.paramCode" type="text" size="large" placeholder="参数编码" :clearable="true" />
					</template>
				</vxe-column>
				<vxe-column field="paramName" min-width="100px" show-overflow="title" title="参数名称" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input v-model="row.paramName" type="text" size="large" placeholder="参数名称" :clearable="true" />
					</template>
				</vxe-column>
				<vxe-column field="paramDescr" min-width="200px" show-overflow="title" title="参数描述" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input v-model="row.paramDescr" type="text" size="large" placeholder="参数描述" :clearable="true" />
					</template>
				</vxe-column>
				<vxe-column field="paramVal" min-width="100px" show-overflow="title" title="参数值" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input v-model="row.paramVal" type="text" size="large" placeholder="参数值" :clearable="true" />
					</template>
				</vxe-column>
				<vxe-column title="操作" width="200px">
					<template #default="{ row }">
						<n-button style="margin-right: 10px" text type="primary" @click="saveParam(row)"> 保存</n-button>
						<n-button style="margin-right: 10px" text type="primary" @click="editParam(row)"> 编辑</n-button>
						<n-popconfirm @positive-click="deleteParam(row)">
							<template #trigger>
								<n-button text type="error"> 删除</n-button>
							</template>
							确定要删除该参数吗？
						</n-popconfirm>
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

			<param-form ref="paramFormRef" @ok="resetTableList"></param-form>
		</n-card>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import XEUtils from "xe-utils";
import { useMessage } from "naive-ui";
import { getParamList, delParam, clsParamCache, saveOrUptParam } from "@/api/system/param";
import useTableData from "@/hooks/useTableData.js";
import { useWindowSize } from "@/hooks/useWindowSize";
import ParamForm from "@/views/system/param/components/param-form.vue";
import useTable from "@/hooks/useTable";
import { getDictByPCodes } from "@/api/system/dictList";
import DictModal from "@/views/system/dict/components/dictModal.vue";

defineOptions({ name: "paramList" });

const xTableRef = ref();
const paramTableRef = ref(); // 参数列表
const dictModalRef = ref();
const selectRow = ref(null);
const dictList = ref([]);
const { tableSizeOptions, tableSize } = useTable();
const message = useMessage();
const paramFormRef = ref();
const { height } = useWindowSize();
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList } = useTableData({
	requestMethod: getParamList,
	formData: { query: null, paramClassCode: null }
});

const nameOptions = ref([{ data: "" }]);
const validRules = ref({
	paramClassName: [{ required: true, message: "请输入参数分类", trigger: ["blur", "change"] }],
	paramCode: [{ required: true, message: "请输入参数编码", trigger: ["blur", "change"] }],
	paramName: [{ required: true, message: "请输入参数名称", trigger: ["blur", "change"] }],
	paramDescr: [{ required: true, message: "请输入参数描述", trigger: ["blur", "change"] }],
	paramVal: [{ required: true, message: "请输入参数值", trigger: ["blur", "change"] }]
});

const reset = () => {
	searchForm.value.query = null;
	resetTableList();
};

// 单选取消选择
const clearRadioRowEevnt = () => {
	const $table = xTableRef.value;
	if ($table) {
		selectRow.value = null;
		$table.clearRadioRow();
		searchForm.value.paramClassCode = null;
		resetTableList();
	}
};

const radioChangeEvent = ({ row }) => {
	selectRow.value = row;
	searchForm.value.paramClassCode = row.code;
	resetTableList();
};

const getDictList = () => {
	return getDictByPCodes({ pcodes: "PARAM_CLASS" }).then(res => {
		dictList.value = res.result.PARAM_CLASS;
	});
};
getDictList();

// 新增参数
const addParam = async () => {
	paramFormRef.value.add();
};

const clearAndRebuild = () => {
	clsParamCache({});
};

// 编辑参数
const editParam = row => {
	paramFormRef.value.edit(row);
};

// 删除参数
const deleteParam = row => {
	delParam({ id: row.id }).then(res => {
		if (res.success) {
			message.success("删除成功");
			resetTableList();
		}
	});
};

// eslint-disable-next-line no-unused-vars
const nameFilterMethod = ({ option, row, column }) => {
	if (option.data) {
		return XEUtils.toValueString(row[column.field]).toLowerCase().indexOf(option.data) > -1;
	}
	return true;
};
const confirmFilterEvent = async option => {
	const $table = xTableRef.value;
	if ($table) {
		await getDictList();
		nextTick(() => {
			// 设置为选中状态
			// eslint-disable-next-line no-param-reassign
			option.checked = true;
			// 修改条件之后，需要手动调用 updateData 处理表格数据
			$table.updateData();
		});
	}
};

// 行内保存参数
const saveParam = async row => {
	const $table = paramTableRef.value;
	const errMap = await $table.fullValidate({ ...row });
	console.log("errMap", errMap);

	if (errMap) {
		window.$message.warning("请先补充信息~");
		return;
	}
	saveOrUptParam({ ...row }).then(res => {
		if (res.success) {
			message.success("参数提交成功");
		}
	});
};
</script>

<style lang="less" scoped></style>
