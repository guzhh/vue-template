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
				<n-form-item v-show="false" path="pid">
					<n-input v-model:value="formValue.pid" placeholder="请输入PID" />
				</n-form-item>
				<n-form-item label="字典编码" path="code">
					<n-input v-model:value="formValue.code" placeholder="请输入字典编码" />
				</n-form-item>
				<n-form-item label="字典名称" path="name">
					<n-input v-model:value="formValue.name" placeholder="请输入字典名称" />
				</n-form-item>
				<n-form-item label="字典值" path="dictVal">
					<n-input v-model:value="formValue.dictVal" placeholder="请输入字典值" />
				</n-form-item>
				<n-form-item label="状态" path="state">
					<n-select v-model:value="formValue.state" :options="options" placeholder="请选择字典状态" />
				</n-form-item>
			</n-form>
		</div>
	</s3-layer>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { layer } from "vue3-layer";
import { saveOrUptDict } from "@/api/system/dictList";

const emits = defineEmits(["ok"]);
const title = ref("");
const showModal = ref(false);
const formRef = ref();
const message = useMessage();
const options = [
	{ label: "启用", value: 1 },
	{ label: "禁用", value: 0 }
];

const formValue = ref({
	id: "",
	pid: "",
	code: "",
	name: "",
	dictVal: "",
	state: undefined
});

const rules = {
	code: { required: true, message: "请输入字典编码", trigger: "blur" },
	name: { required: true, message: "请输入字典名称", trigger: "blur" },
	dictVal: { required: true, message: "请输入字典值", trigger: "blur" },
	state: { type: "number", required: true, message: "请选择字典状态", trigger: ["blur", "change"] }
};

const add = pid => {
	title.value = "新增字典";
	showModal.value = true;
	formValue.value.pid = pid ? `${pid}` : `${0}`;
};

const edit = row => {
	title.value = "编辑字典";
	showModal.value = true;
	formValue.value = {
		id: `${row.id}`,
		pid: `${row.pid}`,
		code: row.code,
		name: row.name,
		dictVal: row.dictVal,
		state: row.state
	};
};

const handleClose = () => {
	formRef.value?.restoreValidation();
	showModal.value = false;
	title.value = "";
	formValue.value = {
		id: "",
		pid: "",
		code: "",
		dictName: "",
		dictValue: "",
		state: undefined
	};
};

const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			const index = layer.load();
			saveOrUptDict({ ...formValue.value })
				.then(res => {
					if (res.success) {
						message.success("字典提交成功");
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
