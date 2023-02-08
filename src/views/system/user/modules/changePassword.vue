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
		area="600px"
		@close="handleClose"
	>
		<n-form
			ref="formRef"
			:model="formValue"
			:rules="rules"
			label-placement="left"
			label-width="100px"
			require-mark-placement="left"
			style="padding: 15px 10px 0 10px"
		>
			<n-form-item v-show="false" label="userId" path="userId">
				<n-input v-model:value="formValue.userId" />
			</n-form-item>
			<n-form-item label="原密码:" path="oldPasswd">
				<n-input v-model:value="formValue.oldPasswd" placeholder="请输入原密码" show-password-on="mousedown" type="password" />
			</n-form-item>
			<n-form-item label="新密码:" path="newPasswd">
				<n-input v-model:value="formValue.newPasswd" placeholder="请输入新密码" show-password-on="mousedown" type="password" />
			</n-form-item>
		</n-form>
	</lay-layer>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { uptPasswd } from "@/api/system/user";

const message = useMessage();
const emits = defineEmits(["ok"]);
const formRef = ref();
const visible = ref(false);
const title = ref("");

const defaultForm = {
	userId: null,
	oldPasswd: "",
	newPasswd: ""
};

const formValue = ref({ ...defaultForm });

const rules = {
	oldPasswd: [
		{ required: true, message: "请输入原密码", trigger: "change" },
		{ max: 16, min: 6, message: "密码长度在6~16位之间", trigger: "change" }
	],
	newPasswd: [
		{ required: true, message: "请输入新密码", trigger: "change" },
		{ max: 16, min: 6, message: "密码长度在6~16位之间", trigger: "change" }
	]
};

const open = row => {
	title.value = "修改密码";
	visible.value = true;
	formValue.value.userId = `${row.id}`;
};

const handleClose = () => {
	title.value = "";
	visible.value = false;
	formValue.value = { ...defaultForm };
};

const handleOk = () => {
	console.log(formValue.value, "formValue.value");
	formRef.value?.validate(errors => {
		if (!errors) {
			uptPasswd({ ...formValue.value }).then(res => {
				if (res.success) {
					emits("ok");
					message.success("修改成功");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ open });
</script>

<style scoped></style>
