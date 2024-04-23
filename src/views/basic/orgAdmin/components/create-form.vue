<template>
	<base-modal style="width: 700px" :title="title" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<div style="width: 100%; padding: 0 20px; margin-top: 20px">
			<n-form
				ref="formRef"
				:model="formValue"
				:rules="rules"
				label-placement="left"
				label-width="auto"
				require-mark-placement="left"
			>
				<n-form-item label="机构名称" path="name">
					<n-input v-model:value="formValue.name" placeholder="请输入机构名称" />
				</n-form-item>
				<n-form-item label="医保编码" path="nmsOrgCode">
					<n-input v-model:value="formValue.nmsOrgCode" placeholder="请输入医保编码" />
				</n-form-item>
				<n-form-item label="医保名称" path="nmsOrgName">
					<n-input v-model:value="formValue.nmsOrgName" placeholder="请输入医保名称" />
				</n-form-item>
				<n-form-item label="机构描述" path="descr">
					<n-input v-model:value="formValue.descr" placeholder="请输入机构描述" />
				</n-form-item>
			</n-form>
		</div>
	</base-modal>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { saveOrUptOrg } from "@/api/system/orgAdmin.js";

const emits = defineEmits(["ok"]);
const title = ref("");
const visible = ref(false);
const formRef = ref();
const message = useMessage();
const addRow = ref({});
const defaultValue = {
	id: null,
	pcode: null,
	code: null,
	name: null,
	descr: null,
	nmsOrgCode: null,
	nmsOrgName: null
};

const formValue = ref({ ...defaultValue });

const rules = {
	name: { required: true, message: "请输入机构名称", trigger: "blur" }
};

const add = row => {
	title.value = "新增机构";
	visible.value = true;
	if (row.id) {
		title.value = "新增下级机构";
		formValue.value.pcode = row.code;
		addRow.value = row;
	}
};

const edit = row => {
	title.value = "编辑机构";
	formValue.value = {
		id: `${row.id}`,
		pcode: row.pcode,
		code: row.code,
		name: row.name,
		descr: row.descr,
		nmsOrgCode: row.nmsOrgCode,
		nmsOrgName: row.nmsOrgName
	};
	addRow.value = row;
	visible.value = true;
};

const handleClose = () => {
	formRef.value?.restoreValidation();
	visible.value = false;
	title.value = "";
	formValue.value = { ...defaultValue };
	addRow.value = {};
};

// eslint-disable-next-line no-unused-vars
const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUptOrg({ ...formValue.value }).then(res => {
				if (res.success) {
					message.success("保存成功");
					// 判断是否是编辑
					if (!formValue.value.id) {
						emits("ok", addRow.value, false);
					} else {
						emits("ok", addRow.value, true);
					}
					handleClose();
				}
			});
		}
	});
};

defineExpose({ add, edit });
</script>

<style scoped></style>
