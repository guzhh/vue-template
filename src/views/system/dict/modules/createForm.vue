<template>
	<lay-layer
		v-model="visible"
		:btn="[
			{ text: '确认', callback: handleOk },
			{ text: '取消', callback: handleClose }
		]"
		:maxmin="true"
		:resize="true"
		:shadeClose="false"
		:title="title"
		:type="1"
		:zIndex="100"
		area="700px"
		@close="handleClose"
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
	</lay-layer>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { saveOrUptDict } from "@/api/system/dictList";

const emits = defineEmits(["ok"]);
const title = ref("");
const visible = ref(false);
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
	console.log(pid, "pid");
	title.value = "新增字典";
	visible.value = true;
	formValue.value.pid = pid ? `${pid}` : "";
};

const edit = row => {
	title.value = "编辑字典";
	visible.value = true;
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
	visible.value = false;
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

// eslint-disable-next-line no-unused-vars
const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUptDict({ ...formValue.value }).then(res => {
				if (res.success) {
					message.success("字典提交成功");
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ add, edit });
</script>

<style scoped></style>
