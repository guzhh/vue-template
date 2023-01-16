<template>
	<s3-layer
		v-model="showModal"
		:btn="['确定', '取消']"
		:maxmin="true"
		:scrollbar="false"
		:title="title"
		:type="1"
		:zIndex="100"
		area="800px"
		skin="layui-layer-lan"
		@btn2="handleClose"
		@cancel="handleClose"
		@yes="handleOk"
	>
		<div style="width: 100%; margin-top: 20px; padding: 0 50px">
			<n-form
				ref="formRef"
				:model="formValue"
				:rules="rules"
				label-placement="left"
				label-width="auto"
				require-mark-placement="left"
			>
				<n-form-item v-show="false" path="id">
					<n-input v-model:value="formValue.id" placeholder="请输入ID" />
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
	</s3-layer>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { layer } from "vue3-layer";
import { saveOrUptParam } from "@/api/system/param";

const emits = defineEmits(["ok"]);
const title = ref("");
const showModal = ref(false);
const formRef = ref();
const message = useMessage();

const formValue = ref({
	id: "",
	paramCode: "",
	paramVal: "",
	paramDescr: "",
	paramName: ""
});

const rules = {
	paramCode: { required: true, message: "请输入参数编码", trigger: "blur" },
	paramVal: { required: true, message: "请输入参数值", trigger: "blur" },
	paramDescr: { required: true, message: "请输入参数描述", trigger: "blur" },
	paramName: { required: true, message: "请输入参数名称", trigger: "blur" }
};

const add = () => {
	title.value = "新增参数";
	showModal.value = true;
};

const edit = row => {
	title.value = "编辑参数";
	showModal.value = true;
	formValue.value = {
		id: `${row.id}`,
		paramCode: row.paramCode,
		paramVal: row.paramVal,
		paramDescr: row.paramDescr,
		paramName: row.paramName
	};
};

const handleClose = () => {
	formRef.value?.restoreValidation();
	showModal.value = false;
	title.value = "";
	formValue.value = {
		id: "",
		paramCode: "",
		paramVal: "",
		paramDescr: "",
		paramName: ""
	};
};

const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			const index = layer.load();
			saveOrUptParam({ ...formValue.value })
				.then(res => {
					if (res.success) {
						message.success("参数提交成功");
						emits("ok");
						handleClose();
					}
				})
				.finally(() => {
					layer.close(index);
				});
		}
	});
};

defineExpose({ add, edit });
</script>

<style scoped></style>
