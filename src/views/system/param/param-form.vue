<template>
	<base-modal style="width: 700px" :title="title" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<div style="width: 100%; padding: 0 50px; margin-top: 20px">
			<n-form
				ref="formRef"
				:model="formValue"
				:rules="rules"
				label-placement="left"
				label-width="auto"
				require-mark-placement="left"
			>
				<n-form-item label="参数分类" path="paramClassCode">
					<dict-select
						dictCode="PARAM_CLASS"
						placeholder="请选择参数分类"
						v-model:value="formValue.paramClassCode"
						v-model:name="formValue.paramClassName"
					></dict-select>
				</n-form-item>
				<n-form-item label="参数名称" path="paramName">
					<n-input v-model:value="formValue.paramName" placeholder="请输入参数名称" />
				</n-form-item>
				<n-form-item label="参数编码" path="paramCode">
					<n-input v-model:value="formValue.paramCode" placeholder="请输入参数编码" />
				</n-form-item>
				<n-form-item label="参数值" path="paramVal">
					<n-input v-model:value="formValue.paramVal" placeholder="请输入参数值" />
				</n-form-item>
				<n-form-item label="参数描述" path="paramDescr">
					<n-input v-model:value="formValue.paramDescr" placeholder="请输入参数描述" />
				</n-form-item>
			</n-form>
		</div>
	</base-modal>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { saveOrUptParam } from "@/api/system/param";

const emits = defineEmits(["ok"]);
const title = ref("");
const visible = ref(false);
const formRef = ref();
const message = useMessage();
const defaultForm = {
	id: null,
	paramClassCode: null,
	paramClassName: null,
	paramCode: null,
	paramVal: null,
	paramDescr: null,
	paramName: null
};

const formValue = ref({ ...defaultForm });

const rules = {
	paramClassCode: { required: true, message: "请选择参数分类", trigger: "blur" },
	paramCode: { required: true, message: "请输入参数编码", trigger: "blur" },
	paramVal: { required: true, message: "请输入参数值", trigger: "blur" },
	paramDescr: { required: true, message: "请输入参数描述", trigger: "blur" },
	paramName: { required: true, message: "请输入参数名称", trigger: "blur" }
};

const add = () => {
	title.value = "新增参数";
	visible.value = true;
};

const edit = row => {
	title.value = "编辑参数";
	visible.value = true;
	formValue.value = {
		id: `${row.id}`,
		paramCode: row.paramCode,
		paramVal: row.paramVal,
		paramDescr: row.paramDescr,
		paramName: row.paramName,
		paramClassCode: row.paramClassCode,
		paramClassName: row.paramClassName
	};
};

const handleClose = () => {
	formRef.value?.restoreValidation();
	visible.value = false;
	title.value = "";
	formValue.value = { ...defaultForm };
};

// eslint-disable-next-line no-unused-vars
const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUptParam({ ...formValue.value }).then(res => {
				if (res.success) {
					message.success("参数提交成功");
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ add, edit });
</script>

<style lang="less" scoped></style>
