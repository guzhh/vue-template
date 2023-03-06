<template>
	<lay-layer
		v-model="visible"
		:resize="true"
		:shadeClose="false"
		:maxmin="true"
		:type="1"
		:zIndex="100"
		area="600px"
		:title="title"
		@close="handleClose"
		:btn="[
			{ text: '确认', callback: handleOk },
			{ text: '取消', callback: handleClose }
		]"
	>
		<n-form
			ref="formRef"
			:model="formValue"
			require-mark-placement="left"
			:rules="rules"
			label-placement="left"
			label-width="auto"
			style="padding: 15px 10px 0"
		>
			<n-form-item path="sysId" label="所属系统">
				<n-select filterable v-model:value="formValue.sysId" :options="systemList" placeholder="请选择所属系统" />
			</n-form-item>
			<n-form-item label="角色名称" path="name">
				<n-input v-model:value="formValue.name" placeholder="请输入角色名称" />
			</n-form-item>
			<n-form-item path="sysId" label="数据范围">
				<n-select filterable v-model:value="formValue.dataScope" :options="dataScopeOptions" placeholder="请选择角色数据范围" />
			</n-form-item>
			<n-form-item label="角色描述" path="descr">
				<n-input v-model:value="formValue.descr" placeholder="请输入角色描述" />
			</n-form-item>
		</n-form>
	</lay-layer>
</template>

<script setup>
import { ref } from "vue";
import { saveOrUptRole } from "@/api/system/role";
import { dataScopeOptions } from "@/constant/system/role";

defineProps({
	systemList: {
		type: Array,
		required: true,
		default() {
			return [];
		}
	}
});

const emits = defineEmits(["ok"]);

const formRef = ref();
const visible = ref(false);
const title = ref("");

const defaultForm = {
	id: null,
	sysId: null,
	dataScope: null,
	name: "",
	descr: ""
};

const formValue = ref({ ...defaultForm });

const rules = {
	name: { required: true, message: "请输入角色名称", trigger: "blur" },
	descr: { required: true, message: "请输入参数描述", trigger: "blur" },
	sysId: { type: "number", required: true, message: "请选择角色所属系统", trigger: ["blur", "change"] }
};

const addRole = () => {
	visible.value = true;
	title.value = "新增角色";
};

const editRole = row => {
	visible.value = true;
	title.value = "编辑角色";
	formValue.value = { ...row };
};

const handleClose = () => {
	title.value = "";
	visible.value = false;
	formValue.value = { ...defaultForm };
};

const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUptRole({ ...formValue.value }).then(res => {
				if (res.success) {
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ addRole, editRole });
</script>

<style scoped></style>
