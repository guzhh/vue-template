<template>
	<base-modal style="width: 700px" :title="title" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<n-form
			ref="formRef"
			:model="formValue"
			:rules="rules"
			label-placement="left"
			label-width="80px"
			require-mark-placement="left"
			style="padding: 15px 10px 0"
		>
			<n-form-item v-show="false" label="id" path="id">
				<n-input v-model:value="formValue.id" />
			</n-form-item>
			<n-form-item v-show="false" label="机构编码" path="orgCode">
				<n-input v-model:value="formValue.orgCode" placeholder="请输入机构编码" />
			</n-form-item>
			<n-form-item v-show="false" label="机构名称" path="orgName">
				<n-input v-model:value="formValue.orgName" placeholder="请输入机构名称" />
			</n-form-item>
			<n-form-item v-show="false" label="科室编码" path="departCode">
				<n-input v-model:value="formValue.departCode" placeholder="请输入科室编码" />
			</n-form-item>
			<n-form-item v-show="false" label="科室名称" path="departName">
				<n-input v-model:value="formValue.departName" placeholder="请输入科室名称" />
			</n-form-item>
			<n-form-item label="用户名称" path="name">
				<n-input v-model:value="formValue.name" placeholder="请输入用户名称" />
			</n-form-item>
			<n-form-item label="账号" path="account">
				<n-input v-model:value="formValue.account" placeholder="请输入账号" />
			</n-form-item>
			<n-form-item v-if="!ifEdit" label="密码" path="passwd">
				<n-input v-model:value="formValue.passwd" placeholder="请输入密码" type="password" />
			</n-form-item>
			<n-form-item label="手机号" path="phone">
				<n-input v-model:value="formValue.phone" placeholder="请输入手机号" />
			</n-form-item>
			<n-form-item label="邮箱" path="email">
				<n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
			</n-form-item>
		</n-form>
	</base-modal>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { saveOrUpt } from "@/api/system/user";

const emits = defineEmits(["ok"]);
const formRef = ref();
const visible = ref(false);
const title = ref("");
const ifEdit = ref(false);

const defaultForm = {
	id: null,
	orgCode: "",
	orgName: "",
	departCode: "",
	departName: "",
	name: "",
	account: "",
	passwd: "",
	phone: "",
	email: ""
};

const formValue = ref({ ...defaultForm });

const rules = {
	name: { required: true, message: "请输入用户名称", trigger: "blur" },
	account: { required: true, message: "请输入账号", trigger: "blur" },
	passwd: [
		{ required: true, message: "请输入密码", trigger: "change" },
		{ max: 16, min: 6, message: "密码长度在6~16位之间", trigger: "change" }
	]
};

const addUser = data => {
	visible.value = true;
	title.value = "新增用户";
	nextTick(() => {
		formValue.value.orgCode = data.orgCode;
		formValue.value.orgName = data.orgName;
		formValue.value.departCode = data.depCode;
		formValue.value.departName = data.depName;
	});
};

const editUser = row => {
	ifEdit.value = true;
	visible.value = true;
	title.value = "编辑用户";
	formValue.value = { ...row };
};

const handleClose = () => {
	title.value = "";
	visible.value = false;
	formValue.value = { ...defaultForm };
	ifEdit.value = false;
};

const handleOk = () => {
	console.log(formValue.value, "formValue.value");
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUpt({ ...formValue.value }).then(res => {
				if (res.success) {
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ addUser, editUser });
</script>

<style scoped></style>
