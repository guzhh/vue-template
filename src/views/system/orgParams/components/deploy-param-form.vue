<!--
  文件描述：
  创建时间：2024/2/24 13:40
  创建人：gzh
-->
<template>
	<base-modal style="width: 600px" title="配置项设置" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<n-form
			ref="formRef"
			label-width="auto"
			:model="formValue"
			label-placement="left"
			require-mark-placement="left"
			style="padding: 15px 10px 0"
		>
			<n-form-item
				label="配置机构"
				path="orgCode"
				:rule="{
					required: true,
					message: '请选择要配置的机构',
					trigger: ['input', 'blur']
				}"
			>
				<n-tree-select
					:disabled="isSingleAgency"
					@update:value="handleOrgChange"
					v-model:value="formValue.orgCode"
					:options="[...treeData]"
					children-field="children"
					default-expand-all
					key-field="code"
					label-field="name"
					placeholder="请选择要配置的机构"
				/>
			</n-form-item>
			<n-form-item
				:label="item.name"
				:path="item.model"
				v-for="item in paramConfig"
				:key="item.model"
				:rule="{
					required: item.required,
					message: `请填写${item.name}`,
					trigger: ['input', 'blur']
				}"
			>
				<n-select
					clearable
					v-model:value="formValue[item.model]"
					:options="createOptions(item.options)"
					v-if="item.options"
					:placeholder="item.placeholder"
				/>
				<n-input v-else v-model:value="formValue[item.model]" :placeholder="item.placeholder" />
			</n-form-item>
		</n-form>
	</base-modal>
</template>

<script setup>
import { convertToTreeArray } from "@/utils/tree";
import { getOrgInfoByCode } from "@/api/system/orgAdmin";
import { isJSONString } from "@/utils";
import { saveOrUptOrgParam } from "@/api/system/orgParams";

defineOptions({ name: "deployParamForm" });

const isSingleAgency = ref(false);
const emits = defineEmits(["ok"]);
const formRef = ref();
const treeData = ref([]);
const paramConfig = ref([]); // 配置项描述
const paramVal = ref({}); // 配置项值
const formValue = ref({ orgCode: null });
const orgParamConfig = ref({}); // 配置项全部信息
const visible = ref(false);

// 获取机构列表
const getOrg = () => {
	getOrgInfoByCode({ orgCode: null, ifDel: 0 }).then(res => {
		if (res.success) {
			treeData.value = res.result.map(item => {
				return { ...item, key: item.code, label: item.name };
			});
			treeData.value = convertToTreeArray(treeData.value);
		}
	});
};
getOrg();

const handleClose = () => {
	paramVal.value = {};
	paramConfig.value = [];
	formValue.value = { orgCode: null };
	orgParamConfig.value = {};
	visible.value = false;
	isSingleAgency.value = false;
};

const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			paramVal.value[formValue.value.orgCode] = { ...formValue.value, orgCode: undefined };
			orgParamConfig.value.paramVal = JSON.stringify(paramVal.value);
			saveOrUptOrgParam({ ...orgParamConfig.value }).then(res => {
				if (res.success) {
					handleClose();
					emits("ok");
				}
			});
		}
	});
};

const createOptions = str => {
	return str.split(",").map(item => {
		return { label: item, value: item };
	});
};

const handleOrgChange = code => {
	if (paramVal.value[code]) {
		formValue.value = { orgCode: code, ...paramVal.value[code] };
	} else {
		const obj = { orgCode: code };
		paramConfig.value.forEach(item => {
			obj[item.model] = item.defalutVal;
		});
		formValue.value = { ...obj };
	}
};

const open = (row, orgCode) => {
	visible.value = true;
	orgParamConfig.value = { ...row };
	paramConfig.value = Object.values(JSON.parse(row.paramConfig));
	if (isJSONString(row.paramVal)) {
		paramVal.value = JSON.parse(row.paramVal);
	}
	if (orgCode) {
		formValue.value = { ...formValue.value, orgCode };
		handleOrgChange(orgCode);
		isSingleAgency.value = true;
	}
};

defineExpose({ open });
</script>

<style scoped></style>
